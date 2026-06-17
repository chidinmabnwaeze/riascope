<script lang="ts">
	import { goto } from '$app/navigation';
	import PageShell from '../../components/PageShell.svelte';
	import BackButton from '../../components/BackButton.svelte';
	import { records } from '$lib/stores';
	import type { DiagnosticRecord } from '$lib/types';
	import { userService } from '$lib/services/user';
	import { analyseService } from '$lib/services/analyse';

	let query = $state('');
	let allRecords = $state<DiagnosticRecord[]>([]);

	let showConfirmModal = $state(false);
	let recordToDelete = $state<DiagnosticRecord | null>(null);
	let selectMode = $state(false);
	let selectedIds = $state<Set<number>>(new Set());
	let showBulkConfirmModal = $state(false);

	records.subscribe((r) => (allRecords = r))();

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return allRecords;
		return allRecords.filter(
			(r) =>
				r.first_name.toLowerCase().includes(q) ||
				r.surname.toLowerCase().includes(q) ||
				r.patient_id.toLowerCase().includes(q) ||
				r.created_at.includes(q)
		);
	});

	const allFilteredSelected = $derived(
		filtered.length > 0 && filtered.every((r) => selectedIds.has(r.id))
	);

	const getRecords = async () => {
		try {
			const response = await userService.getUsers();
			allRecords = response.data.users;
		} catch (error) {
			console.error('Failed to fetch records:', error);
		}
	};

	$effect(() => {
		getRecords();
	});

	function promptDelete(e: MouseEvent, rec: DiagnosticRecord) {
		e.stopPropagation();
		recordToDelete = rec;
		showConfirmModal = true;
	}

	async function confirmDelete() {
		if (!recordToDelete) return;
		const id = recordToDelete.id;
		showConfirmModal = false;
		recordToDelete = null;
		// Remove immediately so the UI updates even if re-fetch is slow/stale
		allRecords = allRecords.filter((r) => r.id !== id);
		try {
			await analyseService.deleteAnalysisById(id);
		} catch (error) {
			console.error('Failed to delete record:', error);
			// Re-fetch to restore accurate state on failure
			await getRecords();
		}
	}

	function cancelDelete() {
		showConfirmModal = false;
		recordToDelete = null;
	}

	function toggleSelectMode() {
		selectMode = !selectMode;
		selectedIds = new Set();
	}

	function toggleSelect(id: number) {
		const next = new Set(selectedIds);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selectedIds = next;
	}

	function toggleSelectAll() {
		if (allFilteredSelected) {
			selectedIds = new Set();
		} else {
			selectedIds = new Set(filtered.map((r) => r.id));
		}
	}

	async function confirmBulkDelete() {
		const ids = new Set(selectedIds);
		showBulkConfirmModal = false;
		selectedIds = new Set();
		selectMode = false;
		// Remove immediately so the UI updates even if re-fetch is slow/stale
		allRecords = allRecords.filter((r) => !ids.has(r.id));
		try {
			await Promise.all([...ids].map((id) => analyseService.deleteAnalysisById(id)));
		} catch (error) {
			console.error('Failed to bulk delete records:', error);
			// Re-fetch to restore accurate state on failure
			await getRecords();
		}
	}

	function formatDate(date: string) {
		try {
			return new Date(date).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			});
		} catch {
			return date;
		}
	}

	function open(rec: DiagnosticRecord) {
		if (selectMode) {
			toggleSelect(rec.id);
			return;
		}
		goto(`/records/${rec.id}`);
	}
</script>

