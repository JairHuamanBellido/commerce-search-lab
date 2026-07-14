<script lang="ts">
	import type { ProductSortOption } from '$lib/search/product';

	type SortChoice = {
		value: ProductSortOption;
		label: string;
	};

	type Props = {
		selectedSort: ProductSortOption;
		isLoading: boolean;
		onSortChange: (sort: ProductSortOption) => void;
	};

	let { selectedSort, isLoading, onSortChange }: Props = $props();

	const sortChoices: SortChoice[] = [
		{ value: 'relevance', label: 'Relevance' },
		{ value: 'price-asc', label: 'Price: low to high' },
		{ value: 'price-desc', label: 'Price: high to low' },
		{ value: 'rating-desc', label: 'Rating' },
		{ value: 'newest', label: 'Newest' }
	];

	function handleChange(event: Event) {
		const select = event.currentTarget as HTMLSelectElement;
		onSortChange(select.value as ProductSortOption);
	}
</script>

<label class="flex items-center gap-2 text-sm font-medium text-slate-700">
	<span>Sort</span>
	<select
		class="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
		value={selectedSort}
		disabled={isLoading}
		onchange={handleChange}
	>
		{#each sortChoices as choice (choice.value)}
			<option value={choice.value}>{choice.label}</option>
		{/each}
	</select>
</label>
