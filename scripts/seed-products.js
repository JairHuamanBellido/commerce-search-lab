import products from '../data/products.json' with { type: 'json' };
import { createProductsIndex } from './create-products-index.js';
import { opensearchRequest, productsIndex } from './opensearch-client.js';

function buildBulkBody(items) {
	return (
		items
			.flatMap((product) => [
				JSON.stringify({ index: { _index: productsIndex, _id: product.id } }),
				JSON.stringify(product)
			])
			.join('\n') + '\n'
	);
}

await createProductsIndex({ recreate: true });

const bulkResult = await opensearchRequest('/_bulk?refresh=true', {
	method: 'POST',
	headers: { 'content-type': 'application/x-ndjson' },
	body: buildBulkBody(products)
});

if (bulkResult.errors) {
	const failedItems = bulkResult.items.filter((item) => item.index?.error);
	throw new Error(`Bulk insert failed: ${JSON.stringify(failedItems, null, 2)}`);
}

const count = await opensearchRequest(`/${productsIndex}/_count`);

if (count.count !== products.length) {
	throw new Error(`Seed count mismatch: expected ${products.length}, got ${count.count}`);
}

console.log(`Seeded ${count.count} products into ${productsIndex}`);

