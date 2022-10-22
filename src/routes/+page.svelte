<script lang="ts">
	import { ScrollMapper1D } from '$lib/ScrollMapper1D';
	import { initScene } from '$lib/three/scene';
	import { MainSceneDrawer } from '$lib/three/scenes/mainScene';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	const scrollMapper = new ScrollMapper1D();

	onMount(() => {
        const sceneDrawer = new MainSceneDrawer();
		initScene(canvas, sceneDrawer);

		setInterval(() => {
			scrollMapper.update(sceneDrawer.scrollPos);

			scroll = Math.floor(scrollMapper.pos);
            
			aboutBanner = scrollMapper.get(window.innerWidth + 100, 0, -2000, 300);

			skillsContentPanel = scrollMapper.get(-2000, 300, 2000, 900, 150, 600);
			skillsTitlePanel = scrollMapper.get(2000, 300, -2000, 900, 150, 600);

			interestsTitlePanel = scrollMapper.get(-2000, 900, 2000, 1500, 150, 1200);
			interestsContentPanel = scrollMapper.get(2000, 900, -2000, 1500, 150, 1200);

            projectsPanel = scrollMapper.get(-1000, 1450, 4000, 1900, 200, 1541);
		}, 10);
	});

	let aboutBanner = 0;
	let scroll = 0;

	let [skillsContentPanel, skillsTitlePanel] = [-2000, 2000];
	let [interestsContentPanel, interestsTitlePanel] = [2000, -2000];

	let projectsPanel = -2000;
</script>

<canvas bind:this={canvas} />

<div class="overlay">
	<div class="mono banner" style:left="{aboutBanner}px">
		👋 Hello there! My name is Ryan Salik, and I am a programmer.
	</div>

	<div class="panel left reverse" style:top="{skillsContentPanel}px">
		<div class="border wrapper">
			<div class="mono">
				<div class="mono">
					<div class="bold text">Front & Back Ends</div>
					<br />
					<div class="bold text">Over 15 programming languages</div>
					<ul>
						<li>JavaScript / TypeScript</li>
						<li>HTML</li>
						<li>CSS / SASS</li>
						<li>C#</li>
						<li>Java</li>
						<li>Python</li>
						<li>C++</li>
						<li>etc.</li>
					</ul>
					<div class="bold text">Web Development</div>
					<ul>
						<li>Node.js</li>
						<li>React</li>
						<li>Svelte</li>
						<li>etc.</li>
					</ul>
					<div class="bold text">Countless Software</div>
					<ul>
						<li>Unity</li>
						<li>XCode</li>
						<li>Android Studio</li>
						<li>etc.</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="panel right" style:top="{skillsTitlePanel}px">
		<div class="wrapper background centered">
			<div class="title">My Skills</div>
		</div>
	</div>

	<div class="panel left" style:top="{interestsTitlePanel}px">
		<div class="wrapper background centered">
			<div class="title">Current Interests</div>
		</div>
	</div>

	<div class="panel right reverse" style:top="{interestsContentPanel}px">
		<div class="border wrapper">
			<div class="mono">
				<div class="mono">
					<ul>
						<li>Game Development</li>
						<li>Machine Learning</li>
						<li>Front-end JavaScript Frameworks</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="panel left" style:left="{projectsPanel}px">
		<div class="title">Projects <span class="mono">(1/2)</span></div>
	</div>
</div>

<div class="footer">
	ryansalik.com / {scroll}
</div>

<div class="scroller" />

<style lang="scss">
	canvas {
		position: fixed;
	}

	.scroller {
		height: 3000px;
	}

	.title {
		font-size: 2.3em;
		font-weight: 900;
	}

	.bold {
		font-weight: 900;
	}

	.border {
		border: 2px solid white;
		border-radius: 20px;
	}

	.background {
		color: black;
		border-radius: 20px;
		background: white;

		mix-blend-mode: multiply;
	}

	.wrapper {
		display: inherit;
		align-items: inherit;
		flex-direction: inherit;

		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: inherit;

		&.centered {
			align-items: center;
			justify-content: center;
		}
	}

	.overlay {
		font-size: 2rem;

		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;

		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 1rem;

		mix-blend-mode: difference;

		> div {
			position: absolute;
		}
	}

	.footer {
		position: fixed;
		right: 1.8rem;
		bottom: 1.2rem;

		color: white;

		mix-blend-mode: difference;
	}

	.banner {
		width: 10000px;
	}

	.panel {
		top: 0;

		display: flex;
		flex-direction: column;

		box-sizing: border-box;
		width: 50vw;
		height: 100%;
		padding: 1rem;

		&.left {
			left: 0;

			padding-right: 0.5rem;
		}

		&.right {
			right: 0;

			padding-left: 0.5rem;
		}

		&.reverse {
			flex-direction: column-reverse;
		}
	}

	ul {
		margin: 1rem 0;
	}
</style>
