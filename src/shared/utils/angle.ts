import type { Point } from '../types';

function distance(p1: Point, p2: Point) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function calculateAngleB(A: Point, B: Point, C: Point) {
  const a = distance(B, C);
  const b = distance(A, C);
  const c = distance(A, B);

  const angleB = Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c));
  return angleB;
}
