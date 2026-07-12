import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type {
	Product,
	ProductFacetBucket,
	ProductFacetKey,
	ProductSearchFilters,
	ProductSearchRequest,
	ProductSearchResult
} from '$lib/search/product';

type OpenSearchHit<T> = {
	_source?: T;
};

type OpenSearchSearchResponse<T> = {
	hits?: {
		total?: number | { value?: number };
		hits?: OpenSearchHit<T>[];
	};
	aggregations?: {
		brand_facet?: { buckets?: ProductFacetBucket[] };
		category_facet?: { buckets?: ProductFacetBucket[] };
	};
};

const MAX_SEARCH_TERM_LENGTH = 120;
const DEFAULT_RESULT_FROM = 0;
const DEFAULT_RESULT_SIZE = 10;
const FACET_FIELDS: ProductFacetKey[] = ['brand', 'category'];

export class OpensearchAPIClient {
	private static axiosInstance: AxiosInstance = axios.create({
		baseURL: 'http://localhost:9200'
	});

	static async initialResults() {
		return await this.axiosInstance.post<OpenSearchSearchResponse<Product>>('/products/_search', {
			size: 20,
			query: {
				match_all: {}
			},
			aggs: {
				brand_facet: {
					terms: {
						field: 'brand'
					}
				},
				category_facet: {
					terms: {
						field: 'category'
					}
				}
			}
		});
	}

	static async searchProducts(request: ProductSearchRequest): Promise<ProductSearchResult> {
		const term = this.normalizeSearchTerm(request.term);
		const filters = this.normalizeFilters(request.filters);
		const from = this.normalizeFrom(request.from);
		const size = this.normalizeSize(request.size);
		const response = await this.axiosInstance.post<OpenSearchSearchResponse<Product>>(
			'/products/_search',
			this.buildSearchBody({ term, filters, from, size })
		);

		return this.toProductSearchResult(response.data);
	}

	private static normalizeSearchTerm(term: string): string {
		if (typeof term !== 'string') {
			return '';
		}

		return term.trim().replace(/\s+/g, ' ').slice(0, MAX_SEARCH_TERM_LENGTH);
	}

	private static normalizeFilters(filters: ProductSearchFilters): ProductSearchFilters {
		return FACET_FIELDS.reduce<ProductSearchFilters>((normalizedFilters, field) => {
			const values = filters[field] ?? [];
			const uniqueValues = [...new Set(values.map((value) => value.trim()).filter(Boolean))];

			if (uniqueValues.length > 0) {
				normalizedFilters[field] = uniqueValues;
			}

			return normalizedFilters;
		}, {});
	}

	private static normalizeFrom(from = DEFAULT_RESULT_FROM): number {
		if (!Number.isInteger(from)) {
			return DEFAULT_RESULT_FROM;
		}

		return Math.max(from, DEFAULT_RESULT_FROM);
	}

	private static normalizeSize(size = DEFAULT_RESULT_SIZE): number {
		if (!Number.isInteger(size)) {
			return DEFAULT_RESULT_SIZE;
		}

		return Math.min(Math.max(size, 1), 50);
	}

	private static buildSearchBody(request: Required<ProductSearchRequest>) {
		const filterClauses = FACET_FIELDS.flatMap((field) => {
			const values = request.filters[field] ?? [];
			return values.length > 0 ? [{ terms: { [field]: values } }] : [];
		});
		const hasSearchTerm = request.term.length > 0;

		return {
			from: request.from,
			size: request.size,
			query: {
				bool: {
					must: hasSearchTerm
						? [
								{
									multi_match: {
										query: request.term,
										fields: ['title^3', 'brand^2', 'category^2', 'description'],
										type: 'best_fields',
										operator: 'and',
										fuzziness: 'AUTO'
									}
								}
							]
						: [{ match_all: {} }],
					filter: filterClauses
				}
			},
			aggs: {
				brand_facet: {
					terms: {
						field: 'brand',
						size: 20
					}
				},
				category_facet: {
					terms: {
						field: 'category',
						size: 20
					}
				}
			}
		};
	}

	private static toProductSearchResult(
		response: OpenSearchSearchResponse<Product>
	): ProductSearchResult {
		const products =
			response.hits?.hits
				?.map((hit) => hit._source)
				.filter((product): product is Product => Boolean(product)) ?? [];
		const totalValue = response.hits?.total;
		const total =
			typeof totalValue === 'number' ? totalValue : (totalValue?.value ?? products.length);

		return {
			products,
			total,
			facets: {
				brand: response.aggregations?.brand_facet?.buckets ?? [],
				category: response.aggregations?.category_facet?.buckets ?? []
			}
		};
	}
}
