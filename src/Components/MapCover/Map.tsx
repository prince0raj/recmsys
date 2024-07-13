
import { useState, useEffect, useRef } from "react";
import LocateUser from "./LocateUser";
import './map.css';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useDataContext from "../../Context/UseContext";
import { getOutletsByBoundary } from "../../services/Services";
import PopupDetails from "./PopupDetails";
import L from 'leaflet'
//@ts-ignore
import lobMarker from '../../assets/Icons/lobMarker.png'


interface Boundaries {
  _southWest: [number, number];
  _northEast: [number, number];
}

const Map = () => {


  // @ts-ignore
  const { centerCordinates, setcenterCordinates, setOutletsData, outletsData, newOutlets, dblobOutlets } = useDataContext();
  const mapRef = useRef();
  const [layerLoading, setLayerLoading] = useState(true);
  const [currentBoundaries, setCurrentBoundaries] = useState<Boundaries | null>(null);
  const [zoomLevel, setZoomLevel] = useState(16);




  const InnerComponent = ({ setBoundaries }: any) => {

    const callApi = () => {
      if (timer!)
        clearInterval(timer);
    }

    let timer: any;


    useMapEvents({
      load() {
        const map = mapRef.current;
        if (map != null) {
          // @ts-ignore
          const { _southWest, _northEast } = map.getBounds();
          console.log(_southWest, _northEast);
          setBoundaries({
            _southWest: [_southWest.lat, _southWest.lng],
            _northEast: [_northEast.lat, _northEast.lng]
          });
          //@ts-ignore
          const center = map.getCenter();
          setcenterCordinates({ lat: center.lat, lon: center.lng });
          // @ts-ignore
          setZoomLevel(map.getZoom());
        }
      },
      moveend() {
        if (timer) {
          clearInterval(timer);
        }
        const map = mapRef.current;
        if (map != null) {
          // @ts-ignore
          const { _southWest, _northEast } = map.getBounds();
          timer = setInterval(callApi, 2000);
          setBoundaries({
            _southWest: [_southWest.lat, _southWest.lng],
            _northEast: [_northEast.lat, _northEast.lng]
          });
          // @ts-ignore
          setZoomLevel(map.getZoom());
        }
      },
      movestart() {
        if (timer) {
          clearInterval(timer);
        }
      },
      dragend() {
        const map = mapRef.current;
        if (map != null) {
          // @ts-ignore
          const { _southWest, _northEast } = map.getBounds();
          setBoundaries({
            _southWest: [_southWest.lat, _southWest.lng],
            _northEast: [_northEast.lat, _northEast.lng]
          });
          //@ts-ignore
          const center = map.getCenter();
          setcenterCordinates({ lat: center.lat, lon: center.lng });
          // @ts-ignore
          setZoomLevel(map.getZoom());
        }
      },

    });
    return null;
  };


  useEffect(() => {
    if (mapRef && centerCordinates.lat && centerCordinates.lon) {
      // @ts-ignore
      mapRef.current?.panTo({ lat: centerCordinates.lat, lng: centerCordinates.lon });
    }
  }, [centerCordinates, mapRef])

  useEffect(() => {
    if (currentBoundaries && currentBoundaries._northEast && currentBoundaries._southWest && zoomLevel >= 13) {

      const dataCordinates = {
        "min_lat": currentBoundaries._southWest[0],
        "max_lat": currentBoundaries._northEast[0],
        "min_lon": currentBoundaries._southWest[1],
        "max_lon": currentBoundaries._northEast[1]
      }
      getOutletsByBoundary(dataCordinates, (err: any, res) => {
        if (err) {
          console.log(err);
        } else {
          setOutletsData(res.data)
        }
        return;
      })
    }
  }, [currentBoundaries])
  useEffect(() => {
    if (centerCordinates.lat != 0 && centerCordinates.lon != 0) {
      setLayerLoading(false);
    }
  }, [])

  const customIcon = new L.Icon({
    iconUrl: lobMarker,
    iconSize: [35, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div>
      <MapContainer
        // @ts-ignore
        center={[parseFloat(centerCordinates.lat), parseFloat(centerCordinates.lon)]}
        zoom={16}
        scrollWheelZoom={false}
        // @ts-ignore
        ref={mapRef}
      >

        {layerLoading && <LocateUser setLayerLoading={setLayerLoading} />}
        <InnerComponent setBoundaries={setCurrentBoundaries} />
        {!layerLoading && <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />}
        {newOutlets && newOutlets.map((data: any, ind: number) => (
          <Marker
            key={ind}
            position={[parseFloat(data.latitude), parseFloat(data.longitude)]}
          >
            <Popup autoPan={false}>
              <PopupDetails outlet={data} />
            </Popup>
          </Marker>
        ))}
        {dblobOutlets && dblobOutlets.map((data: any, ind: number) => (
          <Marker
            key={ind}
            position={[parseFloat(data.latitude), parseFloat(data.longitude)]}
            icon={customIcon}
          >
            <Popup autoPan={false}>
              <PopupDetails outlet={data} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

    </div>
  );
};

export default Map;
