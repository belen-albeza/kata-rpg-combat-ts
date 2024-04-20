export default class Vec2d {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  distanceTo(other: Vec2d) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
}
