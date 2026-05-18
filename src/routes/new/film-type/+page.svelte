<script lang="ts">
	import { goto } from '$app/navigation';
	import PageShell from '$lib/components/PageShell.svelte';
	import { activeSession } from '$lib/stores';
	import type { FilmType } from '$lib/types';

	let selected = $state<FilmType>(null);

	activeSession.subscribe((s) => {
		if (s.filmType) selected = s.filmType;
	})();

	function back() {
		goto('/new/patient');
	}

	function begin() {
		if (!selected) return;
		activeSession.update((s) => ({ ...s, filmType: selected }));
		goto('/new/analyze');
	}
</script>

<PageShell title="Film type">
	<div class="w-full max-w-3xl mx-auto mt-4 fade-in">
		<div class="glass-card p-7 sm:p-10">
			<div class="text-center mb-8">
				<p class="text-xs uppercase tracking-[0.25em] text-rose-700/70 font-semibold mb-2">Step 2 of 3</p>
				<h2 class="font-display italic text-rose-800 text-2xl sm:text-3xl">Select preparation type</h2>
				<p class="text-ink-soft text-sm mt-2 max-w-md mx-auto">Choose the blood film preparation. This determines the analysis pipeline.</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
				<!-- Thick Film -->
				<button
					type="button"
					onclick={() => (selected = 'Thick')}
					class="relative overflow-hidden rounded-3xl p-7 text-left text-white transition-all duration-300 hover:-translate-y-1"
					class:ring-4={selected === 'Thick'}
					class:ring-rose-300={selected === 'Thick'}
					style="background: linear-gradient(135deg, #c2185b 0%, #6e0d3e 100%); box-shadow: 0 14px 36px -14px rgba(125, 14, 70, 0.5);"
				>
					<div class="absolute inset-0 opacity-15 pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 18px 18px;"></div>

					<div class="relative">
						<div class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
							<!-- Droplet icon -->
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 2.5c-3 4-7 8-7 12a7 7 0 0 0 14 0c0-4-4-8-7-12z" fill="rgba(255,255,255,0.15)" />
								<path d="M9 14a3 3 0 0 0 3 3" />
							</svg>
						</div>
						<h3 class="font-display text-xl font-semibold mb-1.5">Thick Film</h3>
						<p class="text-white/75 text-sm leading-relaxed">For parasite concentration and detection.</p>
					</div>

					{#if selected === 'Thick'}
						<div class="absolute top-4 right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center">
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-7" stroke="#7d0e46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</div>
					{/if}
				</button>

				<!-- Thin Film -->
				<button
					type="button"
					onclick={() => (selected = 'Thin')}
					class="relative overflow-hidden rounded-3xl p-7 text-left text-white transition-all duration-300 hover:-translate-y-1"
					class:ring-4={selected === 'Thin'}
					class:ring-rose-300={selected === 'Thin'}
					style="background: linear-gradient(135deg, #a51653 0%, #4a0a2c 100%); box-shadow: 0 14px 36px -14px rgba(125, 14, 70, 0.5);"
				>
					<div class="absolute inset-0 opacity-15 pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 18px 18px;"></div>

					<div class="relative">
						<div class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
							<!-- Test tube icon -->
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
								<path d="M10 2v14a4 4 0 0 0 8 0V2" />
								<path d="M8 2h12" />
								<path d="M10 12h8" />
								<circle cx="14" cy="14" r="0.8" fill="white" />
							</svg>
						</div>
						<h3 class="font-display text-xl font-semibold mb-1.5">Thin film</h3>
						<p class="text-white/75 text-sm leading-relaxed">For species identification and morphology.</p>
					</div>

					{#if selected === 'Thin'}
						<div class="absolute top-4 right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center">
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-7" stroke="#7d0e46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</div>
					{/if}
				</button>
			</div>

			<div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 mt-8">
				<button class="pill-btn btn-secondary w-full sm:w-auto" onclick={back}>
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
					Back
				</button>
				<button class="pill-btn btn-primary w-full sm:w-auto" disabled={!selected} onclick={begin} class:opacity-50={!selected} class:cursor-not-allowed={!selected}>
					Begin analysis
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
				</button>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-center gap-2">
			<span class="h-1.5 w-3 rounded-full bg-rose-300"></span>
			<span class="h-1.5 w-8 rounded-full bg-rose-600"></span>
			<span class="h-1.5 w-3 rounded-full bg-rose-300"></span>
		</div>
	</div>
</PageShell>
