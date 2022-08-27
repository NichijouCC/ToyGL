//GIS相关的数学运算
//https://stackoverflow.com/questions/56231010/need-explanation-of-ecef-to-enu-algorithm
//https://gist.github.com/govert/1b373696c9a27ff4c72a
//https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_ENU_to_ECEF

import { mat4, vec3 } from "../../mathD";

// WGS-84 geodetic constants
const a = 6378137.0;         // WGS-84 Earth semimajor axis (m)
const b = 6356752.314245;     // Derived Earth semiminor axis (m)
const f = (a - b) / a;           // Ellipsoid Flatness
const f_inv = 1.0 / f;       // Inverse flattening
//const double f_inv = 298.257223563; // WGS-84 Flattening Factor of the Earth 
//const double b = a - a / f_inv;
//const double f = 1.0 / f_inv;
const a_sq = a * a;
const b_sq = b * b;
const e_sq = f * (2 - f);    // Square of Eccentricity

export function degreesToRadians(value: number) {
    return value * Math.PI / 180;
}

export function radiansToDegrees(value: number) {
    return value * 180 / Math.PI;
}

/**
 * ws84坐标转换到ecef坐标
 * @param ecef ws84坐标系下的位置(lon0, lat0, h0)
 * @param out ecef坐标系下的位置(x,y,z)
 */
export function ws84ToEcef(gps: number[], out: number[]) {
    let [lon, lat, h] = gps;
    var phi = degreesToRadians(lon);
    var lambda = degreesToRadians(lat);
    var s = Math.sin(lambda);
    var N = a / Math.sqrt(1 - e_sq * s * s);

    var sin_lambda = Math.sin(lambda);
    var cos_lambda = Math.cos(lambda);
    var cos_phi = Math.cos(phi);
    var sin_phi = Math.sin(phi);

    out[0] = (h + N) * cos_lambda * cos_phi;
    out[1] = (h + N) * cos_lambda * sin_phi;
    out[2] = (h + (1 - e_sq) * N) * sin_lambda;
    return out;
}
/**
 * ecef坐标转换到ws84坐标
 * @param ecef ecef坐标系下的位置(x,y,z)
 * @param out ws84坐标系下的位置(lon0, lat0, h0)
 */
export function ecefToWs84(ecef: ArrayLike<number>, out: number[]) {
    let x = ecef[0];
    let y = ecef[1];
    let z = ecef[2];
    var eps = e_sq / (1.0 - e_sq);
    var p = Math.sqrt(x * x + y * y);
    var q = Math.atan2((z * a), (p * b));
    var sin_q = Math.sin(q);
    var cos_q = Math.cos(q);
    var sin_q_3 = sin_q * sin_q * sin_q;
    var cos_q_3 = cos_q * cos_q * cos_q;
    var phi = Math.atan2((z + eps * b * sin_q_3), (p - e_sq * a * cos_q_3));
    var lambda = Math.atan2(y, x);
    var v = a / Math.sqrt(1.0 - e_sq * Math.sin(phi) * Math.sin(phi));
    out[0] = radiansToDegrees(lambda);
    out[1] = radiansToDegrees(phi);
    out[2] = (p / Math.cos(phi)) - v;
    return out;
}

/**
 * 转换ecef坐标到enu坐标
 * @param pos ecef坐标系下的位置(x,y,z)
 * @param center enu原点的ws84坐标系下的位置(lon0, lat0, h0)
 * @param out enu坐标系下的位置(x,y,z)
 */
