const fs = require('fs');
const readline = require('readline');

const extractTileId = (googleMapsUrl) => {
    const tileIdPattern = /16s%2F([^!]+)/;
    const match = googleMapsUrl.match(tileIdPattern);
    if (match && match[1]) {
        const tileId = decodeURIComponent(match[1]);
        return tileId;
    } else {
        return null;
    }
}

/// india , lob based, UI-Represent

// It is Use to Read and Extract The data of JSON File
const extractJsonData = (path) => {
    const jsonFilePath = path;
    const jsonDataSync = fs.readFileSync(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(jsonDataSync);
    let data = Array.from(jsonData);
    return data;
}

// This Function is use to append the new object in a array of Object which is store in JSON file.
const appendinArrayOfObject = (filename, finalData) => {
    const fd = fs.openSync(filename, 'r+');

    const buffer = Buffer.alloc(1);
    fs.readSync(fd, buffer, 0, 1, fs.statSync(filename).size - 2);

    fs.ftruncateSync(fd, fs.statSync(filename).size - 1);

    if (buffer.toString() === '[') {
        fs.writeSync(fd, '', fs.statSync(filename).size);
    } else {
        fs.writeSync(fd, ',', fs.statSync(filename).size);
    }

    fs.appendFileSync(filename, JSON.stringify(finalData));

    fs.writeSync(fd, ']', fs.statSync(filename).size);
    fs.closeSync(fd);
}

// To check wether it is contact no. or not i.e (if start with Number i.e(1,0,9..) or start with '+'). Note: This is Generic based on Scraping of Google Map only.
const isContactNumber = (string) => {
    const regex = /^[+\d]/;
    return regex.test(string);
}

// Create coordinates if coordinates are not present
const createCoordinatesFromBoundaryValues = (boundingBox) => {
    // First two are latitude and last two are longitude
    return [[
        [Math.min(boundingBox[2], boundingBox[3]), Math.min(boundingBox[0], boundingBox[1])],
        [Math.max(boundingBox[2], boundingBox[3]), Math.min(boundingBox[0], boundingBox[1])],
        [Math.max(boundingBox[2], boundingBox[3]), Math.max(boundingBox[0], boundingBox[1])],
        [Math.min(boundingBox[2], boundingBox[3]), Math.max(boundingBox[0], boundingBox[1])],
        // closing the boundary
        [Math.min(boundingBox[2], boundingBox[3]), Math.min(boundingBox[0], boundingBox[1])],
    ]];
}

// It is use to get the array cordinates for the bondery of any city.
const getDataCordinate = async (city) => {

    try {
        const osmResponse = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${city}&polygon_geojson=1&format=jsonv2`);
        const osmData = await osmResponse.json();
        let idx = 0;
        if (osmData.length === 0) {
            throw new Error('Please enter the correct city name');
        }
        if (osmData.length > 1) {
            osmData.forEach((singleItem, index) => console.log(`${index} - ${singleItem.display_name}`));
            try {
                const readIdx = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                let enteredValue = await new Promise((resolve) => readIdx.question('What is your city idx? ', resolve));
                idx = parseInt(enteredValue);
                if (idx >= osmData.length) throw new Error('Idx out of bound');
                readIdx.close();
            } catch (error) {
                throw new Error('Something went wrong while taking the input');
            }
        }
        if (osmData[idx].geojson.type.toLocaleLowerCase().includes('polygon')) {
            const coordinates = osmData[idx].geojson.coordinates;
            return coordinates;
        }
        // Specific boundardies are not present
        return createCoordinatesFromBoundaryValues(osmData[idx].boundingbox);

    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong in fetching the details about the city');
    }

}

const getZoomLevelFromUrl = (url) => {
    const zoomLevelRegex = /z=([\d]+)/;
    const match = zoomLevelRegex.exec(url);

    if (match) {
        return parseInt(match[1], 10); // Extract and convert the zoom level to a number
    } else {
        return 16; // No zoom level found in the URL
    }
}


module.exports = { extractTileId, extractJsonData, appendinArrayOfObject, isContactNumber, getDataCordinate, getZoomLevelFromUrl }
