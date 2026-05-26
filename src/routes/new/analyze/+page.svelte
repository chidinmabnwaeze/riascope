<script lang="ts">
	import { goto } from '$app/navigation';
	import PageShell from '../../../components/PageShell.svelte';
	import { activeSession, sampleSnapshots, addRecord } from '$lib/stores';
	import type { ActiveSession, DiagnosticRecord, AnalysisStatus, AnalysisGrade } from '$lib/types';

	let session = $state<ActiveSession>({
		firstName: '',
		surname: '',
		patientId: '',
		created_at: '',
		filmType: null,
		snapshots: []
	});

	activeSession.subscribe((s) => {
		session = { ...s };
	})();

	let liveImageIndex = $state(0);
	let analyzing = $state(false);
	let showCancelModal = $state(false);
	let pulseIndex = $state(0);
	let takingSnapshot = $state(false);

	// Cycle the live preview to feel like a microscope feed
	let liveTimer: ReturnType<typeof setInterval>;
	$effect(() => {
		liveTimer = setInterval(() => {
			liveImageIndex = (liveImageIndex + 1) % sampleSnapshots.length;
			pulseIndex = (pulseIndex + 1) % 100;
		}, 3200);
		return () => clearInterval(liveTimer);
	});

	function takeSnapshot() {
		takingSnapshot = true;
		const snap = sampleSnapshots[liveImageIndex];
		activeSession.update((s) => ({ ...s, snapshots: [...s.snapshots, snap] }));
		setTimeout(() => (takingSnapshot = false), 250);
	}

	function formatDateLong(iso: string) {
		try {
			const d = new Date(iso);
			return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
		} catch {
			return iso;
		}
	}

	function analyzeSample() {
		if (analyzing) return;
		analyzing = true;

		// Pick result based on number of snapshots — purely deterministic mock behavior.
		const hasEnough = session.snapshots.length >= 2;
		const status: AnalysisStatus = hasEnough ? 'Positive' : 'Negative';
		const grade: AnalysisGrade = status === 'Positive' ? (['1+', '2+', '3+'][session.snapshots.length % 3] as AnalysisGrade) : 'Nil';

		setTimeout(() => {
			const rec: DiagnosticRecord = {
				id: 'rec-' + Math.random().toString(36).slice(2, 9),
				patientId: session.patientId,
				firstName: session.firstName,
				surname: session.surname,
				date: session.created_at,
				status,
				grade,
				filmType: (session.filmType ?? 'Thin') as 'Thick' | 'Thin',
				snapshots: session.snapshots.length ? session.snapshots : sampleSnapshots.slice(0, 4)
			};
			addRecord(rec);
			goto(`/new/result?id=${rec.id}`);
		}, 1400);
	}

	function confirmCancel() {
		showCancelModal = false;
		goto('/');
	}
</script>

