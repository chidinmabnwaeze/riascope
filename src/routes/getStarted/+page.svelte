<script>
	import { goto } from '$app/navigation';
	import PageShell from '../../components/PageShell.svelte';
	import { resetSession } from '$lib/stores';

	function startAnalysis() {
		resetSession();
		goto('/new/patient');
	}

	function retrieveResults() {
		goto('/records');
	}
</script>

<PageShell>
	<div class="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center py-3 sm:py-8">
		<div class="text-center mb-5 sm:mb-10 fade-in">
			<h2 class="font-display italic text-primary-gradient text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
				Get Started
			</h2>
			<p class="text-ink-soft mt-3 max-w-md mx-auto text-sm">
				Microscopy intelligence for malaria diagnostics. <br/> Analyse a new sample or revisit a past one.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 w-full max-w-2xl stagger">
			<!-- Analyse Sample card -->
			<button
				type="button"
				onclick={startAnalysis}
				class="group bg-primary-gradient relative overflow-hidden rounded-[28px] p-5 sm:p-8 text-left text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
				style=" box-shadow: 0 18px 50px -16px rgba(124, 14, 70, 0.55);"
			>
				<div class="relative">
					<div class="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3 sm:mb-6 group-hover:rotate-6 transition-transform duration-300">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							<path d="M9 2v6l-5 9a3 3 0 0 0 2.6 4.5h10.8A3 3 0 0 0 20 17l-5-9V2" />
							<path d="M9 2h6" />
							<circle cx="11" cy="15" r="1" fill="white" />
							<circle cx="14" cy="18" r="0.8" fill="white" />
						</svg>
					</div>

					<h3 class="font-display text-xl sm:text-2xl font-semibold mb-1 sm:mb-2">Analyse Sample</h3>
					<p class="text-white/75 text-sm leading-relaxed">
						Analyse a new blood sample for malaria parasites.
					</p>

					<div class="mt-3 sm:mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-100 group-hover:gap-2.5 transition-all">
						Begin
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
							<path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
				</div>
			</button>

			<!-- Retrieve result card -->
			<button
				type="button"
				onclick={retrieveResults}
				class="group relative overflow-hidden rounded-[28px] p-5 sm:p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
				style="background: linear-gradient(135deg, #fbeef5 0%, #efddee 50%, #d9d6ee 100%); box-shadow: 0 12px 40px -16px rgba(125, 14, 70, 0.25);"
			>
				<div class="relative">
					<div class="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-3 sm:mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
						<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7d0e46" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="10" cy="10" r="6.5" />
							<path d="M15 15l    5 5" />
						</svg>
					</div>

					<h3 class="font-display text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 text-rose-800">Retrieve result</h3>
					<p class="text-ink-soft text-sm leading-relaxed">
						Search and retrieve a previously analysed result.
					</p>

					<div class="mt-3 sm:mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 group-hover:gap-2.5 transition-all">
						Open records
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
							<path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
				</div>
			</button>
		</div>
	</div>
</PageShell>
