import type { Scene } from '$lib/three/scene';
import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { CameraScrollMapper } from '../cameraScrollMapper';
import type { SceneDrawer } from '../scene';

export class MainSceneDrawer implements SceneDrawer {
	h: { value: number; d: number; v: number }[] = [];
	mesh?: THREE.Mesh;

	scrollMapper?: CameraScrollMapper;

	cells = 100;

	animate() {
		this.h.forEach((h) => {
			h.d += h.v * 0.002 * h.value;

			if (Math.abs(h.d) > 0.5 && Math.sign(h.v) === Math.sign(h.d)) {
				h.v = (Math.random() / 2) * Math.sign(h.v) * -1;
			}
		});

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

	init({ camera }: Scene<this>) {
		const max = Math.pow(this.cells + 1, 2);

		let mFactor = 50;

		for (let i = 0; i < max; i++) {
			if (i % (this.cells + 1) === 0) mFactor /= 1.1;
			this.h.push({
				value: mFactor / 20 + mFactor * Math.random() * 0.2,
				d: 0,
				v: Math.random() - 0.5
			});
		}

		this.mesh = new THREE.Mesh(
			new BufferGeometry(),
			new THREE.MeshNormalMaterial({
				side: THREE.DoubleSide
			})
		);

		this.calculateGeometry();

		this.scrollMapper = new CameraScrollMapper([
			{
				scrollStart: 0,
				pos: new THREE.Vector3(0, 3, 10),
				rot: new THREE.Euler(0, 0, 0)
			},
			{
				scrollStart: 500,
				pos: new THREE.Vector3(0, 3, 40),
				rot: new THREE.Euler(0, 0, 0)
			},
			{
				scrollStart: 1300,
				pos: new THREE.Vector3(0, 30, 10),
				rot: new THREE.Euler(-1, 0, 0)
			},
			{
				scrollStart: 3300,
				pos: new THREE.Vector3(0, 30, 30),
				rot: new THREE.Euler(-1, 0, 0)
			},
			{
				scrollStart: 5000,
				pos: new THREE.Vector3(0, 10, 10),
				rot: new THREE.Euler(-1, 1.5, 0)
			},
			{
				scrollStart: 7000,
				pos: new THREE.Vector3(-5, 10, 10),
				rot: new THREE.Euler(-1, 1.5, 0)
			},
		]);

		window.addEventListener('scroll', () => {
			this.scrollMapper?.update(window.scrollY, camera);
			console.log(window.scrollY);
		});

		return [this.mesh];
	}
}
