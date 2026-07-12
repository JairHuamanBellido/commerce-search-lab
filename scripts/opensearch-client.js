import { existsSync, readFileSync } from 'node:fs';

function loadDotEnv() {
	if (!existsSync('.env')) return;

	const lines = readFileSync('.env', 'utf8').split('\n');

	for (const line of lines) {
		const trimmed = line.trim();

		if (!trimmed || trimmed.startsWith('#')) continue;

		const separatorIndex = trimmed.indexOf('=');
		if (separatorIndex === -1) continue;

		const key = trimmed.slice(0, separatorIndex);
		const value = trimmed.slice(separatorIndex + 1).replace(/^["']|["']$/g, '');

		process.env[key] ??= value;
	}
}

loadDotEnv();

export const opensearchUrl =
	process.env.OPENSEARCH_URL ?? `http://127.0.0.1:${process.env.OPENSEARCH_HTTP_PORT ?? '9200'}`;

export const productsIndex = process.env.OPENSEARCH_PRODUCTS_INDEX ?? 'products';

export async function opensearchRequest(path, options = {}) {
	const response = await fetch(`${opensearchUrl}${path}`, {
		...options,
		headers: {
			'content-type': 'application/json',
			...options.headers
		}
	});

	const body = await response.text();
	const data = body ? JSON.parse(body) : null;

	if (!response.ok) {
		throw new Error(
			`OpenSearch request failed: ${response.status} ${response.statusText}\n${JSON.stringify(data, null, 2)}`
		);
	}

	return data;
}
