<script lang="ts">
	import FacetsPanel from '$lib/components/FacetsPanel.svelte';
	import ProductGrid from '$lib/components/ProductGrid.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type {
		Product,
		ProductFacetKey,
		ProductFacets,
		ProductSearchFilters
	} from '$lib/search/product';
	import { OpensearchAPIClient } from '../infrastructure/opensearch-client';
	import { onMount } from 'svelte';

	let searchTerm = $state('');
	let selectedFilters = $state<ProductSearchFilters>({});
	let products = $state<Product[]>([]);
	let facets = $state<ProductFacets>({ brand: [], category: [] });
	let total = $state(0);
	let currentPage = $state(1);
	let isLoading = $state(false);
	let errorMessage = $state<string | null>(null);
	let latestRequestId = 0;
	const pageSize = 10;
	const totalPages = $derived(Math.max(Math.ceil(total / pageSize), 1));
	const pageStart = $derived(total === 0 ? 0 : (currentPage - 1) * pageSize + 1);
	const pageEnd = $derived(Math.min(currentPage * pageSize, total));
	const visiblePages = $derived(getVisiblePages(currentPage, totalPages));

	onMount(() => {
		void searchProducts();
	});

	async function searchProducts() {
		const requestId = latestRequestId + 1;
		latestRequestId = requestId;
		isLoading = true;
		errorMessage = null;

		try {
			const result = await OpensearchAPIClient.searchProducts({
				term: searchTerm,
				filters: selectedFilters,
				from: (currentPage - 1) * pageSize,
				size: pageSize
			});

			if (requestId !== latestRequestId) {
				return;
			}

			products = result.products;
			facets = result.facets;
			total = result.total;
		} catch (error) {
			if (requestId !== latestRequestId) {
				return;
			}

			products = [];
			facets = { brand: [], category: [] };
			total = 0;
			errorMessage =
				error instanceof Error
					? error.message
					: 'Could not load products. Check OpenSearch and try again.';
		} finally {
			if (requestId === latestRequestId) {
				isLoading = false;
			}
		}
	}

	function handleSearch(term: string) {
		searchTerm = normalizeSearchTerm(term);
		currentPage = 1;
		void searchProducts();
	}

	function handleToggleFacet(field: ProductFacetKey, value: string) {
		const cleanValue = value.trim();

		if (!cleanValue) {
			return;
		}

		const currentValues = selectedFilters[field] ?? [];
		const nextValues = currentValues.includes(cleanValue)
			? currentValues.filter((currentValue) => currentValue !== cleanValue)
			: [...currentValues, cleanValue];

		const nextFilters = { ...selectedFilters };

		if (nextValues.length > 0) {
			nextFilters[field] = nextValues;
		} else {
			delete nextFilters[field];
		}

		selectedFilters = nextFilters;
		currentPage = 1;
		void searchProducts();
	}

	function handleClearFilters() {
		selectedFilters = {};
		currentPage = 1;
		void searchProducts();
	}

	function handlePageChange(page: number) {
		const nextPage = Math.min(Math.max(page, 1), totalPages);

		if (nextPage === currentPage || isLoading) {
			return;
		}

		currentPage = nextPage;
		void searchProducts();
	}

	function normalizeSearchTerm(term: string): string {
		return term.trim().replace(/\s+/g, ' ').slice(0, 120);
	}

	function getVisiblePages(page: number, pageCount: number): number[] {
		const firstPage = Math.max(1, Math.min(page - 2, pageCount - 4));
		const lastPage = Math.min(pageCount, firstPage + 4);

		return Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index);
	}
</script>

<svelte:head>
	<title>Commerce Search Lab</title>
	<meta
		name="description"
		content="Simple ecommerce search UI backed by OpenSearch product results and facets."
	/>
</svelte:head>

<main class="min-h-screen bg-slate-50 text-slate-950">
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
		<header class="space-y-4">
			<div>
				<p class="text-sm font-semibold uppercase tracking-wide text-slate-500">
					Commerce Search Lab
				</p>
				<h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
					Product search
				</h1>
			</div>
			<SearchBar {searchTerm} {isLoading} onSearch={handleSearch} />
		</header>

		{#if errorMessage}
			<div class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
				{errorMessage}
			</div>
		{/if}

		<section class="grid gap-8 lg:grid-cols-[18rem_1fr]">
			<FacetsPanel
				{facets}
				{selectedFilters}
				{isLoading}
				onToggleFacet={handleToggleFacet}
				onClearFilters={handleClearFilters}
			/>

			<div class="min-w-0 space-y-4">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<p class="text-sm text-slate-600">
						<span class="font-semibold text-slate-950">{total}</span>
						{total === 1 ? 'product' : 'products'}
						{#if searchTerm}
							for <span class="font-semibold text-slate-950">"{searchTerm}"</span>
						{/if}
					</p>
					{#if isLoading}
						<p class="text-sm font-medium text-slate-500">Updating results...</p>
					{/if}
				</div>

				<ProductGrid {products} {isLoading} />

				{#if total > pageSize}
					<nav
						class="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between"
						aria-label="Product results pagination"
					>
						<p class="text-sm text-slate-600">
							Showing
							<span class="font-semibold text-slate-950">{pageStart}-{pageEnd}</span>
							of
							<span class="font-semibold text-slate-950">{total}</span>
						</p>

						<div class="flex flex-wrap items-center gap-2">
							<button
								class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
								type="button"
								disabled={currentPage === 1 || isLoading}
								onclick={() => handlePageChange(currentPage - 1)}
							>
								Previous
							</button>

							{#each visiblePages as page (page)}
								<button
									class={`min-w-10 rounded-md border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed ${page === currentPage ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950 disabled:border-slate-200 disabled:text-slate-400'}`}
									type="button"
									aria-current={page === currentPage ? 'page' : undefined}
									disabled={isLoading}
									onclick={() => handlePageChange(page)}
								>
									{page}
								</button>
							{/each}

							<button
								class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
								type="button"
								disabled={currentPage === totalPages || isLoading}
								onclick={() => handlePageChange(currentPage + 1)}
							>
								Next
							</button>
						</div>
					</nav>
				{/if}
			</div>
		</section>
	</div>
</main>
