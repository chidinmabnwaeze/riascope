<script lang="ts">
	const buttonLabel = 'Begin session';
	import img from '../lib/assets/IMG-20260407-WA0004 2.png';
</script>

<section class="relative min-h-screen overflow-hidden global-bg text-slate-950">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,_rgba(119,70,159,0.24),_transparent_24%),radial-gradient(circle_at_85%_15%,_rgba(138,56,245,0.16),_transparent_20%),radial-gradient(circle_at_80%_80%,_rgba(210,162,255,0.18),_transparent_20%),linear-gradient(135deg,_#efe5ff_0%,_#e7edf9_45%,_#ede3ff_100%)]">
	</div>
	<div
		class="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#b85cf9]/15 blur-3xl">
	</div>
	<div
		class="pointer-events-none absolute right-[-100px] top-[25%] h-[360px] w-[360px] rounded-full bg-[#f4c1ff]/20 blur-3xl">
	</div>
	<div
		class="pointer-events-none absolute left-[-80px] bottom-24 h-[260px] w-[260px] rounded-full bg-[#d6d6ff]/20 blur-3xl"
	></div>

	<div
		class="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center"
	>
		<div class="space-y-10">
			<div
				class="mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-[0_20px_70px_rgba(119,70,159,0.14)] backdrop-blur-md"
			>
				<img src={img} alt="Riascope Logo" />
			</div>

			<h1
				class="text-4xl font-bold leading-tight tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl"
			>
				<span class="text-primary-gradient bg-clip-text text-transparent">
					Welcome to Riascope
				</span>
			</h1>

			<p class="mx-auto max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
				Leveraging advanced AI to deliver rapid and precise malaria diagnostics. Start a new session
				to begin sample analysis or review your saved clinical records.
			</p>

			<a
				href="/getStarted"
				class="inline-flex items-center justify-center gap-3 rounded-full bg-primary-gradient px-10 py-4 text-base font-medium text-white shadow-[0_20px_40px_rgba(119,70,159,0.28)] transition duration-200 hover:bg-[#8854d5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f4ecb]"
			>
				{buttonLabel}

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
			</a>
		</div>
	</div>
</section>
