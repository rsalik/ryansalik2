<script lang="ts">
	import { ScrollMapper1D } from '$lib/ScrollMapper1D';
	import { initScene } from '$lib/three/scene';
	import { exogram, geoguessr } from '$lib/projects.json';

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

			featurePanel0 = scrollMapper.get(-1000, 1450, 4000, 1900, 200, 1541);
			featurePanel1 = scrollMapper.get(-1000, 1900, 4000, 2350, 200, 1991);

			projectsPanel = scrollMapper.get(-2000, 2350, 0, 2500);
			contactPanel = scrollMapper.get(-2000, 2350, 0, 2500);
		}, 10);
	});

	let aboutBanner = 0;
	let scroll = 0;

	let [skillsContentPanel, skillsTitlePanel] = [-2000, 2000];
	let [interestsContentPanel, interestsTitlePanel] = [2000, -2000];

	let featurePanel0 = -2000;
	let featurePanel1 = 4000;

	let [projectsPanel, contactPanel] = [-2000, -2000];
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
						<li class="no-mobile">HTML</li>
						<li class="no-mobile">CSS / SASS</li>
						<li>C#</li>
						<li class="no-mobile">Java</li>
						<li class="no-mobile">Python</li>
						<li class="no-mobile">C++</li>
						<li>etc.</li>
					</ul>
					<div class="bold text">Web Development</div>
					<ul>
						<li>Node.js</li>
						<li>React</li>
						<li class="no-mobile">Svelte</li>
						<li>etc.</li>
					</ul>
					<div class="bold text">Countless Software</div>
					<ul>
						<li>Unity</li>
						<li class="no-mobile">XCode</li>
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
						<li>Computer Graphics</li>
						<li>Algorithmic Design</li>
						<li>Machine Learning</li>
						<li>Front-end JavaScript Frameworks</li>
						<ul>
							<li>Solid</li>
							<li>Svelte</li>
						</ul>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div class="panel left" style:left="{featurePanel0}px" style:max-width="82%">
		<div class="title">Featured Project</div>
		<div class="mono large">{exogram.name}</div>
		<img src={exogram.image} alt="" />
		<div class="desc">
			{@html exogram.description}
		</div>
	</div>

	<div
		class="panel right mobile-bump"
		style:right="{featurePanel1}px"
		style:text-align="right"
		style:max-width="82%"
	>
		<div class="title">Featured Project</div>
		<div class="mono large">{geoguessr.name}</div>
		<img src={geoguessr.image} alt="" />
		<div class="desc">
			{@html geoguessr.description}
		</div>
	</div>

	<div class="panel left half" style:left="{projectsPanel}px">
		<div class="wrapper border">
			<div class="title">Projects</div>
			<a class="mono medium" href="/projects">View All →</a>
		</div>
	</div>
	<div class="panel right half" style:right="{contactPanel}px" style:left="auto">
		<div class="wrapper border">
			<div class="title">Contact</div>
			<a class="mono medium" href="mailto:rssalik14@gmail.com">rssalik14@gmail.com</a>
			<a class="mono medium" href="https://github.com/rsalik">GitHub/rsalik</a>
		</div>
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
		height: calc(100vh + 2800px);
	}

	.large {
		font-size: 1.9em;
	}

	.medium {
		font-size: 1.2em;
	}

	.bold {
		font-weight: 900;
	}

	.no-mobile {
		@media screen and (max-width: $mobile) {
			display: none;
		}
	}

	img {
		margin: 1rem 0;

		@extend %border-radius;
	}

	.border {
		border: 2px solid $color;

		@extend %border-radius;
	}

	.background {
		color: $bkg;
		background: $color;

		@extend %border-radius;
	}

	.wrapper {
		display: inherit;
		align-items: inherit;
		flex-direction: inherit;

		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 1rem;

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

		mix-blend-mode: exclusion;

		> div {
			position: absolute;
		}
	}

	.footer {
		position: fixed;
		right: 1.8rem;
		bottom: 1.2rem;

		color: $color;

		mix-blend-mode: exclusion;
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

		@media screen and (max-width: $mobile) {
			width: 100%;
			height: 50vh;
			.wrapper {
				justify-content: center;
			}

			&.mobile-bump {
				margin-top: -2em;
			}

			&.left {
				top: 0;

				padding-right: 1rem !important;
				padding-bottom: 0.5rem;
			}

			&.right {
				top: 0;

				padding-top: 0.5rem;
				padding-left: 1rem !important;

				transform: translateY(50vh);
			}
		}

		&.half {
			height: 50vh;
			@media screen and (min-width: $mobile) {
				top: auto;
				bottom: 0;
			}

			@media screen and (max-width: $mobile) {
				align-items: center;
			}
		}

		&.left {
			left: 0;

			padding-right: 0.5rem;
		}

		&.right {
			right: 0;

			padding-left: 0.5rem;
		}

		&.reverse {
			@media screen and (min-width: $mobile) {
				flex-direction: column-reverse;
			}
		}
	}

	ul {
		margin: 1rem 0;
	}
</style>
