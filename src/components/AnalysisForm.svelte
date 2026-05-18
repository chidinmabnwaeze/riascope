<script lang="ts">
	import { goto } from '$app/navigation';

	let firstName = '';
	let surname = '';
	let patientId = '';
	let analysisDate = 'May 13th, 2023';
</script>

<section
	class="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f7f2ff] via-[#f2edff] to-[#ebe5ff] text-slate-950"
>
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(175,90,204,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(182,124,215,0.14),_transparent_20%)]"
	/>
	<div
		class="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d48bff]/20 blur-3xl"
	/>
	<div
		class="pointer-events-none absolute right-0 top-[20%] h-80 w-80 -translate-x-1/4 rounded-full bg-[#f7c7ff]/30 blur-3xl"
	/>
	<div
		class="pointer-events-none absolute bottom-10 left-0 h-64 w-64 rounded-full bg-[#d0d6ff]/30 blur-3xl"
	/>

	<div class="relative mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-24">
		<div
			class="w-full rounded-[28px] border border-white/75 bg-white/90 px-8 py-12 shadow-[0_24px_80px_rgba(119,70,159,0.12)] backdrop-blur-xl"
		>
			<h1 class="text-center text-3xl font-semibold tracking-[0.02em] text-[#6b2161] sm:text-4xl">
				<span
					class="bg-gradient-to-r from-[#c31c58] via-[#8b2f8d] to-[#512d89] bg-clip-text text-transparent"
				>
					Enter patient information
				</span>
			</h1>

			<form class="mt-10 space-y-8" on:submit|preventDefault={() => goto('/analysis')}>
				<div class="grid gap-6 sm:grid-cols-2">
					<div class="space-y-3">
						<label class="block text-sm font-medium text-[#4b4b4b]" for="firstName"
							>Patient Firstname</label
						>
						<input
							id="firstName"
							name="firstName"
							type="text"
							bind:value={firstName}
							placeholder="Enter first name"
							class="h-24 w-full rounded-[12px] border border-[#6750a4]/35 bg-[#e8e8e8] px-4 text-base text-slate-900 outline-none focus:border-[#8c63d8] focus:ring-2 focus:ring-[#cfa7ff]/60"
						/>
					</div>
					<div class="space-y-3">
						<label class="block text-sm font-medium text-[#4b4b4b]" for="surname"
							>Patient Surname</label
						>
						<input
							id="surname"
							name="surname"
							type="text"
							bind:value={surname}
							placeholder="Enter surname"
							class="h-24 w-full rounded-[12px] border border-[#6750a4]/35 bg-[#e8e8e8] px-4 text-base text-slate-900 outline-none focus:border-[#8c63d8] focus:ring-2 focus:ring-[#cfa7ff]/60"
						/>
					</div>
				</div>

				<div class="space-y-3">
					<label class="block text-sm font-medium text-[#4b4b4b]" for="patientId">Patient ID</label>
					<input
						id="patientId"
						name="patientId"
						type="text"
						bind:value={patientId}
						placeholder="Enter patient ID"
						class="h-24 w-full rounded-[12px] border border-[#b9b9b9] bg-[#e8e8e8] px-4 text-base text-slate-900 outline-none focus:border-[#8c63d8] focus:ring-2 focus:ring-[#cfa7ff]/60"
					/>
				</div>

				<div class="space-y-3">
					<label class="block text-sm font-medium text-[#4b4b4b]" for="analysisDate"
						>Analysis date:</label
					>
					<div
						class="flex h-24 w-full items-center gap-3 rounded-[12px] border border-[#b9b9b9] bg-[#e8e8e8] px-4 text-base text-slate-900 shadow-sm"
					>
						<svg
							class="h-6 w-6 text-[#898989]"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<rect x="3" y="4" width="18" height="18" rx="3" />
							<path d="M16 2v4M8 2v4M3 10h18" />
						</svg>
						<input
							id="analysisDate"
							name="analysisDate"
							type="text"
							bind:value={analysisDate}
							readonly
							class="w-full bg-transparent text-base text-slate-500 outline-none"
						/>
					</div>
				</div>

				<div class="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
					<button
						type="button"
						on:click={() => goto('/getStarted')}
						class="inline-flex items-center justify-center gap-3 rounded-full border border-[#898989] bg-white px-8 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
					>
						<span aria-hidden="true">←</span>
						Cancel session
					</button>
					<button
						type="submit"
						class="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#c31c58] via-[#982f78] to-[#572f8f] px-8 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(119,70,159,0.24)] transition hover:opacity-95"
					>
						Continue
						<svg
							class="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
