const addressArray = require('./src/AddressStorage/MumbaiPostOffice');
const appendJsonFilePath = './business_data.json';
const { run } = require('./src/crawlerGoogleMap');
const { getDataCordinate, extractJsonData } = require('./utils');
const { checkCordinates } = require('./src/checkPointsByBoundary');
const { convert } = require('./src/convertJSONintoCSV');


const filename = 'business_data.json';
const startPoint = 0;
const endPoint = 2;

let wantToCrawl = true;
let toFilterAndCreateCSV = true;




const getOutletsOfCity = async () => {
    let city = "mumbai";
    try {
        // scraping data from Google Map
        if (wantToCrawl) {
            await run(filename, appendJsonFilePath, startPoint, endPoint, addressArray, addressArray);
        }
        // Filter data based on place_id and create a csv file
        if (toFilterAndCreateCSV) {
            const jsonFilePath = "business_data.json";
            const businessData = extractJsonData(jsonFilePath);
            const coordinatesdataList = await getDataCordinate(city);
            const uniqueBusinessData = await checkCordinates(coordinatesdataList, businessData);
            convert(uniqueBusinessData, city);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

getOutletsOfCity();