import type { Scene } from '$lib/three/scene';
import * as THREE from 'three';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { CameraScrollMapper } from '../cameraScrollMapper';
import type { SceneDrawer } from '../scene';

export class MainSceneDrawer implements SceneDrawer {
	mesh?: THREE.Mesh;
	textMesh?: THREE.Mesh;
	camera?: THREE.Camera;

	scrollMapper?: CameraScrollMapper;

	h: { value: number; d: number; v: number }[] = [];

	cells = 150;
	clock = new THREE.Clock();

	public get scrollPos() {
		return this.scrollMapper?.pos ?? 0;
	}

	animate() {
		this.h.forEach((h) => {
			h.d += h.v * 0.002 * h.value;

			if (Math.abs(h.d) > 0.5 && Math.sign(h.v) === Math.sign(h.d)) {
				h.v = (Math.random() / 2) * Math.sign(h.v) * -1;
			}
		});

		if (this.camera) this.scrollMapper?.update(this.clock.getDelta(), this.camera);

		if (this.textMesh && this.scrollMapper) {
			if ((this.textMesh.material as THREE.Material[]).length) return;

			(this.textMesh.material as THREE.Material).transparent = true;
			(this.textMesh.material as THREE.Material).opacity = Math.min(
				1 - (this.scrollMapper.pos - 200) / 300,
				1
			);
		}

		this.calculateGeometry();
	}

	calculateGeometry() {
		const points = [];

		const x0 = this.cells / 3;
		const z0 = this.cells / 3;

		for (let z = 0; z < this.cells - z0; z++) {
			for (let x = 0; x < this.cells - x0; x++) {
				// 1--2
				// |  |
				// 3--4

				const h1 = this.h[z * this.cells + x].value + this.h[z * this.cells + x].d;
				const h2 = this.h[z * this.cells + x + 1].value + this.h[z * this.cells + x + 1].d;
				const h3 = this.h[(z + 1) * this.cells + x].value + this.h[(z + 1) * this.cells + x].d;
				const h4 =
					this.h[(z + 1) * this.cells + x + 1].value + this.h[(z + 1) * this.cells + x + 1].d;

				// Square from 4 points
				points.push(
					new THREE.Vector3(x - x0, h1, z - z0), // 1
					new THREE.Vector3(x + 1 - x0, h2, z - z0), // 2
					new THREE.Vector3(x - x0, h3, z + 1 - z0), // 3

					new THREE.Vector3(x - x0, h3, z + 1 - z0), // 3
					new THREE.Vector3(x + 1 - x0, h2, z - z0), // 2
					new THREE.Vector3(x + 1 - x0, h4, z + 1 - z0) // 4
				);
			}
		}

		this.mesh?.geometry.setFromPoints(points);
		this.mesh?.geometry.computeVertexNormals();
	}

	generateTextMesh(text: string, font: Font, pos: THREE.Vector3, color = 0x000000) {
		const geometry = new TextGeometry(text, {
			font,
			size: 1,
			height: 1,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.2,
			bevelSize: 0.05
		});

		const mesh = new THREE.Mesh(
			geometry,
			new THREE.MeshPhongMaterial({
				color,
				side: THREE.DoubleSide
			})
		);

		mesh.position.copy(pos);

		return mesh;
	}

	init({ camera, scene }: Scene<this>) {
		const max = Math.pow(this.cells + 1, 2);

		let mFactor = 50;

		// Generate random heights
		for (let i = 0; i < max; i++) {
			if (i % (this.cells + 1) === 0) mFactor /= 1.07;

			const value = mFactor / 20 + mFactor * Math.random() * 0.2;

			this.h.push({
				value,
				d: 0,
				v: Math.random() - 0.5
			});
		}

		// Plane Geometry
		this.mesh = new THREE.Mesh(
			new THREE.BufferGeometry(),
			new THREE.MeshNormalMaterial({
				side: THREE.DoubleSide
			})
		);

		this.calculateGeometry();

		// Text
		const loader = new FontLoader();

		loader.load('/3fonts/AllianceBlack.json', (font) => {
			this.textMesh = this.generateTextMesh('Ryan Salik', font, new THREE.Vector3(-3.5, 2.5, -10));
			scene.add(this.textMesh);
			this.resize()
		});

		// Camera Scroll Mappings
		this.scrollMapper = new CameraScrollMapper([
			{
				scrollStart: 0,
				pos: new THREE.Vector3(0, 3, 0),
				rot: new THREE.Euler(0, 0, 0)
			},
			{
				scrollStart: 500,
				pos: new THREE.Vector3(0, 3, 35),
				rot: new THREE.Euler(0, 0, 0)
			},
			{
				scrollStart: 1300,
				pos: new THREE.Vector3(0, 30, 10),
				rot: new THREE.Euler(-1, 0, 0)
			},
			{
				scrollStart: 1450,
				pos: new THREE.Vector3(0, 30, 30),
				rot: new THREE.Euler(-1, 0, 0)
			},
			{
				scrollStart: 1600,
				pos: new THREE.Vector3(0, 10, 10),
				rot: new THREE.Euler(-1, 1.5, 0)
			},
			{
				scrollStart: 1800,
				pos: new THREE.Vector3(-7, 10, 10),
				rot: new THREE.Euler(-1, 1.5, 0)
			},
			{
				scrollStart: 2100,
				pos: new THREE.Vector3(-7, -10, 10),
				rot: new THREE.Euler(1, -1.5, 0)
			},
			{
				scrollStart: 2200,
				pos: new THREE.Vector3(-3, -12, 10),
				rot: new THREE.Euler(1, -1.5, 1)
			},
			{
				scrollStart: 2500,
				pos: new THREE.Vector3(0, -2, 20),
				rot: new THREE.Euler(0, 0, 0)
			},
			{
				scrollStart: 2700,
				pos: new THREE.Vector3(0, 3, 35),
				rot: new THREE.Euler(0, 0, 0)
			},
			{
				scrollStart: 2800,
				pos: new THREE.Vector3(0, 3, 0),
				rot: new THREE.Euler(0, 0, 0)
			}
		]);

		// Light
		const light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(0, 2, 10);
		light.lookAt(0, 0, 0);

		// Scroll Behavior
		window.addEventListener('scroll', () => {
			this.scrollMapper?.onScroll(window.scrollY);
		});

		this.scrollMapper.pos = window.scrollY;
		this.camera = camera;

		return [this.mesh, light];
	}

	resize() {
		if (window.innerWidth > 768) {
			this.textMesh?.position.set(-3.65, 2.5, -10);
		} else {
			this.textMesh?.position.set(-3.65, 2.5, -25);
		}
	}
}
