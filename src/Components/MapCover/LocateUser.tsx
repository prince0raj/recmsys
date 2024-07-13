import React, { useState, useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import LoadingScreen from "../../CommonComponent/PreLoader/LoadingScreen";
import useDataContext from "../../Context/UseContext";

// @
const LocateUser = ({ setLayerLoading }: any) => {
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const { setcenterCordinates, centerCordinates } = useDataContext();

  // loading screen only on window load
  useEffect(() => {
    setTimeout(() => setLoading(false), 4500);
  }, []);

  const map = useMapEvents({
    locationfound(e) {
      if (centerCordinates.lat == 0 && centerCordinates.lon == 0) {
        setcenterCordinates({ lat: e.latlng.lat, lon: e.latlng.lng })
      }
      if (centerCordinates.lat == 0 && centerCordinates.lon == 0) {
        // @ts-ignore
        map.panTo(e.latlng, map.setView(e.latlng));
      }

      //save location to user session
      sessionStorage.setItem("userLocation", JSON.stringify(e.latlng));
      localStorage.setItem("userLocation", JSON.stringify(e.latlng));
      // @ts-ignore
      map.loading = false;
      setLoading(false);
      setLayerLoading(false);
    }
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  if (loading) {
    return <LoadingScreen />;
  } else if (!loading) {
    return null;
  }
};
export default LocateUser;