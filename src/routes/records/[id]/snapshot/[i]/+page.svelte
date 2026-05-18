<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import PageShell from '$lib/components/PageShell.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { records } from '$lib/stores';
	import type { DiagnosticRecord } from '$lib/types';

	let allRecords = $state<DiagnosticRecord[]>(get(records));
	records.subscribe((r) => (allRecords = r));

	const record = $derived<DiagnosticRecord | null>(allRecords.find((r) => r.id === page.params.id) ?? null);
	const currentIndex = $derived(parseInt(page.params.i ?? '0', 10) || 0);

	function prev() {
		if (!record) return;
		const newIdx = (currentIndex - 1 + record.snapshots.length) % record.snapshots.length;
		goto(`/records/${record.id}/snapshot/${newIdx}`);
	}

	function next() {
		if (!record) return;
		const newIdx = (currentIndex + 1) % record.snapshots.length;
		goto(`/records/${record.id}/snapshot/${newIdx}`);
	}

	function jumpTo(i: number) {
		if (!record) return;
		goto(`/records/${record.id}/snapshot/${i}`);
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window on:keydown={handleKey} />

<PageShell title="Patient records">
	<div class="w-full max-w-4xl mx-auto mt-2 fade-in">
		<div class="mb-4 flex items-center justify-between">
			<BackButton href={record ? `/records/${record.id}` : '/records/all'} />
			{#if record}
				<span class="text-xs text-ink-soft font-mono px-3 py-1.5 rounded-full bg-white/60 border border-rose-100">
					{currentIndex + 1} / {record.snapshots.length}
				</span>
			{/if}
		</div>

		{#if record && record.snapshots[currentIndex]}
			<div class="glass-card p-5 sm:p-7">
				<div class="relative rounded-2xl overflow-hidden bg-rose-50 aspect-[16/10]">
					{#key currentIndex}
						<img
							src={record.snapshots[currentIndex]}
							alt="Snapshot {currentIndex + 1}"
							class="absolute inset-0 w-full h-full object-cover fade-in"
						/>
					{/key}

					<!-- Corner brackets -->
					<div class="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-rose-600/70 rounded-tl-md"></div>
					<div class="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-rose-600/70 rounded-tr-md"></div>
					<div class="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-rose-600/70 rounded-bl-md"></div>
					<div class="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-rose-600/70 rounded-br-md"></div>

					<!-- Prev / Next -->
					<button
						class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-ink/80 transition-colors"
						onclick={prev}
						aria-label="Previous snapshot"
					>
						<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
					</button>
					<button
						class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-ink/80 transition-colors"
						onclick={next}
						aria-label="Next snapshot"
					>
						<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
					</button>

					<!-- Patient label -->
					<div class="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs flex items-center gap-2">
						<span class="font-semibold">{record.firstName} {record.surname}</span>
						<span class="opacity-60">·</span>
						<span class="font-mono opacity-90">#{currentIndex + 1}</span>
					</div>
				</div>

				<!-- Thumbnail strip -->
				<div class="mt-4 flex gap-2 overflow-x-auto pb-1">
					{#each record.snapshots as snap, i}
						<button
							type="button"
							onclick={() => jumpTo(i)}
							class="shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all"
							class:ring-2={i === currentIndex}
							class:ring-rose-500={i === currentIndex}
							class:opacity-50={i !== currentIndex}
							aria-label="Jump to snapshot {i + 1}"
						>
							<img src={snap} alt="Thumbnail {i + 1}" class="w-full h-full object-cover" loading="lazy" />
						</button>
					{/each}
				</div>
			</div>

			<p class="text-center mt-4 text-xs text-ink-soft">
				Use <kbd class="px-1.5 py-0.5 rounded bg-white/70 border border-rose-100 font-mono">←</kbd> <kbd class="px-1.5 py-0.5 rounded bg-white/70 border border-rose-100 font-mono">→</kbd> to navigate
			</p>
		{:else}
			<div class="glass-card p-10 text-center">
				<p class="text-ink-soft">Snapshot not found.</p>
				<button class="pill-btn btn-primary mt-5" onclick={() => goto('/records/all')}>Browse records</button>
			</div>
		{/if}
	</div>
</PageShell>
