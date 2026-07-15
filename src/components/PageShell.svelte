<script lang="ts">
	import type { Snippet } from 'svelte';
	import logo from '$lib/assets/IMG-20260407-WA0004 2.png';

	interface Props {
		title?: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="canvas bg-img min-h-screen w-full overflow-x-hidden flex flex-col">
	<!-- Floating ambient blobs -->
	<!-- <div
		class="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-rose-300/30 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-300/25 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute -bottom-40 left-1/4 w-[440px] h-[440px] rounded-full bg-pink-200/40 blur-3xl"
	></div> -->

	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,_rgba(119,70,159,0.24),_transparent_24%),radial-gradient(circle_at_85%_15%,_rgba(138,56,245,0.16),_transparent_20%),radial-gradient(circle_at_80%_80%,_rgba(210,162,255,0.18),_transparent_20%),linear-gradient(135deg,_#efe5ff_0%,_#e7edf9_45%,_#ede3ff_100%)]"
	></div>
	<div
		class="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#b85cf9]/15 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute right-[-100px] top-[25%] h-[360px] w-[360px] rounded-full bg-[#f4c1ff]/20 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute left-[-80px] bottom-24 h-[260px] w-[260px] rounded-full bg-[#d6d6ff]/20 blur-3xl"
	></div>

	<header class="relative z-10 w-full px-4 sm:px-8 pt-3 pb-1 sm:pt-5 sm:pb-2 flex items-center justify-between">
		<a href="/" class="group inline-flex items-center gap-2">
			<img src={logo} alt="Riascope Logo" class="h-7 w-7 sm:h-9 sm:w-9" />
			<span class="font-display italic font-semibold text-lg sm:text-2xl text-rose-700 tracking-tight"
				>Riascope</span
			>
		</a>

		{#if title}
			<h1 class="screen-title hidden sm:block">{title}</h1>
		{/if}

		<div class="hidden sm:flex items-center gap-2 text-xs text-ink/60 font-medium">
			<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
			<span>System online</span>
		</div>
	</header>

	{#if title}
		<h1 class="text-primary-gradient sm:hidden mt-1 mb-0.5 text-base px-4">{title}</h1>
	{/if}

	<main class="relative z-10 flex-1 w-full flex flex-col items-center px-3 sm:px-6 pb-5 sm:pb-10">
		{@render children()}
	</main>

	<footer class="relative z-10 text-center text-[10px] text-ink/40 pb-2 px-6 tracking-wide">
		<span class="font-display italic">Riascope</span> · Microscopy intelligence for malaria diagnostics
	</footer>
</div>
