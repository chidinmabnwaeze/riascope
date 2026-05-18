<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import PageShell from '$lib/components/PageShell.svelte';
	import { records, resetSession } from '$lib/stores';
	import type { DiagnosticRecord } from '$lib/types';

	let allRecords = $state<DiagnosticRecord[]>(get(records));
	records.subscribe((r) => (allRecords = r));

	const record = $derived.by<DiagnosticRecord | null>(() => {
		const id = page.url.searchParams.get('id');
		return allRecords.find((r) => r.id === id) ?? allRecords[0] ?? null;
	});

	function close() {
		resetSession();
		goto('/');
	}

	function reanalyze() {
		// Send back to analyze keeping the same patient info
		goto('/new/analyze');
	}

	function viewSnapshots() {
		if (record) goto(`/records/${record.id}`);
	}

	function formatDateLong(iso: string) {
		try {
			const d = new Date(iso);
			return d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
		} catch {
			return iso;
		}
	}
</script>

<PageShell title="Analysis results">
	<div class="w-full max-w-2xl mx-auto mt-2 fade-in">
		{#if record}
			<div class="glass-card p-7 sm:p-9">
				<!-- Patient header -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5 border-b border-rose-100/80 stagger">
					<div>
						<p class="field-label">Firstname</p>
						<p class="font-semibold text-ink text-lg">{record.firstName}</p>
					</div>
					<div>
						<p class="field-label">Surname</p>
						<p class="font-semibold text-ink text-lg">{record.surname}</p>
					</div>
					<div>
						<p class="field-label">Patient ID</p>
						<p class="font-mono text-sm text-ink break-all">{record.patientId}</p>
					</div>
					<div>
						<p class="field-label">Date</p>
						<p class="font-semibold text-ink text-sm">{formatDateLong(record.date)}</p>
					</div>
				</div>

				<!-- Result block -->
				<div class="pt-6 space-y-5 stagger">
					<div>
						<p class="field-label">Status</p>
						<div class="flex items-center gap-2.5">
							{#if record.status === 'Positive'}
								<span class="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
								<span class="font-display italic text-2xl font-semibold text-rose-700">Positive</span>
							{:else}
								<span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
								<span class="font-display italic text-2xl font-semibold text-emerald-700">Negative</span>
							{/if}
						</div>
					</div>
					<div>
						<p class="field-label">Grade</p>
						<p class="font-semibold text-ink text-lg">{record.grade}</p>
					</div>
					<div>
						<p class="field-label">Film type</p>
						<p class="font-semibold text-ink text-lg">{record.filmType}</p>
					</div>
				</div>

				<button class="pill-btn btn-primary w-full mt-7" onclick={viewSnapshots}>
					View snapshots
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="3" width="18" height="18" rx="2" />
						<circle cx="8.5" cy="8.5" r="1.5" />
						<path d="M21 15l-5-5L5 21" />
					</svg>
				</button>
			</div>

			<div class="mt-5 flex flex-col-reverse sm:flex-row items-center justify-center gap-3">
				<button class="pill-btn btn-secondary w-full sm:w-auto" onclick={close}>Close analysis</button>
				<button class="pill-btn btn-primary w-full sm:w-auto" onclick={reanalyze}>
					Reanalyze sample
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
						<path d="M21 3v5h-5" />
						<path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
						<path d="M3 21v-5h5" />
					</svg>
				</button>
			</div>
		{:else}
			<div class="glass-card p-10 text-center">
				<p class="text-ink-soft">No result available.</p>
				<button class="pill-btn btn-primary mt-5" onclick={close}>Back to start</button>
			</div>
		{/if}
	</div>
</PageShell>
