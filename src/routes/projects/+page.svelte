<script lang="ts">
	import projects from '$lib/projects.json';

	$: projArr = Object.values(projects);
</script>

<div class="wrapper">
	<div class="title">Projects</div>

	{#each projArr as project}
		<div class="project">
			<div class="content">
				<div class="project-title mono">
					{project.name}
				</div>
				<div class="description">
					{project.description}
				</div>
				<div class="links">
					<a href={project.repoLink} class="web">Code →</a>
					<a href={project.webLink} class="web">View →</a>
					{#if project.webLink.includes('herokuapp')}
						<div class="cold-start mono">May take a minute to load</div>
					{/if}
				</div>
			</div>
			<img src={project.image} alt="" />
		</div>
	{/each}
</div>

<style lang="scss">
	.wrapper {
		font-size: 2rem;

		box-sizing: border-box;
		padding: 1em;
	}

	.project {
		display: flex;
		justify-content: space-between;

		margin: 1rem 0;
		padding: 1em;

		border: 2px solid $color;

		@extend %border-radius;

		@media screen and (max-width: $mobile) {
			align-items: center;
			flex-direction: column-reverse;

			img {
				width: 100% !important;
				margin-bottom: 1em;
				margin-left: 0 !important;
			}

			.links .cold-start {
				font-size: 0.7em !important;
			}
		}

		.project-title {
			font-size: 1.5em;

			margin-bottom: 0.2em;
		}

		.links {
			display: flex;
			flex-direction: column;

			margin: 0.5em 0 0;

			.cold-start {
				font-size: 0.5em;

				margin-top: 0.3em;

				color: #f55;
			}
		}

		img {
			width: 30%;
			margin-left: 1em;

			@extend %border-radius;
			object-fit: cover;
		}
	}
</style>
