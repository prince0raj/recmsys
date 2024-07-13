// n = 2 ^ zoom
// xtile = n * ((lon_deg + 180) / 360)
// ytile = n * (1 - (log(tan(lat_rad) + sec(lat_rad)) / π)) / 2

function evaluateLatitudeExpression(latitude) {
    const latRad = latitude * Math.PI / 180;
    const tangent = Math.tan(latRad);
    const secant = 1 / Math.cos(latRad);
    const result = Math.log(tangent + secant);
    return result;
}

const getTileNumbers = (zoom = 14, lng, lat) => {

    let n = Math.pow(2, zoom);
    let xTile = Math.floor(n * ((lng + 180) / 360));
    let yTile = Math.floor(n * (1 - (evaluateLatitudeExpression(lat) / Math.PI)) / 2);
    let result = `z=${zoom},x=${xTile},y=${yTile}`;
    return result;

}

module.exports = { getTileNumbers };
