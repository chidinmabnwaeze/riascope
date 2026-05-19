<script lang="ts">
import {goto} from "$app/navigation";
	const optionCards = [
		{
			title: 'Analyze Sample',
			description: 'Analyze a new blood sample for malaria parasites.',
			variant: 'primary'
		},
		{
			title: 'Retrieve result',
			description: 'Search and retrieve a previously analyzed result.',
			variant: 'secondary'
		}
	];

</script>

<section class="relative min-h-screen overflow-hidden bg-[#eef1ff] text-slate-950">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,_rgba(175,90,204,0.24),_transparent_20%),radial-gradient(circle_at_90%_10%,_rgba(226,169,255,0.16),_transparent_18%),radial-gradient(circle_at_80%_85%,_rgba(255,255,255,0.5),_transparent_18%),linear-gradient(180deg,_#f4effb_0%,_#ede8ff_42%,_#f6f0ff_100%)]" />
	<div class="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d48bff]/20 blur-3xl" />
	<div class="pointer-events-none absolute right-0 top-[25%] h-80 w-80 -translate-x-1/4 rounded-full bg-[#f7c7ff]/30 blur-3xl" />
	<div class="pointer-events-none absolute bottom-10 left-0 h-64 w-64 rounded-full bg-[#d0d6ff]/30 blur-3xl" />

	<div class="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20">
		<h1 class="text-3xl font-semibold tracking-[0.02em] text-[#963d7d] sm:text-4xl">Get Started</h1>

		<div class="mt-14 grid w-full gap-8 sm:grid-cols-[1.1fr_1fr]">
			{#each optionCards as card}
				<article class={
					'rounded-[32px] px-8 py-12 shadow-[0_20px_60px_rgba(119,70,159,0.18)] ring-1 ring-white/80 backdrop-blur-sm ' +
					(card.variant === 'primary'
						? 'bg-gradient-to-br from-[#b7164f] via-[#8c2d7a] to-[#4f2c84] text-white'
						: 'bg-white/95 text-slate-900 border border-slate-200')
				}>
					<div class={
						'mb-6 flex h-16 w-16 items-center justify-center rounded-3xl ' +
						(card.variant === 'primary' ? 'bg-white/15' : 'bg-[#f5f2ff]')
					} onclick = {() => goto (card.variant === "primary" ? "/new/analyze" : "/records")}>
							{#if card.variant === 'primary'}
								<svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M6 18h12" />
									<path d="M10 14.75V11a3 3 0 0 1 6 0v3.75" />
									<path d="M9 18a3 3 0 0 1 6 0" />
									<path d="M12 4v4" />
									<path d="M8 8h8" />
								</svg>
							{:else}
								<svg class="h-8 w-8 text-[#8d3d7f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<circle cx="11" cy="11" r="7" />
									<path d="M16.65 16.65L21 21" />
								</svg>
							{/if}
						{#if card.variant === 'primary'}
							<svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M6 18h12" />
								<path d="M10 14.75V11a3 3 0 0 1 6 0v3.75" />
								<path d="M9 18a3 3 0 0 1 6 0" />
								<path d="M12 4v4" />
								<path d="M8 8h8" />
							</svg>
						{:else}
							<svg class="h-8 w-8 text-[#8d3d7f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<circle cx="11" cy="11" r="7" />
								<path d="M16.65 16.65L21 21" />
							</svg>
						{/if}
					</div>
					<h2 class="text-xl font-semibold">{card.title}</h2>
					<p class={
						'mt-4 max-w-[18rem] text-sm leading-7 ' +
						(card.variant === 'primary' ? 'text-white/85' : 'text-slate-600')
					}>
						{card.description}
					</p>
				</article>
			{/each}
		</div>

		<div class="mt-14 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
			<button type="button" class="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/95 px-8 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50" onclick={() => goto("/")}>
				<span aria-hidden="true">←</span>
				Cancel session
			</button>
			<button type="button" class="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#c32a63] via-[#982f78] to-[#573c96] px-8 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(119,70,159,0.24)] transition hover:opacity-95" onclick={() => goto("/new/analyze")}>
				Start session
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>
</section>
