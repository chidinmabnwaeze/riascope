<script lang="ts">
	import { goto } from '$app/navigation';

	const patient = {
		name: 'Dara Simi',
		id: '12334445455juhdl44',
		film: 'Thin',
		date: 'May 13th, 2023'
	};
</script>

<section
	class="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f4effc] via-[#efe8ff] to-[#f5f1ff] text-slate-950"
>
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(183,121,214,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(225,168,255,0.14),_transparent_20%)]"
	/>
	<div class="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-20">
		<div class="grid w-full gap-8 xl:grid-cols-[1.5fr_0.85fr]">
			<div
				class="relative overflow-hidden rounded-[28px] border border-dashed border-[#c11c52] bg-white/90 shadow-[0_24px_80px_rgba(119,70,159,0.14)]"
			>
				<div class="aspect-[14/9] overflow-hidden rounded-[28px] bg-[#f3edff]">
					<div
						class="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.92),0%),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.85),0%),radial-gradient(circle_at_50%_60%,rgba(221,190,255,0.65),0%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(242,229,255,0.95))] bg-cover bg-center"
						style="background-image: url('https://www.figma.com/api/mcp/asset/bec394c6-4d26-4a65-95f6-39d7bfe141f0');"
					></div>
				</div>

				<button
					type="button"
					class="absolute left-1/2 bottom-6 -translate-x-1/2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition hover:bg-slate-100"
				>
					Take Snapshot
				</button>
			</div>

			<aside
				class="space-y-8 rounded-[28px] bg-white/95 px-8 py-8 shadow-[0_24px_80px_rgba(119,70,159,0.14)]"
			>
				<div
					class="inline-flex items-center gap-3 rounded-full border border-[#e7d7ff] bg-[#faf3ff] px-4 py-2 text-sm text-[#8e2f85]"
				>
					<span
						class="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7bef4] bg-[#f5ebff] text-xs font-bold uppercase tracking-[0.22em]"
					>
						RIA
					</span>
					<span class="font-semibold">Sample analysis</span>
				</div>

				<div class="space-y-4 text-sm text-slate-700">
					<div class="space-y-1">
						<p class="text-[10px] font-medium uppercase tracking-[0.2em] text-[#898989]">
							Patient Full name:
						</p>
						<p class="text-base font-medium text-slate-950">{patient.name}</p>
					</div>
					<div class="space-y-1">
						<p class="text-[10px] font-medium uppercase tracking-[0.2em] text-[#898989]">
							Patient ID
						</p>
						<p class="text-base font-medium text-slate-950">{patient.id}</p>
					</div>
					<div class="space-y-1">
						<p class="text-[10px] font-medium uppercase tracking-[0.2em] text-[#898989]">
							Film Type:
						</p>
						<p class="text-base font-medium text-slate-950">{patient.film}</p>
					</div>
					<div class="space-y-1">
						<p class="text-[10px] font-medium uppercase tracking-[0.2em] text-[#898989]">Date:</p>
						<p class="text-base font-medium text-slate-950">{patient.date}</p>
					</div>
				</div>

				<div class="space-y-4">
					<button
						type="button"
						class="w-full rounded-full bg-gradient-to-r from-[#c11c52] via-[#982f7f] to-[#4c2f8f] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(119,70,159,0.24)] transition hover:opacity-95"
					>
						Analyze sample
					</button>
					<button
						type="button"
						on:click={() => goto('/patient-details')}
						class="w-full rounded-full bg-[#cb0000] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a90000]"
					>
						Cancel
					</button>
				</div>
			</aside>
		</div>
	</div>
</section>
