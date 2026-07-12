<script lang="ts">
	import type {
		ProductFacetBucket,
		ProductFacetKey,
		ProductFacets,
		ProductSearchFilters
	} from '$lib/search/product';

	type FacetSection = {
		key: ProductFacetKey;
		label: string;
		buckets: ProductFacetBucket[];
	};

	type Props = {
		facets: ProductFacets;
		selectedFilters: ProductSearchFilters;
		isLoading: boolean;
		onToggleFacet: (field: ProductFacetKey, value: string) => void;
		onClearFilters: () => void;
	};

	let { facets, selectedFilters, isLoading, onToggleFacet, onClearFilters }: Props = $props();

	const facetSections = $derived<FacetSection[]>([
		{ key: 'category', label: 'Category', buckets: facets.category },
		{ key: 'brand', label: 'Brand', buckets: facets.brand }
	]);

	const activeFilterCount = $derived(
		Object.values(selectedFilters).reduce((count, values) => count + (values?.length ?? 0), 0)
	);

	function isSelected(field: ProductFacetKey, value: string): boolean {
		return selectedFilters[field]?.includes(value) ?? false;
	}
</script>

<aside class="space-y-6">
	<div class="flex items-center justify-between gap-3">
		<h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500">Filters</h2>
		{#if activeFilterCount > 0}
			<button
				class="text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline disabled:cursor-not-allowed disabled:text-slate-400"
				type="button"
				disabled={isLoading}
				onclick={onClearFilters}
			>
				Clear
			</button>
		{/if}
	</div>

	{#each facetSections as section (section.key)}
		<section class="space-y-3">
			<h3 class="font-semibold text-slate-950">{section.label}</h3>
			{#if section.buckets.length > 0}
				<div class="space-y-2">
					{#each section.buckets as bucket (bucket.key)}
						{@const selected = isSelected(section.key, bucket.key)}
						<label
							class={`flex cursor-pointer items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 ${selected ? 'border-slate-950 bg-slate-50' : 'border-slate-200 bg-white'}`}
						>
							<span class="flex min-w-0 items-center gap-2">
								<input
									class="rounded border-slate-300 text-slate-950 focus:ring-slate-950 disabled:cursor-not-allowed"
									type="checkbox"
									checked={selected}
									disabled={isLoading}
									onchange={() => onToggleFacet(section.key, bucket.key)}
								/>
								<span class="truncate">{bucket.key}</span>
							</span>
							<span class="shrink-0 text-xs tabular-nums text-slate-500">{bucket.doc_count}</span>
						</label>
					{/each}
				</div>
			{:else}
				<p
					class="rounded-md border border-dashed border-slate-200 px-3 py-4 text-sm text-slate-500"
				>
					No filters.
				</p>
			{/if}
		</section>
	{/each}
</aside>
