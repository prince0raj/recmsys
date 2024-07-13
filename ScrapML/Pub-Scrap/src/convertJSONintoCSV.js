const fs = require('fs');
const { getTileNumbers } = require('./calculateTileID');
const { getZoomLevelFromUrl } = require('../utils');

function flattenUniqueJSON(json) {
    const flatSet = new Set();
    const flatArray = [];
    json.forEach(obj => {
        Object.keys(obj).forEach(key => {
            obj[key].forEach(item => {
                if (!flatSet.has(item.placeId)) {
                    flatSet.add(item.placeId);
                    const flatObj = { ...item };
                    // zoom level = 14 (by default)
                    flatObj.tileNumber = getTileNumbers(14, item.longitude, item.latitude);
                    flatArray.push(flatObj);
                }
            });
        });
    });
    return flatArray;
}

function convertToCSV(data) {
    if (!data || !data.length) {
        return '';
    }

    const headers = Object.keys(data[0]).join(',');
    let csv = `${headers}\n`;

    data.forEach(obj => {
        const values = Object.values(obj)
            .map(val => {
                if (typeof val === 'string') {
                    // Escape double quotes inside string values
                    val = val.replace(/"/g, '""');
                    // Wrap string with double quotes if it contains commas, newline characters, or double quotes
                    if (val.includes(',') || val.includes('\n') || val.includes('"')) {
                        return `"${val}"`;
                    }
                }
                return val;
            })
            .join(',');

        csv += `${values}\n`;
    });

    return csv;
}


const convert = (jsonData, city) => {
    // Flatten the JSON data while keeping records unique based on placeId
    const flatData = flattenUniqueJSON(jsonData);

    const csv = convertToCSV(flatData);
    const filename = `data/${city}_output.csv`;
    fs.writeFileSync(filename, csv, 'utf8');

    console.log(`CSV data saved to ${filename}`);
}
module.exports = { convert };



