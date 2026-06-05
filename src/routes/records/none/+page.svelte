<script lang="ts">
	import { goto } from '$app/navigation';
	import PageShell from '../../../components/PageShell.svelte';
	import BackButton from '../../../components/BackButton.svelte';
</script>

<PageShell title="Patient records">
	<div class="w-full max-w-2xl mx-auto mt-2 fade-in">
		<div class="mb-4">
			<BackButton href="/records" />
		</div>

		<div class="glass-card p-10 sm:p-14 text-center">
			<div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-rose-50 flex items-center justify-center">
				<!-- Document with search icon -->
				<svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="#7d0e46" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
					<rect x="10" y="8" width="36" height="44" rx="3" />
					<path d="M16 16h18" stroke-width="1.6" opacity="0.6" />
					<path d="M16 22h14" stroke-width="1.6" opacity="0.6" />
					<circle cx="40" cy="44" r="10" fill="white" />
					<circle cx="40" cy="44" r="6" />
					<path d="M45 49l5 5" />
				</svg>
			</div>

			<h3 class="font-display italic text-2xl text-rose-800 font-semibold mb-2">No matching records</h3>
			<p class="text-ink-soft text-sm max-w-sm mx-auto leading-relaxed">
				We couldn't find any records matching your request. Try adjusting your search or browse all records.
			</p>

			<div class="mt-7 flex flex-col-reverse sm:flex-row gap-3 justify-center">
				<!-- <button class="pill-btn btn-secondary" onclick={() => goto('/records')}>Refine search</button> -->
				<button class="pill-btn btn-primary" onclick={() => goto('/records')}>
					Browse all records
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
				</button>
			</div>
		</div>
	</div>
</PageShell>
