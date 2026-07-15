<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);
	let shift = $state(false);
	let capsLock = $state(false);

	const numRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const qRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
	const aRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
	const zRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

	function getInput(): HTMLInputElement | null {
		const el = document.activeElement;
		return el instanceof HTMLInputElement ? el : null;
	}

	function pressKey(char: string) {
		const inp = getInput();
		if (!inp) return;
		const ch = shift || capsLock ? char.toUpperCase() : char.toLowerCase();
		const s = inp.selectionStart ?? inp.value.length;
		const e = inp.selectionEnd ?? inp.value.length;
		inp.value = inp.value.slice(0, s) + ch + inp.value.slice(e);
		inp.setSelectionRange(s + 1, s + 1);
		inp.dispatchEvent(new Event('input', { bubbles: true }));
		if (shift && !capsLock) shift = false;
	}

	function pressBackspace() {
		const inp = getInput();
		if (!inp) return;
		const s = inp.selectionStart ?? 0;
		const e = inp.selectionEnd ?? 0;
		if (s !== e) {
			inp.value = inp.value.slice(0, s) + inp.value.slice(e);
			inp.setSelectionRange(s, s);
		} else if (s > 0) {
			inp.value = inp.value.slice(0, s - 1) + inp.value.slice(s);
			inp.setSelectionRange(s - 1, s - 1);
		}
		inp.dispatchEvent(new Event('input', { bubbles: true }));
	}

	function toggleShift() {
		if (capsLock) {
			capsLock = false;
			shift = false;
		} else if (shift) {
			capsLock = true;
			shift = false;
		} else {
			shift = true;
		}
	}

	function closeKeyboard() {
		visible = false;
		document.body.classList.remove('kb-open');
		(document.activeElement as HTMLElement)?.blur();
	}

	function handleFocusIn(e: FocusEvent) {
		const t = e.target as HTMLElement;
		if (t instanceof HTMLInputElement && t.type !== 'checkbox' && t.type !== 'radio') {
			visible = true;
			document.body.classList.add('kb-open');
			setTimeout(() => t.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
		}
	}

	function handleFocusOut() {
		setTimeout(() => {
			if (!(document.activeElement instanceof HTMLInputElement)) {
				visible = false;
				document.body.classList.remove('kb-open');
			}
		}, 150);
	}

	onMount(() => {
		document.addEventListener('focusin', handleFocusIn);
		document.addEventListener('focusout', handleFocusOut);
		return () => {
			document.removeEventListener('focusin', handleFocusIn);
			document.removeEventListener('focusout', handleFocusOut);
		};
	});
</script>

{#if visible}
	<div
		class="fixed bottom-0 left-0 right-0 z-[9999] select-none"
		style="background: rgba(248,244,255,0.97); backdrop-filter: blur(12px); border-top: 2px solid rgba(195,42,99,0.18); box-shadow: 0 -6px 28px rgba(125,14,70,0.13); padding: 6px 4px 6px;"
	>
		<!-- Number row -->
		<div class="flex gap-1 mb-1">
			{#each numRow as k}
				<button
					type="button"
					class="num-key flex-1 h-10 rounded-lg text-[13px] font-semibold text-gray-800"
					onmousedown={(e) => { e.preventDefault(); pressKey(k); }}
				>{k}</button>
			{/each}
			<button
				type="button"
				class="num-key w-12 h-10 rounded-lg text-[13px] font-bold text-rose-700"
				style="background: #fce8ef; border-color: #f5b8cc;"
				onmousedown={(e) => { e.preventDefault(); pressBackspace(); }}
			>⌫</button>
		</div>

		<!-- Q row -->
		<div class="flex gap-1 mb-1 px-3">
			{#each qRow as k}
				<button
					type="button"
					class="letter-key flex-1 h-10 rounded-lg text-[13px] font-semibold text-gray-900"
					onmousedown={(e) => { e.preventDefault(); pressKey(k); }}
				>{shift || capsLock ? k.toUpperCase() : k}</button>
			{/each}
		</div>

		<!-- A row -->
		<div class="flex gap-1 mb-1 px-7">
			{#each aRow as k}
				<button
					type="button"
					class="letter-key flex-1 h-10 rounded-lg text-[13px] font-semibold text-gray-900"
					onmousedown={(e) => { e.preventDefault(); pressKey(k); }}
				>{shift || capsLock ? k.toUpperCase() : k}</button>
			{/each}
		</div>

		<!-- Z row with shift -->
		<div class="flex gap-1 mb-1">
			<button
				type="button"
				class="w-14 h-10 rounded-lg border text-[13px] font-bold transition-colors"
				style="{capsLock ? 'background:#c32a63;color:white;border-color:#c32a63' : shift ? 'background:#fce8ef;color:#9b1758;border-color:#f5b8cc' : 'background:#f0e8f4;color:#6b5566;border-color:#ddd0e8'}"
				onmousedown={(e) => { e.preventDefault(); toggleShift(); }}
			>⇧</button>
			{#each zRow as k}
				<button
					type="button"
					class="letter-key flex-1 h-10 rounded-lg text-[13px] font-semibold text-gray-900"
					onmousedown={(e) => { e.preventDefault(); pressKey(k); }}
				>{shift || capsLock ? k.toUpperCase() : k}</button>
			{/each}
			<button
				type="button"
				class="num-key w-14 h-10 rounded-lg text-[13px] font-semibold text-gray-700"
				onmousedown={(e) => { e.preventDefault(); pressKey('.'); }}
			>.</button>
		</div>

		<!-- Bottom row -->
		<div class="flex gap-1">
			<button
				type="button"
				class="num-key w-12 h-10 rounded-lg text-[12px] font-semibold text-gray-700"
				onmousedown={(e) => { e.preventDefault(); pressKey('@'); }}
			>@</button>
			<button
				type="button"
				class="num-key w-12 h-10 rounded-lg text-[12px] font-semibold text-gray-700"
				onmousedown={(e) => { e.preventDefault(); pressKey('-'); }}
			>-</button>
			<button
				type="button"
				class="letter-key flex-1 h-10 rounded-lg text-[12px] font-medium text-gray-500"
				onmousedown={(e) => { e.preventDefault(); pressKey(' '); }}
			>SPACE</button>
			<button
				type="button"
				class="w-20 h-10 rounded-lg text-[13px] font-bold text-white shadow-md"
				style="background: linear-gradient(135deg, #c32a63, #573c96);"
				onmousedown={(e) => { e.preventDefault(); closeKeyboard(); }}
			>Done ✓</button>
		</div>
	</div>
{/if}

<style>
	.num-key {
		background: #f0e8f4;
		border: 1px solid #ddd0e8;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background 0.1s;
	}
	.num-key:active {
		background: #fce8ef;
		border-color: #f5b8cc;
	}
	.letter-key {
		background: white;
		border: 1px solid #e8d8ee;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(125, 14, 70, 0.07);
		transition: background 0.1s;
	}
	.letter-key:active {
		background: #fce8ef;
		border-color: #f5b8cc;
	}
</style>
