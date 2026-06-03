<script>
import GetStarted from "../../components/GetStarted.svelte";
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

<!-- <GetStarted/> -->

<PageShell>
	<div class="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center py-8">
		<div class="text-center mb-10 fade-in">
			<!-- <p class="text-xs uppercase tracking-[0.3em] text-rose-700/70 font-semibold mb-3">Welcome</p> -->
			<h2 class="font-display italic text-primary-gradient text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
				Get Started
			</h2>
			<p class="text-ink-soft mt-4 max-w-md mx-auto text-sm sm:text-base">
				Microscopy intelligence for malaria diagnostics. <br/> Analyze a new sample or revisit a past one.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl stagger">
			<!-- Analyze Sample card -->
			<button
				type="button"
				onclick={startAnalysis}
				class="group bg-primary-gradient relative overflow-hidden rounded-[28px] p-8 text-left text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
				style=" box-shadow: 0 18px 50px -16px rgba(124, 14, 70, 0.55);"
			>
				<!-- Decorative micro-grid -->
				<!-- <div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 22px 22px;"></div> -->

				<div class="relative">
					<div class="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							<path d="M9 2v6l-5 9a3 3 0 0 0 2.6 4.5h10.8A3 3 0 0 0 20 17l-5-9V2" />
							<path d="M9 2h6" />
							<circle cx="11" cy="15" r="1" fill="white" />
							<circle cx="14" cy="18" r="0.8" fill="white" />
						</svg>
					</div>

					<h3 class="font-display text-2xl font-semibold mb-2">Analyze Sample</h3>
					<p class="text-white/75 text-sm leading-relaxed">
						Analyze a new blood sample for malaria parasites.
					</p>

					<div class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-100 group-hover:gap-2.5 transition-all">
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
				class="group relative overflow-hidden rounded-[28px] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
				style="background: linear-gradient(135deg, #fbeef5 0%, #efddee 50%, #d9d6ee 100%); box-shadow: 0 12px 40px -16px rgba(125, 14, 70, 0.25);"
			>
				<!-- <div class="absolute inset-0 opacity-30 pointer-events-none">
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern id="hexHome" x="0" y="0" width="50" height="58" patternUnits="userSpaceOnUse">
								<path d="M25 2 L45 14 L45 38 L25 50 L5 38 L5 14 Z" fill="none" stroke="#b8266b" stroke-width="0.5" opacity="0.5" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#hexHome)" />
					</svg>
				</div> -->

				<div class="relative">
					<div class="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
						<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7d0e46" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="10" cy="10" r="6.5" />
							<path d="M15 15l    5 5" />
						</svg>
					</div>

					<h3 class="font-display text-2xl font-semibold mb-2 text-rose-800">Retrieve result</h3>
					<p class="text-ink-soft text-sm leading-relaxed">
						Search and retrieve a previously analyzed result.
					</p>

					<div class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 group-hover:gap-2.5 transition-all">
						Open records
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
							<path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
				</div>
			</button>
		</div>

		<!-- Stats strip -->
		<!-- <div class="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink/50 fade-in" style="animation-delay: 0.6s;">
			<div class="flex items-center gap-2">
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#7d0e46" stroke-width="1.4"/><path d="M5.5 8.5l2 2 3-4" stroke="#7d0e46" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
				<span><span class="text-ink font-semibold">98.4%</span> detection accuracy</span>
			</div>
			<div class="w-px h-3 bg-ink/15"></div>
			<div class="flex items-center gap-2">
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="#7d0e46" stroke-width="1.4" stroke-linecap="round"/></svg>
				<span>Thick &amp; thin film</span>
			</div>
			<div class="w-px h-3 bg-ink/15"></div>
			<div class="flex items-center gap-2">
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 6l5-3 5 3v4l-5 3-5-3V6z" stroke="#7d0e46" stroke-width="1.4" stroke-linejoin="round"/></svg>
				<span>WHO-compliant grading</span>
			</div>
		</div> -->
	</div>
</PageShell>
