<script lang="ts">
	import { goto } from '$app/navigation';
	import PageShell from '$lib/components/PageShell.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import { records } from '$lib/stores';
	import type { DiagnosticRecord } from '$lib/types';

	let query = $state('');
	let allRecords = $state<DiagnosticRecord[]>([]);

	records.subscribe((r) => (allRecords = r))();

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return allRecords;
		return allRecords.filter(
			(r) =>
				r.firstName.toLowerCase().includes(q) ||
				r.surname.toLowerCase().includes(q) ||
				r.patientId.toLowerCase().includes(q) ||
				r.date.includes(q)
		);
	});

	function open(rec: DiagnosticRecord) {
		goto(`/records/${rec.id}`);
	}
</script>

<PageShell title="All records">
	<div class="w-full max-w-5xl mx-auto mt-2 fade-in">
		<div class="mb-4">
			<BackButton href="/records" />
		</div>

		<div class="glass-card p-5 sm:p-7">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
				<div>
					<h3 class="font-display italic text-xl text-rose-800 font-semibold">Diagnostic records</h3>
					<p class="text-xs text-ink-soft mt-1">{filtered.length} of {allRecords.length} records</p>
				</div>
				<div class="relative w-full sm:w-72">
					<svg class="absolute left-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c1758" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="7" />
						<path d="M21 21l-4.3-4.3" />
					</svg>
					<input
						type="text"
						bind:value={query}
						placeholder="Search by name, ID, or date"
						class="w-full pl-10 pr-4 py-2.5 rounded-full bg-rose-50/60 border border-rose-100 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition"
					/>
				</div>
			</div>

			<!-- Desktop table -->
			<div class="hidden md:block overflow-hidden rounded-2xl border border-rose-100/80">
				<table class="w-full">
					<thead>
						<tr class="bg-rose-50/70 text-left text-xs uppercase tracking-wider text-ink-soft font-semibold">
							<th class="px-5 py-3">Patient ID</th>
							<th class="px-5 py-3">Firstname</th>
							<th class="px-5 py-3">Surname</th>
							<th class="px-5 py-3">Date</th>
							<th class="px-5 py-3 text-right">Result</th>
							<th class="px-5 py-3 w-12"></th>
						</tr>
					</thead>
					<tbody>
						{#each filtered as rec, i (rec.id)}
							<tr
								class="border-t border-rose-100/70 hover:bg-rose-50/50 transition-colors cursor-pointer fade-in"
								style="animation-delay: {i * 0.03}s;"
								onclick={() => open(rec)}
							>
								<td class="px-5 py-3.5 font-mono text-xs text-ink/80 truncate max-w-[180px]">{rec.patientId}</td>
								<td class="px-5 py-3.5 text-sm font-medium">{rec.firstName}</td>
								<td class="px-5 py-3.5 text-sm font-medium">{rec.surname}</td>
								<td class="px-5 py-3.5 text-sm text-ink-soft tabular-nums">{rec.date}</td>
								<td class="px-5 py-3.5 text-right">
									{#if rec.status === 'Positive'}
										<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
											<span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
											{rec.status} · {rec.grade}
										</span>
									{:else}
										<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
											<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
											{rec.status}
										</span>
									{/if}
								</td>
								<td class="px-5 py-3.5 text-right">
									<button class="w-8 h-8 rounded-lg hover:bg-rose-100 inline-flex items-center justify-center transition-colors" aria-label="Open record">
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7d0e46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
											<path d="M15 3h6v6" />
											<path d="M10 14L21 3" />
										</svg>
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Mobile cards -->
			<div class="md:hidden grid grid-cols-1 gap-2.5 stagger">
				{#each filtered as rec (rec.id)}
					<button
						type="button"
						onclick={() => open(rec)}
						class="text-left p-4 rounded-2xl border border-rose-100 bg-white/60 hover:bg-white transition-all"
					>
						<div class="flex items-start justify-between gap-3 mb-2">
							<div class="min-w-0 flex-1">
								<p class="font-semibold text-sm truncate">{rec.firstName} {rec.surname}</p>
								<p class="font-mono text-[11px] text-ink/60 truncate">{rec.patientId}</p>
							</div>
							{#if rec.status === 'Positive'}
								<span class="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">{rec.grade}</span>
							{:else}
								<span class="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">Neg</span>
							{/if}
						</div>
						<p class="text-xs text-ink-soft tabular-nums">{rec.date}</p>
					</button>
				{/each}
			</div>

			{#if filtered.length === 0}
				<div class="text-center py-12">
					<p class="text-ink-soft text-sm">No records match "{query}".</p>
				</div>
			{/if}
		</div>
	</div>
</PageShell>
