class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return this.x + this.y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }

  toString() {
    return this.color + " " + super.toString();
  }
}

let p1 = new Point(1, 2);
let p2 = new ColorPoint(1, 3, "blue");

console.log(p1.toString());
console.log(p2.toString());