<PageShell title="Analysis">
	<div class="w-full max-w-7xl mx-auto mt-2 fade-in">
		<div class="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-5">
			<!-- LIVE MICROSCOPE VIEW -->
			<div class="relative">
				<div class="glass-card relative overflow-hidden p-4 sm:p-5">
					<div class="relative rounded-2xl overflow-hidden bg-rose-50 aspect-[16/10] sm:aspect-[16/9]">
						<!-- Live blood smear image -->
						{#each sampleSnapshots as src, i}
							<img
								src={src}
								alt="Live microscopy view"
								class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
								style="opacity: {i === liveImageIndex ? 1 : 0};"
								loading={i < 2 ? 'eager' : 'lazy'}
							/>
						{/each}

						<!-- Scanning overlay -->
						<div class="absolute inset-0 scanning pointer-events-none"></div>

						<!-- Corner brackets -->
						<div class="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-rose-600/80 rounded-tl-md"></div>
						<div class="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-rose-600/80 rounded-tr-md"></div>
						<div class="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-rose-600/80 rounded-bl-md"></div>
						<div class="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-rose-600/80 rounded-br-md"></div>

						<!-- Snapshot flash -->
						{#if takingSnapshot}
							<div class="absolute inset-0 bg-white/80 transition-opacity duration-200"></div>
						{/if}

						<!-- Live indicator -->
						<div class="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5">
							<span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
							Live · 1000× magnification
						</div>

						<!-- Take Snapshot button -->
						<div class="absolute bottom-5 left-1/2 -translate-x-1/2">
							<button class="pill-btn btn-secondary shadow-lg" onclick={takeSnapshot} disabled={analyzing}>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
									<circle cx="12" cy="13" r="4" />
								</svg>
								Take Snapshot
							</button>
						</div>

						<!-- Captured snapshot strip -->
						{#if session.snapshots.length > 0}
							<div class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 max-h-[60%] overflow-y-auto pr-1">
								{#each session.snapshots.slice(-4) as snap, i}
									<div class="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md fade-in">
										<img src={snap} alt="Snapshot {i + 1}" class="w-full h-full object-cover" />
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Bottom strip with snapshot count -->
					<div class="flex items-center justify-between mt-3 px-1 text-xs text-ink-soft">
						<span class="flex items-center gap-2">
							<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
							Focus locked · Auto white balance
						</span>
						<span class="font-mono">{session.snapshots.length} snapshot{session.snapshots.length === 1 ? '' : 's'}</span>
					</div>
				</div>
			</div>

			<!-- SIDE PANEL -->
			<aside class="glass-card p-6 sm:p-7 flex flex-col">
				<div class="flex items-center gap-2 mb-5">
					<div class="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7d0e46" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							<path d="M10 2v14a4 4 0 0 0 8 0V2" /><path d="M8 2h12" />
						</svg>
					</div>
					<span class="font-display italic font-semibold text-rose-800">Sample analysis</span>
				</div>

				<div class="space-y-4 stagger">
					<div>
						<p class="field-label">Patient name</p>
						<p class="font-semibold text-ink">{session.firstName || '—'} {session.surname || ''}</p>
					</div>
					<div>
						<p class="field-label">Patient ID</p>
						<p class="font-mono text-sm text-ink break-all">{session.patientId || '—'}</p>
					</div>
					<div>
						<p class="field-label">Film type</p>
						<p class="font-semibold text-ink">{session.filmType ?? '—'}</p>
					</div>
					<div>
						<p class="field-label">Date</p>
						<p class="font-semibold text-ink">{formatDateLong(session.created_at)}</p>
					</div>
				</div>

				<div class="mt-auto pt-7 space-y-3">
					<button class="pill-btn bg-primary-gradient text-white  w-full" disabled={analyzing} onclick={analyzeSample}>
						{#if analyzing}
							<svg class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
								<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3" />
								<path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
							</svg>
							Analyzing…
						{:else}
							Analyze sample
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l4 4L19 4" /></svg>
						{/if}
					</button>
					<button class="pill-btn btn-danger w-full" disabled={analyzing} onclick={() => (showCancelModal = true)}>
						Cancel
					</button>
				</div>
			</aside>
		</div>
	</div>
</PageShell>

<!-- Cancel modal -->
{#if showCancelModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center px-4 fade-in"
		style="background: rgba(20, 5, 25, 0.55); backdrop-filter: blur(6px);"
		role="dialog"
		aria-modal="true"
	>
		<div class="glass-card max-w-md w-full p-7 text-center">
			<div class="w-14 h-14 rounded-full bg-rose-100 mx-auto flex items-center justify-center mb-4">
				<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d61f1f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10" />
					<path d="M12 8v4M12 16h.01" />
				</svg>
			</div>
			<h3 class="font-display italic text-2xl text-rose-800 font-semibold mb-2">Cancel Analysis</h3>
			<p class="text-ink-soft text-sm mb-6">All snapshots and sample data will be lost. This action cannot be undone.</p>
			<div class="flex flex-col-reverse sm:flex-row gap-3 justify-center">
				<button class="pill-btn btn-secondary" onclick={() => (showCancelModal = false)}>No, keep analyzing</button>
				<button class="pill-btn btn-danger" onclick={confirmCancel}>Yes, cancel</button>
			</div>
		</div>
	</div>
{/if}