export function ecefToEnu(pos: number[], center: number[], out: number[]) {
    let [x, y, z] = pos;
    let [lon0, lat0, h0] = center;
    // Convert to radians in notation consistent with the paper:
    var lambda = degreesToRadians(lat0);
    var phi = degreesToRadians(lon0);
    var s = Math.sin(lambda);
    var N = a / Math.sqrt(1 - e_sq * s * s);

    var sin_lambda = Math.sin(lambda);
    var cos_lambda = Math.cos(lambda);
    var cos_phi = Math.cos(phi);
    var sin_phi = Math.sin(phi);

    let x0 = (h0 + N) * cos_lambda * cos_phi;
    let y0 = (h0 + N) * cos_lambda * sin_phi;
    let z0 = (h0 + (1 - e_sq) * N) * sin_lambda;

    let xd, yd, zd;
    xd = x - x0;
    yd = y - y0;
    zd = z - z0;

    // This is the matrix multiplication
    out[0] = -sin_phi * xd + cos_phi * yd;
    out[1] = -cos_phi * sin_lambda * xd - sin_lambda * sin_phi * yd + cos_lambda * zd;
    out[2] = cos_lambda * cos_phi * xd + cos_lambda * sin_phi * yd + sin_lambda * zd;
}

/**
 * 转换enu坐标到ecef坐标
 * @param pos enu坐标系下的位置(x,y,z)
 * @param center enu原点的ws84坐标系下的位置(lon0, lat0, h0)
 * @param out ecef坐标系下的位置(x,y,z)
 */
export function enuToEcef(pos: number[], center: number[], out: number[]) {
    // Convert to radians in notation consistent with the paper:
    let [xEast, yNorth, zUp] = pos;
    let [lon0, lat0, h0] = center;
    var lambda = degreesToRadians(lat0);
    var phi = degreesToRadians(lon0);
    var s = Math.sin(lambda);
    var N = a / Math.sqrt(1 - e_sq * s * s);

    var sin_lambda = Math.sin(lambda);
    var cos_lambda = Math.cos(lambda);
    var cos_phi = Math.cos(phi);
    var sin_phi = Math.sin(phi);

    var x0 = (h0 + N) * cos_lambda * cos_phi;
    var y0 = (h0 + N) * cos_lambda * sin_phi;
    var z0 = (h0 + (1 - e_sq) * N) * sin_lambda;

    var xd = -sin_phi * xEast - cos_phi * sin_lambda * yNorth + cos_lambda * cos_phi * zUp;
    var yd = cos_phi * xEast - sin_lambda * sin_phi * yNorth + cos_lambda * sin_phi * zUp;
    var zd = cos_lambda * yNorth + sin_lambda * zUp;

    out[0] = xd + x0;
    out[1] = yd + y0;
    out[2] = zd + z0;
}

/**
 * ws84坐标转enu坐标
 * @param gps WS84下的gps坐标
 * @param center enu原点在ws84坐标系下的位置(lon0, lat0, h0)
 * @param out enu坐标系下的位置(x,y,z)
 */
export function ws84ToEnu(gps: number[], center: number[], out: number[]) {
    ws84ToEcef(gps, out);
    ecefToEnu(out, center, out);
}


/**
 * ws84坐标转enu坐标
 * @param gps enu坐标系下的位置(x,y,z)
 * @param center enu原点在ws84坐标系下的位置(lon0, lat0, h0)
 * @param out WS84下的gps坐标
 */
export function enuToWs84(pos: number[], center: number[], out: number[]) {
    enuToEcef(pos, center, out);
    ecefToWs84(out, out);
}


/**
 * enu坐标系转ecef坐标系,https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_ENU_to_ECEF
 * @param center WS84坐标
 * @returns 转换矩阵
 */
export function transformEnuToEcef(center: ArrayLike<number>) {
    // let [lon0, lat0, h0] = center;
    let lon0 = center[0];
    let lat0 = center[1];
    let h0 = center[2];

    var lambda = degreesToRadians(lat0);
    var phi = degreesToRadians(lon0);
    var s = Math.sin(lambda);
    var N = a / Math.sqrt(1 - e_sq * s * s);

    var sin_lambda = Math.sin(lambda);
    var cos_lambda = Math.cos(lambda);
    var cos_phi = Math.cos(phi);
    var sin_phi = Math.sin(phi);
    //ecef下的Enu原点坐标
    var x0 = (h0 + N) * cos_lambda * cos_phi;
    var y0 = (h0 + N) * cos_lambda * sin_phi;
    var z0 = (h0 + (1 - e_sq) * N) * sin_lambda;

    let mat = mat4.create();
    mat[0] = -sin_phi;
    mat[1] = cos_phi;
    mat[4] = - cos_phi * sin_lambda;
    mat[5] = - sin_lambda * sin_phi;
    mat[6] = cos_lambda;
    mat[8] = cos_lambda * cos_phi;
    mat[9] = cos_lambda * sin_phi;
    mat[10] = sin_lambda;
    mat[12] = x0;
    mat[13] = y0;
    mat[14] = z0;
    return mat;
}

