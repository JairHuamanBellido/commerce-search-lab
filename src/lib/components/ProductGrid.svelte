<script lang="ts">
	import type { Product } from '$lib/search/product';

	type Props = {
		products: Product[];
		isLoading: boolean;
	};

	let { products, isLoading }: Props = $props();

	const priceFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});
</script>

{#if products.length > 0}
	<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
		{#each products as product (product.id)}
			<article
				class="flex min-h-56 flex-col rounded-md border border-slate-200 bg-white p-4 shadow-sm"
			>
				<div class="flex items-start justify-between gap-3">
					<p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
						{product.category}
					</p>
					<p class="shrink-0 text-sm font-medium text-slate-700">{product.rating.toFixed(1)}</p>
				</div>
				<h3 class="mt-3 text-lg font-semibold leading-snug text-slate-950">{product.title}</h3>
				<p class="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
				<div class="mt-auto flex items-end justify-between gap-3 pt-5">
					<p class="min-w-0 truncate text-sm font-medium text-slate-500">{product.brand}</p>
					<p class="shrink-0 text-lg font-semibold text-slate-950">
						{priceFormatter.format(product.price)}
					</p>
				</div>
			</article>
		{/each}
	</div>
{:else if isLoading}
	<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
		{#each Array.from({ length: 6 }, (_, index) => index) as skeletonKey (skeletonKey)}
			<div class="min-h-56 animate-pulse rounded-md border border-slate-200 bg-white p-4">
				<div class="h-4 w-24 rounded bg-slate-200"></div>
				<div class="mt-5 h-6 w-4/5 rounded bg-slate-200"></div>
				<div class="mt-4 space-y-2">
					<div class="h-4 rounded bg-slate-200"></div>
					<div class="h-4 w-5/6 rounded bg-slate-200"></div>
					<div class="h-4 w-2/3 rounded bg-slate-200"></div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="rounded-md border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
		<h3 class="text-lg font-semibold text-slate-950">No products found</h3>
		<p class="mt-2 text-sm text-slate-600">Try another search or remove filters.</p>
	</div>
{/if}
