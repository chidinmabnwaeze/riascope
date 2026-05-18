<script lang="ts">
	import { goto } from '$app/navigation';

	interface Props {
		href?: string;
		label?: string;
		onClick?: () => void;
	}

	let { href, label = 'Back', onClick }: Props = $props();

	function handle() {
		if (onClick) onClick();
		else if (href) goto(href);
		else history.back();
	}
</script>

<button class="pill-btn btn-secondary !py-2 !px-4 !text-sm" onclick={handle} aria-label={label}>
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
	{label}
</button>
