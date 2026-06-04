<script lang="ts">
	import { goto } from '$app/navigation';
	import PageShell from '../../../components/PageShell.svelte';
	import { activeSession, addRecord, setActiveRecord } from '$lib/stores';
	import api from '$lib/api';
	import type { ActiveSession, DiagnosticRecord } from '$lib/types';

	const backendUrl = (import.meta.env.VITE_PUBLIC_API_URL as string)?.replace(/\/$/, '') ?? '';
	let isAnalyzing = $state(false);

	let session = $state<ActiveSession>({
		first_name: '',
		surname: '',
		patient_id: '',
		user_id: null,
		filmType: null,
		snapshots: []
	});

	activeSession.subscribe((s) => {
		session = { ...s };
	})();

	function mapRecord(raw: any): DiagnosticRecord {
		return {
			id: raw.id,
			patient_id: raw.patient_id ?? session.patient_id ?? '',
			first_name: raw.user?.first_name ?? raw.first_name ?? session.first_name,
			surname: raw.user?.surname ?? raw.surname ?? session.surname,
			created_at: raw.created_at ?? new Date().toISOString(),
			status: raw.status,
			grade: raw.grade,
			film_type: raw.film_type ?? (session.filmType as 'Thick' | 'Thin'),
			snapshots: raw.file_dir ? [raw.file_dir] : (raw.snapshots ?? [])
		};
	}

	let showCancelModal = $state(false);
	let takingSnapshot = $state(false);

	function takeSnapshot() {
		takingSnapshot = true;
		activeSession.update((s) => ({ ...s, snapshots: [...s.snapshots, `${backendUrl}/snapshot`] }));
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

	async function triggerAnalysis() {
		isAnalyzing = true;

		try {
			const response = await api.post('/analyse', {
				file_dir: 'CAMERA',
				user_id: session.user_id ?? 1,
				film_type: session.filmType
			});

			const record = mapRecord(response.data);
			addRecord(record);
			setActiveRecord(record.id);
			goto('/new/result');
		} catch (err: any) {
			console.error('Analysis failed:', err);
			isAnalyzing = false;
		}
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
					<div
						class="relative rounded-2xl overflow-hidden bg-rose-50 aspect-[16/10] sm:aspect-[16/9]"
					>
						<!-- Live camera feed -->
						<img
							src="{backendUrl}/video_feed"
							alt="Live microscopy view"
							class="absolute inset-0 w-full h-full object-cover"
						/>

						<!-- Scanning overlay -->
						<div class="absolute inset-0 scanning pointer-events-none"></div>

						<!-- Corner brackets -->
						<div
							class="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-rose-600/80 rounded-tl-md"
						></div>
						<div
							class="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-rose-600/80 rounded-tr-md"
						></div>
						<div
							class="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-rose-600/80 rounded-bl-md"
						></div>
						<div
							class="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-rose-600/80 rounded-br-md"
						></div>

						<!-- Snapshot flash -->
						{#if takingSnapshot}
							<div class="absolute inset-0 bg-white/80 transition-opacity duration-200"></div>
						{/if}

						<!-- Live indicator -->
						<div
							class="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5"
						>
							<span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
							Live · 1000× magnification
						</div>

						<!-- Take Snapshot button -->
						<div class="absolute bottom-5 left-1/2 -translate-x-1/2">
							<button
								class="pill-btn btn-secondary shadow-lg"
								onclick={takeSnapshot}
								disabled={isAnalyzing}
							>
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
									/>
									<circle cx="12" cy="13" r="4" />
								</svg>
								Take Snapshot
							</button>
						</div>

						<!-- Captured snapshot strip -->
						{#if session.snapshots.length > 0}
							<div
								class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 max-h-[60%] overflow-y-auto pr-1"
							>
								{#each session.snapshots.slice(-4) as snap, i}
									<div
										class="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md fade-in"
									>
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
						<span class="font-mono"
							>{session.snapshots.length} snapshot{session.snapshots.length === 1 ? '' : 's'}</span
						>
					</div>
				</div>
			</div>

			<!-- SIDE PANEL -->
			<aside class="glass-card p-6 sm:p-7 flex flex-col">
				<div class="flex items-center gap-2 mb-5">
					<div class="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#7d0e46"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M10 2v14a4 4 0 0 0 8 0V2" /><path d="M8 2h12" />
						</svg>
					</div>
					<span class="font-display italic font-semibold text-rose-800">Sample analysis</span>
				</div>

				<div class="space-y-4 stagger">
					<div>
						<p class="field-label">Patient name</p>
						<p class="font-semibold text-ink">{session.first_name || '—'} {session.surname || ''}</p>
					</div>
					<div>
						<p class="field-label">Patient ID</p>
						<p class="font-mono text-sm text-ink break-all">{session.patient_id || '—'}</p>
					</div>
					<div>
						<p class="field-label">Film type</p>
						<p class="font-semibold text-ink">{session.filmType ?? '—'}</p>
					</div>
					<div>
						<p class="field-label">Date</p>
						<p class="font-semibold text-ink">{formatDateLong(new Date().toISOString())}</p>
					</div>
				</div>

				<div class="mt-auto pt-7 space-y-3">
					<button
						class="pill-btn bg-primary-gradient text-white w-full"
						disabled={isAnalyzing}
						onclick={triggerAnalysis}
					>
						{#if isAnalyzing}
							<svg class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
								<circle
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-opacity="0.25"
									stroke-width="3"
								/>
								<path
									d="M12 2a10 10 0 0 1 10 10"
									stroke="currentColor"
									stroke-width="3"
									stroke-linecap="round"
								/>
							</svg>
							Analyzing…
						{:else}
							Analyze sample
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="M3 12l4 4L19 4" /></svg
							>
						{/if}
					</button>
					<button
						class="pill-btn btn-danger w-full"
						disabled={isAnalyzing}
						onclick={() => (showCancelModal = true)}
					>
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
				<svg
					width="26"
					height="26"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#d61f1f"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M12 8v4M12 16h.01" />
				</svg>
			</div>
			<h3 class="font-display italic text-2xl text-rose-800 font-semibold mb-2">Cancel Analysis</h3>
			<p class="text-ink-soft text-sm mb-6">
				All snapshots and sample data will be lost. This action cannot be undone.
			</p>
			<div class="flex flex-col-reverse sm:flex-row gap-3 justify-center">
				<button class="pill-btn btn-secondary" onclick={() => (showCancelModal = false)}
					>No, keep analyzing</button
				>
				<button class="pill-btn btn-danger" onclick={confirmCancel}>Yes, cancel</button>
			</div>
		</div>
	</div>
{/if}