<!-- Single delete confirmation modal -->
{#if showConfirmModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
	>
		<div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#be123c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="3 6 5 6 21 6" />
						<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
						<path d="M10 11v6" />
						<path d="M14 11v6" />
						<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
					</svg>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900">Delete record</h3>
					<p class="text-xs text-gray-500 mt-0.5">This action cannot be undone</p>
				</div>
			</div>
			<p class="text-sm text-gray-700 mb-6">
				Are you sure you want to delete the record for
				<span class="font-semibold">{recordToDelete?.first_name} {recordToDelete?.surname}</span>?
			</p>
			<div class="flex gap-3">
				<button
					onclick={cancelDelete}
					class="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
				<button
					onclick={confirmDelete}
					class="flex-1 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors"
				>
					Yes, delete
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Bulk delete confirmation modal -->
{#if showBulkConfirmModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
	>
		<div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
			<div class="flex items-center gap-3 mb-4">
				<div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#be123c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="3 6 5 6 21 6" />
						<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
						<path d="M10 11v6" />
						<path d="M14 11v6" />
						<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
					</svg>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900">Delete {selectedIds.size} record{selectedIds.size !== 1 ? 's' : ''}</h3>
					<p class="text-xs text-gray-500 mt-0.5">This action cannot be undone</p>
				</div>
			</div>
			<p class="text-sm text-gray-700 mb-6">
				Are you sure you want to delete <span class="font-semibold">{selectedIds.size} selected record{selectedIds.size !== 1 ? 's' : ''}</span>? They will be permanently removed.
			</p>
			<div class="flex gap-3">
				<button
					onclick={() => (showBulkConfirmModal = false)}
					class="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
				<button
					onclick={confirmBulkDelete}
					class="flex-1 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors"
				>
					Yes, delete all
				</button>
			</div>
		</div>
	</div>
{/if}

<PageShell title="All records">
	<div class="w-full max-w-5xl mx-auto mt-2 fade-in">
		<div class="mb-4">
			<BackButton href="/getStarted" />
		</div>

		<div class="glass-card p-5 sm:p-7">
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
				<div>
					<h3 class="font-display italic text-xl text-rose-800 font-semibold">
						Diagnostic records
					</h3>
					<p class="text-xs text-ink-soft mt-1">{filtered.length} of {allRecords.length} records</p>
				</div>
				<div class="flex items-center gap-2">
					<!-- Select / Cancel select button -->
					<button
						onclick={toggleSelectMode}
						class="shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors border {selectMode
							? 'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200'
							: 'bg-white text-ink-soft border-rose-100 hover:bg-rose-50'}"
					>
						{selectMode ? 'Cancel' : 'Select records'}
					</button>

					<!-- Bulk delete button (shown only when records are selected) -->
					{#if selectMode && selectedIds.size > 0}
						<button
							onclick={() => (showBulkConfirmModal = true)}
							class="shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors"
						>
							Delete ({selectedIds.size})
						</button>
					{/if}

					<div class="relative w-full sm:w-72">
						<svg
							class="absolute left-3.5 top-1/2 -translate-y-1/2"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#9c1758"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
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
			</div>

			<!-- Desktop table -->
			<div class="hidden md:block overflow-hidden rounded-2xl border border-rose-100/80">
				<table class="w-full">
					<thead>
						<tr
							class="bg-rose-50/70 text-left text-xs uppercase tracking-wider text-ink-soft font-semibold"
						>
							{#if selectMode}
								<th class="px-4 py-3">
									<input
										type="checkbox"
										checked={allFilteredSelected}
										onchange={toggleSelectAll}
										class="accent-rose-600 w-4 h-4 cursor-pointer"
										aria-label="Select all"
									/>
								</th>
							{/if}
							<th class="px-5 py-3">Patient ID</th>
							<th class="px-5 py-3">Firstname</th>
							<th class="px-5 py-3">Surname</th>
							<th class="px-5 py-3">Date</th>
							<th class="px-5 py-3 text-right">Result</th>
							<th class="px-5 py-3 w-12"></th>
							<th class="px-5 py-3 w-12"></th>
						</tr>
					</thead>
					<tbody>
						{#each filtered as rec, i (rec.id)}
							<tr
								class="border-t border-rose-100/70 hover:bg-rose-50/50 transition-colors cursor-pointer fade-in {selectedIds.has(rec.id) ? 'bg-rose-50/80' : ''}"
								style="animation-delay: {i * 0.03}s;"
								onclick={() => open(rec)}
							>
								{#if selectMode}
									<td class="px-4 py-3.5">
										<input
											type="checkbox"
											checked={selectedIds.has(rec.id)}
											onchange={() => toggleSelect(rec.id)}
											onclick={(e) => e.stopPropagation()}
											class="accent-rose-600 w-4 h-4 cursor-pointer"
										/>
									</td>
								{/if}
								<td class="px-5 py-3.5 font-mono text-xs text-ink/80 truncate max-w-[180px]"
									>{rec.patient_id}</td
								>
								<td class="px-5 py-3.5 text-sm font-medium">{rec.first_name}</td>
								<td class="px-5 py-3.5 text-sm font-medium">{rec.surname}</td>
								<td class="px-5 py-3.5 text-sm text-ink-soft tabular-nums"
									>{formatDate(rec.created_at)}</td
								>
								<td class="px-5 py-3.5 text-right">
									{#if rec.status === 'positive'}
										<span
											class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200"
										>
											<span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
											{rec.status} · {rec.grade}
										</span>
									{:else}
										<span
											class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200"
										>
											<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
											{rec.status}
										</span>
									{/if}
								</td>
								<td class="px-2 py-3.5">
									<button
										onclick={(e) => promptDelete(e, rec)}
										class="w-8 h-8 rounded-lg hover:bg-rose-100 inline-flex items-center justify-center transition-colors"
										aria-label="Delete record"
									>
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#be123c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<polyline points="3 6 5 6 21 6" />
											<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
											<path d="M10 11v6" />
											<path d="M14 11v6" />
											<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
										</svg>
									</button>
								</td>
								<td class="px-2 py-3.5 text-right">
									<button
										onclick={(e) => { e.stopPropagation(); open(rec); }}
										class="w-8 h-8 rounded-lg hover:bg-rose-100 inline-flex items-center justify-center transition-colors"
										aria-label="Open record"
									>
										<svg
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#7d0e46"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
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
					<div
						class="relative text-left p-4 rounded-2xl border transition-all {selectedIds.has(rec.id)
							? 'border-rose-400 bg-rose-50'
							: 'border-rose-100 bg-white/60 hover:bg-white'}"
					>
						<button
							type="button"
							onclick={() => open(rec)}
							class="w-full text-left"
						>
							<div class="flex items-start justify-between gap-3 mb-2">
								<div class="min-w-0 flex-1 flex items-center gap-2">
									{#if selectMode}
										<input
											type="checkbox"
											checked={selectedIds.has(rec.id)}
											onchange={() => toggleSelect(rec.id)}
											onclick={(e) => e.stopPropagation()}
											class="accent-rose-600 w-4 h-4 cursor-pointer shrink-0"
										/>
									{/if}
									<div class="min-w-0">
										<p class="font-semibold text-sm truncate">{rec.first_name} {rec.surname}</p>
										<p class="font-mono text-[11px] text-ink/60 truncate">{rec.patient_id}</p>
									</div>
								</div>
								{#if rec.status === 'positive'}
									<span
										class="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200"
										>{rec.grade}</span
									>
								{:else}
									<span
										class="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200"
										>Neg</span
									>
								{/if}
							</div>
							<p class="text-xs text-ink-soft tabular-nums">{formatDate(rec.created_at)}</p>
						</button>

						<!-- Mobile delete button -->
						{#if !selectMode}
							<button
								onclick={(e) => promptDelete(e, rec)}
								class="absolute top-3 right-3 w-7 h-7 rounded-lg hover:bg-rose-100 inline-flex items-center justify-center transition-colors"
								aria-label="Delete record"
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#be123c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="3 6 5 6 21 6" />
									<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
									<path d="M10 11v6" />
									<path d="M14 11v6" />
									<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
								</svg>
							</button>
						{/if}
					</div>
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
