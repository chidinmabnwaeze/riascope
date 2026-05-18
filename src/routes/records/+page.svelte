<script lang="ts">
	import { goto } from '$app/navigation';
	import PageShell from '$lib/components/PageShell.svelte';
	import { records } from '$lib/stores';
	import type { DiagnosticRecord } from '$lib/types';

	let firstName = $state('');
	let surname = $state('');
	let patientId = $state('');
	let analysisDate = $state('');
	let allRecords = $state<DiagnosticRecord[]>([]);

	records.subscribe((r) => (allRecords = r))();

	function back() {
		goto('/');
	}

	function search() {
		const fn = firstName.trim().toLowerCase();
		const sn = surname.trim().toLowerCase();
		const pid = patientId.trim().toLowerCase();
		const dt = analysisDate.trim();

		const hasAny = fn || sn || pid || dt;
		if (!hasAny) {
			// Treat empty search as "show all"
			goto('/records/all');
			return;
		}

		const match = allRecords.find((r) => {
			const matchFn = !fn || r.firstName.toLowerCase().includes(fn);
			const matchSn = !sn || r.surname.toLowerCase().includes(sn);
			const matchPid = !pid || r.patientId.toLowerCase().includes(pid);
			const matchDt = !dt || r.date === dt;
			return matchFn && matchSn && matchPid && matchDt;
		});

		if (match) {
			goto(`/records/${match.id}`);
		} else {
			const params = new URLSearchParams();
			if (fn) params.set('fn', fn);
			if (sn) params.set('sn', sn);
			if (pid) params.set('pid', pid);
			if (dt) params.set('dt', dt);
			goto(`/records/none?${params.toString()}`);
		}
	}
</script>

<PageShell title="Patient records">
	<div class="w-full max-w-2xl mx-auto mt-4 fade-in">
		<div class="glass-card p-7 sm:p-10">
			<div class="text-center mb-7">
				<p class="text-xs uppercase tracking-[0.25em] text-rose-700/70 font-semibold mb-2">Find a record</p>
				<h2 class="font-display italic text-rose-800 text-2xl sm:text-3xl">Enter patient information</h2>
				<p class="text-ink-soft text-sm mt-2">Search by any combination of fields — or view all diagnostic records.</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
				<div>
					<label for="rfn" class="field-label block">Patient Firstname</label>
					<input id="rfn" type="text" class="field-input" bind:value={firstName} placeholder="e.g. Dara" />
				</div>
				<div>
					<label for="rsn" class="field-label block">Patient Surname</label>
					<input id="rsn" type="text" class="field-input" bind:value={surname} placeholder="e.g. Simi" />
				</div>
				<div class="sm:col-span-2">
					<label for="rpid" class="field-label block">Patient ID</label>
					<input id="rpid" type="text" class="field-input font-mono text-sm" bind:value={patientId} placeholder="e.g. 1233444545gjkn844" />
				</div>
				<div class="sm:col-span-2">
					<label for="rdt" class="field-label block">Analysis date</label>
					<div class="relative">
						<input id="rdt" type="date" class="field-input pl-11" bind:value={analysisDate} />
						<svg class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7d0e46" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							<rect x="3" y="4" width="18" height="18" rx="2" />
							<path d="M16 2v4M8 2v4M3 10h18" />
						</svg>
					</div>
				</div>
			</div>

			<div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 mt-8">
				<button class="pill-btn btn-secondary w-full sm:w-auto" onclick={back}>Cancel</button>
				<div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
					<button class="pill-btn btn-primary w-full sm:w-auto" onclick={search}>
						Continue
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
					</button>
					<a href="/records/all" class="pill-btn !bg-ink !text-white shadow-md hover:!bg-ink-soft transition-colors text-center">
						Show all records
						<span class="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">{allRecords.length}</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</PageShell>
