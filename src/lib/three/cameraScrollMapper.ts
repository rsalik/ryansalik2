import * as THREE from 'three';

export class CameraScrollMapper {
	instructions: CameraScrollInstruction[];
	pos = 0;
	target = 0;

	constructor(instructions: CameraScrollInstruction[]) {
		this.instructions = instructions.sort((a, b) => a.scrollStart - b.scrollStart);
	}

	onScroll(scroll: number) {
		this.target = scroll;
	}

	update(delta: number, camera: THREE.Camera) {
		this.pos += Math.min(
			(this.target - this.pos) * 5 * delta,
			this.instructions[this.instructions.length - 1].scrollStart
		);

		this.updateCamera(camera);
	}

	private updateCamera(camera: THREE.Camera) {
		const nextInstruction = this.instructions.find((i) => i.scrollStart > this.pos);

		if (!nextInstruction) return;

		const instruction = this.instructions[this.instructions.indexOf(nextInstruction) - 1];

		if (!instruction) return;

		const progress =
			(this.pos - instruction.scrollStart) /
			(nextInstruction.scrollStart - instruction.scrollStart);

		const { pos: pos0, rot: rot0 } = instruction;
		const { pos: pos1, rot: rot1 } = nextInstruction;

		if (pos0 && pos1) {
			const pos = pos0.clone().lerp(pos1, progress);
			camera.position.copy(pos);
		}

		if (rot0 && rot1) {
			const qrot0 = new THREE.Quaternion().setFromEuler(rot0);
			const qrot1 = new THREE.Quaternion().setFromEuler(rot1);
			const qrot = qrot0.clone().slerp(qrot1, progress);

			camera.rotation.setFromQuaternion(qrot);
		}
	}
}

export type CameraScrollInstruction = {
	scrollStart: number;
	pos?: THREE.Vector3;
	rot?: THREE.Euler;
};
