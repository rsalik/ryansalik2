import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Scene<T extends SceneDrawer> {
	renderer: THREE.WebGLRenderer;
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;
	drawer: T;

	constructor(el: HTMLCanvasElement, drawer: T) {
		this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
		this.camera = new THREE.PerspectiveCamera(
			40,
			window.innerWidth / window.innerHeight,
			0.1,
			2000
		);

		this.scene = new THREE.Scene();
		this.drawer = drawer;

		this.scene.add(...this.drawer.init(this));
		this.renderer.setAnimationLoop(this.animate.bind(this));

		this.camera.position.set(0, 3, 10);
		this.camera.rotation.set(0, 0, 0);

		//this.camera.position.set(0, 3, -20)

		window.addEventListener('resize', () => resize(this));
		resize(this);
	}

	private animate() {
		this.drawer.animate(this);
		this.renderer.render(this.scene, this.camera);

		// console.log(this.camera.position, this.camera.rotation);
	}
}

export interface SceneDrawer {
	animate(scene: Scene<this>): void;
	init(scene: Scene<this>): THREE.Object3D[];
}

export function initScene(el: HTMLCanvasElement, drawer: SceneDrawer) {
	const scene = new Scene(el, drawer);

	return scene;
}

function resize<T extends SceneDrawer>({ renderer, camera }: Scene<T>) {
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}
