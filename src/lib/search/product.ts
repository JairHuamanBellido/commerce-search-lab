export type Product = {
	id: string;
	title: string;
	description: string;
	category: string;
	brand: string;
	price: number;
	rating: number;
	createdAt: string;
};

export type ProductFacetKey = 'brand' | 'category';

export type ProductFacetBucket = {
	key: string;
	doc_count: number;
};

export type ProductFacets = Record<ProductFacetKey, ProductFacetBucket[]>;

export type ProductSearchFilters = Partial<Record<ProductFacetKey, string[]>>;

export type ProductSortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';

export type ProductSearchRequest = {
	term: string;
	filters: ProductSearchFilters;
	sort?: ProductSortOption;
	from?: number;
	size?: number;
};

export type ProductSearchResult = {
	products: Product[];
	total: number;
	facets: ProductFacets;
};
