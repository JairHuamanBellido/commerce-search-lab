import { opensearchRequest, opensearchUrl, productsIndex } from './opensearch-client.js';

export const productsMapping = {
	settings: {
		index: {
			number_of_shards: 1,
			number_of_replicas: 0
		}
	},
	mappings: {
		dynamic: 'strict',
		properties: {
			id: { type: 'keyword' },
			title: {
				type: 'text',
				fields: {
					keyword: { type: 'keyword', ignore_above: 256 }
				}
			},
			description: { type: 'text' },
			category: { type: 'keyword' },
			brand: { type: 'keyword' },
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
