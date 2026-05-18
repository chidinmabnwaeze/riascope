<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="canvas min-h-screen w-full overflow-hidden flex flex-col">
	<!-- Floating ambient blobs -->
	<div class="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-rose-300/30 blur-3xl"></div>
	<div class="pointer-events-none absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-indigo-300/25 blur-3xl"></div>
	<div class="pointer-events-none absolute -bottom-40 left-1/4 w-[440px] h-[440px] rounded-full bg-pink-200/40 blur-3xl"></div>

	<header class="relative z-10 w-full px-6 sm:px-10 pt-6 pb-2 flex items-center justify-between">
		<a href="/" class="group inline-flex items-center gap-2.5">
			<svg class="w-9 h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#b8266b" />
						<stop offset="100%" stop-color="#5d0a35" />
					</linearGradient>
				</defs>
				<circle cx="20" cy="20" r="18" fill="url(#logoGrad)" />
				<circle cx="20" cy="20" r="10" fill="none" stroke="white" stroke-width="2" opacity="0.75" />
				<circle cx="20" cy="20" r="4" fill="white" />
				<path d="M20 4 L20 8 M20 32 L20 36 M4 20 L8 20 M32 20 L36 20" stroke="white" stroke-width="2" opacity="0.6" />
			</svg>
			<span class="font-display italic font-semibold text-xl text-rose-700 tracking-tight">Riascope</span>
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
		<h1 class="screen-title sm:hidden mt-2 mb-1">{title}</h1>
	{/if}

	<main class="relative z-10 flex-1 w-full flex flex-col items-center px-4 sm:px-6 pb-10">
		{@render children()}
	</main>

	<footer class="relative z-10 text-center text-[11px] text-ink/40 pb-4 px-6 tracking-wide">
		<span class="font-display italic">Riascope</span> · Microscopy intelligence for malaria diagnostics
	</footer>
</div>
