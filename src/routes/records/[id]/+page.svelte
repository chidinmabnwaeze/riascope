<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { get } from 'svelte/store';
	import PageShell from '../../../components/PageShell.svelte';
	import BackButton from '../../../components/BackButton.svelte';
	import { records } from '$lib/stores';
	import type { DiagnosticRecord } from '$lib/types';

	let allRecords = $state<DiagnosticRecord[]>(get(records));
	records.subscribe((r) => (allRecords = r));

	const record = $derived(allRecords.find((r) => String(r.id) === page.params.id) ?? null);

	function viewSnapshot(idx: number) {
		if (record) goto(`/records/${record.id}/snapshot/${idx}`);
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

<PageShell title="Patient result">
	<div class="w-full max-w-2xl mx-auto mt-2 fade-in">
		<div class="mb-4">
			<BackButton href="/records/all" />
		</div>

		{#if record}
			<!-- Result card -->
			<div class="glass-card p-7 sm:p-9 mb-5">
				<h3 class="font-display italic text-xl font-semibold text-ink mb-5">Result</h3>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5 border-b border-rose-100/80 stagger">
					<div>
						<p class="field-label">Firstname</p>
						<p class="font-semibold text-ink">{record.firstName}</p>
					</div>
					<div>
						<p class="field-label">Surname</p>
						<p class="font-semibold text-ink">{record.surname}</p>
					</div>
					<div>
						<p class="field-label">Patient ID</p>
						<p class="font-mono text-sm text-ink break-all">{record.patientId}</p>
					</div>
					<div>
						<p class="field-label">Date</p>
						<p class="font-medium text-ink text-sm">{formatDateLong(record.date)}</p>
					</div>
				</div>

				<div class="pt-6 space-y-5 stagger">
					<div>
						<p class="field-label">Status</p>
						{#if record.status === 'Positive'}
							<div class="flex items-center gap-2.5">
								<span class="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
								<span class="font-display italic text-xl font-semibold text-rose-700">Positive</span>
							</div>
						{:else}
							<div class="flex items-center gap-2.5">
								<span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
								<span class="font-display italic text-xl font-semibold text-emerald-700">Negative</span>
							</div>
						{/if}
					</div>
					<div class="grid grid-cols-2 gap-5">
						<div>
							<p class="field-label">Grade</p>
							<p class="font-semibold text-ink">{record.grade}</p>
						</div>
						<div>
							<p class="field-label">Film Type</p>
							<p class="font-semibold text-ink">{record.filmType}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Snapshots -->
			<div class="glass-card p-7 sm:p-9">
				<div class="flex items-center justify-between mb-5">
					<h3 class="font-display italic text-xl font-semibold text-ink">Snapshots</h3>
					<span class="text-xs text-ink-soft font-medium">{record.snapshots.length} captured</span>
				</div>

				<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger">
					{#each record.snapshots as snap, i (i)}
						<button
							type="button"
							class="group relative aspect-square rounded-2xl overflow-hidden bg-rose-50 hover:ring-2 hover:ring-rose-400 transition-all"
							onclick={() => viewSnapshot(i)}
							aria-label="View snapshot {i + 1}"
						>
							<img src={snap} alt="Snapshot {i + 1}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
							<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
							<span class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur text-white text-[10px] font-mono">#{i + 1}</span>
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<div class="glass-card p-10 text-center">
				<p class="text-ink-soft">Record not found.</p>
				<button class="pill-btn btn-primary mt-5" onclick={() => goto('/records/all')}>Browse all records</button>
			</div>
		{/if}
	</div>
</PageShell>
