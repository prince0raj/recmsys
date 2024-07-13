import axios, { AxiosResponse } from "axios";
import { BASEURL } from "./conf";
// interface Headers {
//     [key: string]: string;
// }
// const getHeaders = (type?: string): Headers => {
//     let headers: Headers = {};
//     if (type === "form") headers["Content-Type"] = "multipart/form-data";
//     else headers["Content-Type"] = "application/json";
//     const token: string | null = localStorage.getItem('jwttoken');
//     if (token) headers['Authorization'] = `Bearer ${token}`;
//     return headers;
// };

export const getSerchedCityBoundary = async (city: string, cb: (error: Error | null, data: any) => void): Promise<void> => {
    try {
        const response: AxiosResponse<any> = await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${city}&polygon_geojson=1&format=jsonv2`);
        cb(null, response);
    } catch (error: any) {
        cb(error, null);
    }
};
export const getOutletsByBoundary = async (dataCordinates: Object, cb: (error: Error | null, data: any) => void): Promise<void> => {
    try {
        const response: AxiosResponse<any> = await axios.post(`${BASEURL}/boundaryData`, dataCordinates);
        cb(null, response);
    } catch (error: any) {
        cb(error, null);
    }
};