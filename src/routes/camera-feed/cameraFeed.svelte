<script>
	import { onMount } from 'svelte';

	let canvas;
	let ctx;

	let ws;

	let img = new Image();

	/*
    CHANGE THIS TO YOUR PI IP
  */
	const PI_IP = '192.168.1.15';

	/*
    SAVED SCREENSHOT PATH
  */
	let savedPath = '';

	onMount(() => {
		ctx = canvas.getContext('2d');

		ws = new WebSocket(`ws://${PI_IP}:3000`);

		ws.binaryType = 'blob';

		ws.onmessage = async (event) => {
			const blob = event.data;

			const url = URL.createObjectURL(blob);

			img.onload = () => {
				canvas.width = img.width;
				canvas.height = img.height;

				ctx.drawImage(img, 0, 0);

				URL.revokeObjectURL(url);
			};

			img.src = url;
		};

		return () => {
			ws.close();
		};
	});

	/*
    TAKE SCREENSHOT
  */
	function takeScreenshot() {
		const image = canvas.toDataURL('image/png');

		const link = document.createElement('a');

		const filename = `screenshot-${Date.now()}.png`;

		link.download = filename;

		link.href = image;

		link.click();

		/*
      FILE DIRECTORY
    */

		savedPath = `/Downloads/${filename}`;
	}
</script>

<div class="container">
	<h1>CSI Camera Feed</h1>

	<canvas bind:this={canvas}></canvas>

	<button on:click={takeScreenshot}> Take Screenshot </button>

	{#if savedPath}
		<p>Screenshot saved to:</p>

		<code>{savedPath}</code>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;

		min-height: 100vh;

		background: #111;
		color: white;

		padding: 20px;
	}

	canvas {
		width: 100%;
		max-width: 1000px;

		border-radius: 12px;
		border: 2px solid white;
	}

	button {
		padding: 12px 20px;

		border: none;
		border-radius: 8px;

		cursor: pointer;

		font-size: 16px;
	}

	code {
		background: #222;
		padding: 10px;
		border-radius: 8px;
	}
</style>
