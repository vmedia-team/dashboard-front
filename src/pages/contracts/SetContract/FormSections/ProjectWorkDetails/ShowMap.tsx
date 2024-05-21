import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Polyline,
  Polygon,
} from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import {
  ButtonGroup,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import { normalizeLongitude } from "../../../../../methods/normalizeLongitude";
import { useState } from "react";

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const position: [number, number] = [lat, lng];
      onMapClick(position);
    },
  });

  return null;
};
export function ShowMap({
  positionClick,
  setPositionClick,
  lat,
  long,
}: PropsType) {
  // TODO::declare and define component state and variables
  let centerLat = lat,
    centerLong = long;
  const [satelliteMode, setSatelliteMode] = useState(false);

  if (!!positionClick.length) {
    positionClick.forEach(([lat, lng]) => {
      centerLat += lat;
      centerLong += lng;
    });
    centerLat /= positionClick.length;
    centerLong /= positionClick.length;
  }

  // TODO::declare and define component helpers methods
  function createPolylines() {
    const polylines = [];
    for (let i = 0; i < positionClick.length - 1; i++) {
      const startPoint = positionClick[i];
      const endPoint = positionClick[i + 1];
      const polyline = <Polyline key={i} positions={[startPoint, endPoint]} />;
      polylines.push(polyline);
    }
    return polylines;
  }
  const handleMapClick = (position: [number, number]) => {
    const positionHandler: [number, number] = [
      position[0],
      normalizeLongitude(position[1]),
    ];
    setPositionClick([...positionClick, positionHandler]);
  };
  const handleResetClick = () => {
    setPositionClick([]);
  };

  //*return component view
  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{
        width: "100%",
        height: "340px",
        margin: "auto",
      }}
    >
      <MapContainer
        center={[centerLat, centerLong]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ width: "94%", height: "100%", position: "relative" }}
      >
        {/* Map view */}
        <TileLayer
          className="tile"
          opacity={0.5}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {satelliteMode && (
          <>
            {/* Satellite View */}
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </>
        )}

        {/* Second TileLayer without background color */}
        <Polygon
          positions={positionClick}
          pathOptions={{ fillColor: "yellow", fillOpacity: 0.4 }}
        />

        <MapClickHandler onMapClick={(p) => handleMapClick(p)} />
        {createPolylines()}
      </MapContainer>
      <ButtonGroup
        variant="outlined"
        orientation="vertical"
        aria-label="map controll actions"
      >
        <Tooltip
          title={
            <Typography variant="body2" color={"worning"}>
              تنبية هذا الزر سوف يزيل تحديد الوقع الذي قمت به فانتبه
            </Typography>
          }
          placement="right"
        >
          <IconButton
            sx={{
              background: "lightgray",
              color: "#000",
              ":hover": {
                background: "lightgray",
              },
            }}
            onClick={handleResetClick}
          >
            <ReplayIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={satelliteMode ? "Map View" : "Satellite View"}
          placement="right"
        >
          <IconButton
            sx={{
              background: "lightgray",
              color: "#000",
              ":hover": {
                background: "lightgray",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSatelliteMode((prev) => !prev);
            }}
          >
            <SatelliteAltIcon color={satelliteMode ? "warning" : undefined} />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </Stack>
  );
}

interface MapClickHandlerProps {
  onMapClick: (position: [number, number]) => void;
}

type PropsType = {
  positionClick: [number, number][];
  setPositionClick: React.Dispatch<React.SetStateAction<[number, number][]>>;
  lat: number;
  long: number;
};
