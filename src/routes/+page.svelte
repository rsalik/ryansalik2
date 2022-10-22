<script lang="ts">
    import { initScene } from '$lib/three/scene';
    import { MainSceneDrawer } from '$lib/three/scenes/mainScene';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

    onMount(() => {
        initScene(canvas, new MainSceneDrawer());
    });
</script>

<canvas bind:this={canvas} />

<div class="scroller"></div>

<style lang="scss">
    canvas {
    	position: fixed;
    }


    .scroller {
    	height: 1000vh;
    }
</style>