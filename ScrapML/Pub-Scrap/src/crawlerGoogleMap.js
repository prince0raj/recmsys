const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
const fs = require('fs');
const { appendinArrayOfObject, isContactNumber } = require('../utils')


let uniqueData = new Set();
const errorZip = new Map();

async function searchGoogleMaps(localArea, localAreaList) {
    let browser;
    try {
        puppeteer.use(stealthPlugin());

        browser = await puppeteer.launch({
            headless: false,
        });

        const page = await browser.newPage();

        const query = `shops near ${localArea}`;

        await page.goto(`https://www.google.com/maps/search/${query.split(" ").join("+")}`);
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        async function autoScroll(page) {
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    var totalHeight = 0;
                    var distance = 1000;
                    var scrollDelay = 3000;

                    var timer = setInterval(async () => {
                        var wrapper = document.querySelector('div[role="feed"]');
                        var scrollHeightBefore = wrapper.scrollHeight;
                        wrapper.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeightBefore) {
                            totalHeight = 0;
                            await new Promise((resolve) => setTimeout(resolve, scrollDelay));

                            var scrollHeightAfter = wrapper.scrollHeight;

                            if (scrollHeightAfter > scrollHeightBefore) {
                                return;
                            } else {
                                clearInterval(timer);
                                resolve();
                            }
                        }
                    }, 200);
                });
            });
        }

        await autoScroll(page);

        const html = await page.content();

        const $ = cheerio.load(html);
        const businessData = [];

        $("a[href*='/maps/place/']").each((i, el) => {
            const url = $(el).attr("href");
            const parent = $(el).parent();
            const WrapperMain = parent.find("div.fontBodyMedium > div").eq(3);
            const storeName = parent.find("div.fontHeadlineSmall").text();
            // const website = parent.find('a[data-value="Website"]').attr("href");// wrong
            const ratingText = parent.find("span.fontBodyMedium > span").attr("aria-label");
            const address = `${WrapperMain.children('div').eq(0).text().split("·")[1]?.trim()}`;
            const { latitude, longitude } = extractLatLongFromUrl(url);
            let status = "Avaliable";
            let phone = '';
            let arr = WrapperMain.children('div').eq(1).text().split("·");
            if (arr[0] === "Temporarily closed" || arr[0] === "Permanently closed") {
                status = arr[0];
            }
            if (arr[1]) {
                phone = arr[1];
            } else {
                if (isContactNumber(arr[0])) {
                    phone = arr[0];
                }
            }

            const placeId = url.split("?")[0].split("ChI")[1];
            if (!uniqueData.has(placeId)) {
                uniqueData.add(placeId);

                businessData.push({
                    placeId: placeId ? placeId : "NA",
                    address: address ? address : "NA",
                    category: getCategory(WrapperMain) ? getCategory(WrapperMain) : "NA",
                    phone: phone ? phone : "NA",
                    latitude: latitude ? latitude : "NA",
                    longitude: longitude ? longitude : "NA",
                    status: status ? status : "NA",
                    type: getstoreType(parent) ? getstoreType(parent) : "NA",
                    googleUrl: url ? url : "NA",
                    // bizWebsite: website,
                    storeName: storeName ? storeName : "NA",
                    ratingText: ratingText ? ratingText : "NA",
                    stars: ratingText?.split("stars")[0]?.trim() ? Number(ratingText.split("stars")[0].trim()) : null,
                    numberOfReviews: ratingText?.split("stars")[1]?.replace("Reviews", "")?.trim()
                        ? Number(ratingText.split("stars")[1].replace("Reviews", "").trim())
                        : null,
                });
            }
        });

        await browser.close();

        return businessData;

    } catch (error) {
        if (errorZip.get(localArea) <= 1) {
            localAreaList.push(localArea);
            m.set(localArea, m.get(localArea) + 1);
        }
        console.error("Error in searchGoogleMaps:", localArea);
        if (browser) {
            browser.close();
        }
        return [];
    }
}

function getCategory(parent) {
    return parent.text().split('·')[0]?.trim();
}

function getstoreType(parent) {
    const openingHoursText = parent.find('div.fontBodyMedium').eq(1).text();
    return openingHoursText?.split('·')[0]?.trim();
}

function extractLatLongFromUrl(url) {
    const parts = url.split('!3d');
    if (parts.length >= 2) {
        const latLongPart = parts[1].split('!4d');
        if (latLongPart.length >= 2) {
            const latitude = parseFloat(latLongPart[0]);
            const longitude = parseFloat(latLongPart[1]);
            return { latitude, longitude };
        }
    }
    return null;
}

const run = async (filename, appendJsonFilePath, l, r, addressArray) => {
    const fileExists = fs.existsSync(appendJsonFilePath);
    console.log("Do File Exist? -> ", fileExists);
    const startingPoint = l;
    const endpoint = r;
    const range = `${startingPoint} - ${endpoint}`

    const localAreaList = addressArray.slice(startingPoint, endpoint);

    if (!fileExists) {
        const emptyData = [];
        fs.writeFile(filename, JSON.stringify(emptyData), (err) => {
            if (err) {
                console.error('Error creating file:', err);
                return;
            }
            console.log(`Empty JSON file ${filename} created successfully.`);
        });
    }

    try {
        const combinedResults = [];

        for (const localArea of localAreaList) {
            const results = await searchGoogleMaps(localArea, localAreaList);
            console.log("Shops near ", localArea, " : size --> ", results.length);
            combinedResults.push(...results);
        }
        const finalData = {
            [range]: combinedResults
        }
        appendinArrayOfObject(filename, finalData);
        console.log(`Data appended to ${filename} successfully.`);
    } catch (error) {
        console.error("Error:", error);
    }
    return;
}


module.exports = { run };