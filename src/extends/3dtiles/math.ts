//GIS相关的数学运算
//https://gist.github.com/govert/1b373696c9a27ff4c72a

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
}

export function ecefToWs84(ecef: number[], out: number[]) {
    let [x, y, z] = ecef
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
    out[2] = (p / Math.cos(phi)) - v;

    out[0] = radiansToDegrees(lambda);
    out[1] = radiansToDegrees(phi);
}

// Converts the Earth-Centered Earth-Fixed (ECEF) coordinates (x, y, z) to 
// East-North-Up coordinates in a Local Tangent Plane that is centered at the 
// (WGS-84) Geodetic point (lat0, lon0, h0).
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

// Inverse of EcefToEnu. Converts East-North-Up coordinates (xEast, yNorth, zUp) in a
// Local Tangent Plane that is centered at the (WGS-84) Geodetic point (lat0, lon0, h0)
// to the Earth-Centered Earth-Fixed (ECEF) coordinates (x, y, z).
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
