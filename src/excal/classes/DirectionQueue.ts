export class DirectionQueue {
    heldDirections: string[];
    constructor() {
        this.heldDirections = [];
    }

    getDirection() {
        return this.heldDirections[0] ?? null;
    }

    add(dir: string) {
        const exists = this.heldDirections.includes(dir);
        if (exists) return;
        this.heldDirections.unshift(dir);
    }

    remove(dir: string) {
        this.heldDirections = this.heldDirections.filter((d) => d !== dir);
    }
}