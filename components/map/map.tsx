"use client";

import { cn } from "@/lib/utils";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
export type MapProps = {
  className?: string;
  onLocationSelect: (location: any) => void;
};

type SearchProps = {
  provider: OpenStreetMapProvider;
  onResultSelect: (result: any) => void;
};

const Search = ({ provider, onResultSelect }: SearchProps) => {
  const map = useMap();

  useEffect(() => {
    //@ts-ignore
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      retainZoomLevel: true,
      animateZoom: true,
      autoClose: true,
      searchLabel: "Enter address",
      keepResult: true,
      updateMap: true,
      autoComplete: true,
      autoCompleteDelay: 250,
      searchBounds: [
        [26.347, 80.058],
        [30.447, 88.199],
      ],
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result: any) => {
      if (result && result.location) {
        const { x, y, label } = result.location;
        onResultSelect({ latitude: y, longitude: x, address: label });
      }
    });

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map, provider, onResultSelect]);

  return null;
};

export const MapComponent = ({
  className = undefined,
  onLocationSelect,
}: MapProps) => {
  const provider = new OpenStreetMapProvider({
    params: {
      countrycodes: "NP", // Country code for Nepal
      viewbox: "80.058,30.447,88.199,26.347", // Bounding box for Nepal
      bounded: 1, // Restrict results to the bounding box
    },
  });

  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const handleResultSelect = (result: any) => {
    setSelectedLocation(result);
    onLocationSelect(result);
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );
    const data = await response.json();
    return data.display_name;
  };

  const handleDragEnd = async (event: any) => {
    const marker = event.target;
    const position = marker.getLatLng();
    const address = await reverseGeocode(position.lat, position.lng);
    const updatedLocation = {
      latitude: position.lat,
      longitude: position.lng,
      address,
    };

    setSelectedLocation(updatedLocation);
    onLocationSelect(updatedLocation);
  };

  let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
  });
  return (
    <MapContainer
      center={[27.69846675, 85.34062212453648]}
      zoom={19}
      className={cn("h-[300px]", className)}
    >
      <Search provider={provider} onResultSelect={handleResultSelect} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedLocation && (
        <Marker
          position={[selectedLocation.latitude, selectedLocation.longitude]}
          draggable={true}
          icon={DefaultIcon}
          eventHandlers={{
            dragend: handleDragEnd,
          }}
        >
          <Popup>
            {selectedLocation.address} <br />
            Latitude: {selectedLocation.latitude} <br />
            Longitude: {selectedLocation.longitude}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
