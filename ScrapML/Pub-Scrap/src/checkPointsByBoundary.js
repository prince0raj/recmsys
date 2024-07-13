const turf = require('@turf/turf');
let count = 0;
const getBonderyData = async (coordinatesdata, data) => {
    const finalData = [];
    let polygon;
    if (coordinatesdata.length === 1) {
        polygon = turf.polygon(coordinatesdata);
    } else {
        polygon = turf.multiPolygon(coordinatesdata);
    }

    for (const value of data) {
        const values = {};
        for (const key in value) {
            const records = value[key];
            const validRecords = [];

            for (const record of records) {
                const pointCoords = [record.longitude, record.latitude];
                const point = turf.point(pointCoords);
                const isPointInsidePolygon = turf.booleanPointInPolygon(point, polygon);

                if (isPointInsidePolygon) {
                    validRecords.push(record);
                } else {
                    // console.log("The point is outside the polygon.", record.latitude + " - " + record.longitude);
                    count++;
                }
            }
            values[key] = validRecords;
        }
        finalData.push(values);
    }

    return finalData;
}

const checkCordinates = async (cordinateArray, businessData) => {
    try {
        const data = await getBonderyData(cordinateArray, businessData);
        console.log("get out of boundary --> ", count);
        return data;
    } catch (error) {
        console.error('Error in checkCoordinates:', error);
        return [];
    }
}
module.exports = { checkCordinates };

