<script lang="ts">
	import { goto } from '$app/navigation';
	import PageShell from '../../../components/PageShell.svelte';
	import { activeSession } from '$lib/stores';
	import { userService } from '$lib/services/user';
	import type { PatientInfo } from '$lib/types';

	let firstName = $state('');
	let surname = $state('');
	let patientId = $state('');
	let error = $state('');

	// Hydrate from store on mount
	activeSession.subscribe((s) => {
		if (s.first_name) firstName = s.first_name;
		if (s.surname) surname = s.surname;
		if (s.patient_id) patientId = s.patient_id;
	})();

	function cancel() {
		goto('/');
	}

	const createPatient = async () => {
		const patientData: PatientInfo = {
			first_name: firstName.trim(),
			surname: surname.trim(),
			patient_id: patientId.trim()
		};

		try {
			const response = await userService.createUser(patientData);
			const newUserId: number | null = response.data?.id ?? null;

			activeSession.update((s) => ({
				...s,
				first_name: firstName.trim(),
				surname: surname.trim(),
				patient_id: patientId.trim(),
				user_id: newUserId
			}));

			goto('/new/film-type');
		} catch (err: any) {
			error = err?.response?.data?.message || 'Failed to create patient.';
		}
	};

	async function proceed() {
		error = '';
		if (!firstName.trim() || !surname.trim() || !patientId.trim()) {
			error = 'Please complete all fields before continuing.';
			return;
		}
		await createPatient();
	}

	function formattedDate() {
		try {
			const d = new Date();
			return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
		} catch {
			return;
		}
	}
</script>

<PageShell title="Patient details">
	<div class="w-full max-w-2xl mx-auto mt-1 sm:mt-4 fade-in">
		<div class="glass-card p-4 sm:p-7">
			<div class="text-center mb-4 sm:mb-7">
				<p class="text-xs uppercase tracking-[0.25em] text-primary-gradient font-semibold mb-1">
					Step 1 of 3
				</p>
				<h2 class="font-display italic text-primary-gradient text-xl sm:text-2xl">
					Enter patient information
				</h2>
				<p class="text-ink-soft text-sm mt-1">
					This information will be attached to the diagnostic record.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger">
				<div>
					<label for="fn" class="field-label block">Patient Firstname</label>
					<input
						id="fn"
						type="text"
						class="field-input"
						bind:value={firstName}
						placeholder="e.g. Dara"
						autocomplete="given-name"
					/>
				</div>
				<div>
					<label for="sn" class="field-label block">Patient Surname</label>
					<input
						id="sn"
						type="text"
						class="field-input"
						bind:value={surname}
						placeholder="e.g. Simi"
						autocomplete="family-name"
					/>
				</div>
				<div class="sm:col-span-2">
					<label for="pid" class="field-label block">Patient ID</label>
					<input
						id="pid"
						type="text"
						class="field-input font-mono text-sm"
						bind:value={patientId}
						placeholder="e.g. 1233444545gjkn844"
					/>
				</div>
				<div class="sm:col-span-2">
					<label for="dt" class="field-label block">Analysis date</label>
					<div class="relative">
						<div id="dt" class="field-input py-6 pl-11"></div>
						<span
							class="absolute left-16 top-1/2 -translate-y-1/2 text-sm text-ink-soft pointer-events-none hidden sm:inline"
							>{formattedDate()}</span>

						<svg
							class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#7d0e46"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect x="3" y="4" width="18" height="18" rx="2" />
							<path d="M16 2v4M8 2v4M3 10h18" />
						</svg>
					</div>
				</div>
			</div>

			{#if error}
				<p class="mt-4 text-sm text-rose-600 flex items-center gap-2 fade-in" role="alert">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
						><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4" /><path
							d="M8 5v3.5M8 10.5v.5"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
						/></svg
					>
					{error}
				</p>
			{/if}

			<div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 mt-4 sm:mt-6">
				<button class="pill-btn btn-secondary w-full sm:w-auto" onclick={cancel}>
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none"
						><path
							d="M10 12L6 8L10 4"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
					Cancel session
				</button>
				<button class="pill-btn bg-primary-gradient text-white w-full sm:w-auto" onclick={proceed}>
					Continue
					<svg width="14" height="14" viewBox="0 0 16 16" fill="none"
						><path
							d="M3 8h10M8 3l5 5-5 5"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</button>
			</div>
		</div>

		<!-- Progress dots -->
		<div class="mt-3 flex items-center justify-center gap-2">
			<span class="h-1.5 w-8 rounded-full bg-rose-600"></span>
			<span class="h-1.5 w-3 rounded-full bg-rose-300"></span>
			<span class="h-1.5 w-3 rounded-full bg-rose-300"></span>
		</div>
	</div>
</PageShell>
