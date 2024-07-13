import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Nav/Navbar';
import Map from './Components/MapCover/Map';
import "leaflet/dist/leaflet.css";
import Status from './Components/CompareStatus/OutletRecords/Status';
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </>
  )
}

export default App
