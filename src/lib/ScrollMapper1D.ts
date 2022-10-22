export class ScrollMapper1D {
	pos = 0;

	update(pos: number) {
		this.pos = pos;
	}

	get(
		from: number,
		fromScrollPos: number,
		to: number,
		toScrollPos: number,
		stillDur = 0,
		stillStart = 0
	) {
		if (this.pos <= fromScrollPos) return from;
		if (this.pos >= toScrollPos) return to;

		let pos = this.pos;

		if (this.pos > stillStart && this.pos < stillStart + stillDur) pos = stillStart;
		else if (this.pos > stillStart + stillDur) pos -= stillDur;

		return from + (to - from) * ((pos - fromScrollPos) / (toScrollPos - fromScrollPos));
	}
}
