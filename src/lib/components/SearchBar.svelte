<script lang="ts">
	type Props = {
		searchTerm: string;
		isLoading: boolean;
		onSearch: (term: string) => void;
	};

	let { searchTerm, isLoading, onSearch }: Props = $props();
	let draftTerm = $derived(searchTerm);

	function submitSearch(event: SubmitEvent) {
		event.preventDefault();
		onSearch(draftTerm);
	}
</script>

<form class="flex w-full flex-col gap-3 sm:flex-row" onsubmit={submitSearch}>
	<label class="sr-only" for="product-search">Search products</label>
	<input
		id="product-search"
		class="min-h-12 flex-1 rounded-md border border-slate-300 bg-white px-4 text-base text-slate-950 shadow-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
		type="search"
		placeholder="Search shoes, laptops, coffee makers..."
		maxlength="120"
		autocomplete="off"
		disabled={isLoading}
		bind:value={draftTerm}
	/>
	<button
		class="min-h-12 rounded-md bg-slate-950 px-6 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
		type="submit"
		disabled={isLoading}
	>
		{isLoading ? 'Searching' : 'Search'}
	</button>
</form>
