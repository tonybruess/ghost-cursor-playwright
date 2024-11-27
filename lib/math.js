"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = exports.clampPositive = exports.fitts = exports.bezierCurve = exports.overshoot = exports.generateBezierAnchors = exports.randomVectorOnLine = exports.randomNumberRange = exports.setMagnitude = exports.unit = exports.magnitude = exports.perpendicular = exports.direction = exports.add = exports.mult = exports.div = exports.sub = void 0;
const bezier_js_1 = require("bezier-js");
const sub = (a, b) => ({
    x: a.x - b.x,
    y: a.y - b.y,
});
exports.sub = sub;
const div = (a, b) => ({
    x: a.x / b,
    y: a.y / b,
});
exports.div = div;
const mult = (a, b) => ({
    x: a.x * b,
    y: a.y * b,
});
exports.mult = mult;
const add = (a, b) => ({
    x: a.x + b.x,
    y: a.y + b.y,
});
exports.add = add;
const direction = (a, b) => (0, exports.sub)(b, a);
exports.direction = direction;
const perpendicular = (a) => ({ x: a.y, y: -1 * a.x });
exports.perpendicular = perpendicular;
const magnitude = (a) => Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
exports.magnitude = magnitude;
const unit = (a) => (0, exports.div)(a, (0, exports.magnitude)(a));
exports.unit = unit;
const setMagnitude = (a, amount) => (0, exports.mult)((0, exports.unit)(a), amount);
exports.setMagnitude = setMagnitude;
const randomNumberRange = (min, max) => Math.random() * (max - min) + min;
exports.randomNumberRange = randomNumberRange;
const randomVectorOnLine = (a, b) => {
    const vec = (0, exports.direction)(a, b);
    const multiplier = Math.random();
    return (0, exports.add)(a, (0, exports.mult)(vec, multiplier));
};
exports.randomVectorOnLine = randomVectorOnLine;
const randomNormalLine = (a, b, range) => {
    const randMid = (0, exports.randomVectorOnLine)(a, b);
    const normalV = (0, exports.setMagnitude)((0, exports.perpendicular)((0, exports.direction)(a, randMid)), range);
    return [randMid, normalV];
};
const generateBezierAnchors = (a, b, spread) => {
    const side = Math.round(Math.random()) === 1 ? 1 : -1;
    const calc = () => {
        const [randMid, normalV] = randomNormalLine(a, b, spread);
        const choice = (0, exports.mult)(normalV, side);
        return (0, exports.randomVectorOnLine)(randMid, (0, exports.add)(randMid, choice));
    };
    return [calc(), calc()].sort((a, b) => a.x - b.x);
};
exports.generateBezierAnchors = generateBezierAnchors;
const clamp = (target, min, max) => Math.min(max, Math.max(min, target));
const overshoot = (coordinate, radius) => {
    const a = Math.random() * 2 * Math.PI;
    const rad = radius * Math.sqrt(Math.random());
    const vector = { x: rad * Math.cos(a), y: rad * Math.sin(a) };
    return (0, exports.add)(coordinate, vector);
};
exports.overshoot = overshoot;
const bezierCurve = (start, finish, overrideSpread) => {
    const min = 2;
    const max = 200;
    const vec = (0, exports.direction)(start, finish);
    const length = (0, exports.magnitude)(vec);
    const spread = clamp(length, min, max);
    const anchors = (0, exports.generateBezierAnchors)(start, finish, overrideSpread !== null && overrideSpread !== void 0 ? overrideSpread : spread);
    return new bezier_js_1.Bezier(start, ...anchors, finish);
};
exports.bezierCurve = bezierCurve;
const fitts = (distance, width) => {
    const a = 0;
    const b = 2;
    const id = Math.log2(distance / width + 1);
    return a + b * id;
};
exports.fitts = fitts;
const clampPositive = (vectors) => {
    const clamp0 = (elem) => Math.max(0, elem);
    return vectors.map((vector) => {
        return {
            x: clamp0(vector.x),
            y: clamp0(vector.y),
        };
    });
};
exports.clampPositive = clampPositive;
function path(start, end, spreadOverride) {
    const width = 100;
    const minSteps = 5;
    const curve = (0, exports.bezierCurve)(start, end, spreadOverride);
    const length = curve.length() * 0.8;
    const baseTime = Math.random() * minSteps;
    const steps = Math.ceil((Math.log2((0, exports.fitts)(length, width) + 1) + baseTime) * 3);
    const re = curve.getLUT(steps);
    return (0, exports.clampPositive)(re);
}
exports.path = path;
//# sourceMappingURL=math.js.map