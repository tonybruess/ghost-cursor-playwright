import { Bezier } from 'bezier-js';
export declare type BoundingBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export interface Vector {
    x: number;
    y: number;
}
export declare const sub: (a: Vector, b: Vector) => Vector;
export declare const div: (a: Vector, b: number) => Vector;
export declare const mult: (a: Vector, b: number) => Vector;
export declare const add: (a: Vector, b: Vector) => Vector;
export declare const direction: (a: Vector, b: Vector) => Vector;
export declare const perpendicular: (a: Vector) => Vector;
export declare const magnitude: (a: Vector) => number;
export declare const unit: (a: Vector) => Vector;
export declare const setMagnitude: (a: Vector, amount: number) => Vector;
export declare const randomNumberRange: (min: number, max: number) => number;
export declare const randomVectorOnLine: (a: Vector, b: Vector) => Vector;
export declare const generateBezierAnchors: (a: Vector, b: Vector, spread: number) => [Vector, Vector];
export declare const overshoot: (coordinate: Vector, radius: number) => Vector;
export declare const bezierCurve: (start: Vector, finish: Vector, overrideSpread?: number) => Bezier;
export declare const fitts: (distance: number, width: number) => number;
export declare const clampPositive: (vectors: Vector[]) => Vector[];
export declare function path(point: Vector, target: Vector, spreadOverride?: number): any;
export declare function path(point: Vector, target: BoundingBox, spreadOverride?: number): any;
