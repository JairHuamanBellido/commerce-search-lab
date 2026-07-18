import { opensearchRequest, opensearchUrl, productsIndex } from './opensearch-client.js';

export const productsMapping = {
	settings: {
		index: {
			number_of_shards: 1,
			number_of_replicas: 0,
			analysis: {
				filter: {
					trigram_shingles: {
						type: 'shingle',
						min_shingle_size: 2,
						max_shingle_size: 3
					}
				},
				analyzer: {
					trigram: {
						type: 'custom',
						tokenizer: 'standard',
						filter: ['lowercase', 'trigram_shingles']
					}
				}
			}
		}
	},
	mappings: {
		dynamic: 'strict',
		properties: {
			id: { type: 'keyword' },
			title: {
				type: 'text',
				copy_to: 'suggest',
				fields: {
					keyword: { type: 'keyword', ignore_above: 256 }
				}
			},
			description: { type: 'text', copy_to: 'suggest' },
			category: { type: 'keyword', copy_to: 'suggest' },
			brand: { type: 'keyword', copy_to: 'suggest' },
			suggest: {
				type: 'text',
				fields: {
					trigram: { type: 'text', analyzer: 'trigram' }
				}
			},
			price: { type: 'float' },
			rating: { type: 'float' },
			createdAt: { type: 'date' }
		}
	}
};

export async function createProductsIndex({ recreate = false } = {}) {
	const exists = await fetch(`${opensearchUrl}/${productsIndex}`, {
		method: 'HEAD'
	});

	if (exists.ok && recreate) {
		await opensearchRequest(`/${productsIndex}`, { method: 'DELETE' });
	}

	if (exists.ok && !recreate) {
		console.log(`Index exists: ${productsIndex}`);
		return;
	}

	await opensearchRequest(`/${productsIndex}`, {
		method: 'PUT',
		body: JSON.stringify(productsMapping)
	});

	console.log(`Index created: ${productsIndex}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
	await createProductsIndex();
}