/**
 * ecef坐标系转enu坐标系,https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#From_ENU_to_ECEF
 * @param center WS84坐标
 * @returns 转换矩阵
 */
export function transformEcefToEnu(center: ArrayLike<number>) {
    // let [lon0, lat0, h0] = center;
    let lon0 = center[0];
    let lat0 = center[1];
    let h0 = center[2];

    var lambda = degreesToRadians(lat0);
    var phi = degreesToRadians(lon0);
    var s = Math.sin(lambda);
    var N = a / Math.sqrt(1 - e_sq * s * s);

    var sin_lambda = Math.sin(lambda);
    var cos_lambda = Math.cos(lambda);
    var cos_phi = Math.cos(phi);
    var sin_phi = Math.sin(phi);
    //ecef下的Enu原点坐标
    let x0 = (h0 + N) * cos_lambda * cos_phi;
    let y0 = (h0 + N) * cos_lambda * sin_phi;
    let z0 = (h0 + (1 - e_sq) * N) * sin_lambda;

    let mat = mat4.create();
    mat[0] = -sin_phi;
    mat[1] = - cos_phi * sin_lambda;
    mat[2] = cos_lambda * cos_phi;
    mat[4] = cos_phi;
    mat[5] = - sin_lambda * sin_phi;
    mat[6] = cos_lambda * sin_phi;
    mat[9] = cos_lambda;
    mat[10] = sin_lambda;
    mat[12] = -sin_phi * (-x0) + cos_phi * (- y0);
    mat[13] = -cos_phi * sin_lambda * (-x0) - sin_lambda * sin_phi * (-y0) + cos_lambda * (-z0);
    mat[14] = cos_lambda * cos_phi * (-x0) + cos_lambda * sin_phi * (-y0) + sin_lambda * (-z0);
    return mat;
}


/**
 * enu坐标系的北向量
 * @param center WS84坐标
 * @returns 转换矩阵
 */
export function surfaceEnuNorthFromGps(center: ArrayLike<number>) {
    // let [lon0, lat0, h0] = center;
    let lon0 = center[0];
    let lat0 = center[1];
    let h0 = center[2];

    var lambda = degreesToRadians(lat0);
    var phi = degreesToRadians(lon0);
    var s = Math.sin(lambda);
    var N = a / Math.sqrt(1 - e_sq * s * s);

    var sin_lambda = Math.sin(lambda);
    var cos_lambda = Math.cos(lambda);
    var cos_phi = Math.cos(phi);
    var sin_phi = Math.sin(phi);

    let value = vec3.create();
    value[0] = - cos_phi * sin_lambda;
    value[1] = - sin_lambda * sin_phi;
    value[2] = cos_lambda;
    return value;
}


/**
 * enu坐标系的NORMAL向量
 * @param center WS84坐标
 * @returns 转换矩阵
 */
export function surfaceEnuZUnitFromGps(center: ArrayLike<number>) {
    let lon0 = center[0];
    let lat0 = center[1];
    let h0 = center[2];

    var lambda = degreesToRadians(lat0);
    var phi = degreesToRadians(lon0);
    var s = Math.sin(lambda);
    var N = a / Math.sqrt(1 - e_sq * s * s);

    var sin_lambda = Math.sin(lambda);
    var cos_lambda = Math.cos(lambda);
    var cos_phi = Math.cos(phi);
    var sin_phi = Math.sin(phi);

    let value = vec3.create();
    value[0] = cos_lambda * cos_phi;
    value[1] = cos_lambda * sin_phi;
    value[2] = sin_lambda;
    return value;
}
