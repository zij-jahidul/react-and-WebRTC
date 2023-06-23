import React from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";

import "./MapPage.css";

const MapPage = () => {
    const myLocation = useSelector((state) => state.map.myLocation);
    // const onlineUsers = useSelector((state) => state.map.onlineUsers);
    // const cardChosenOption = useSelector((state) => state.map.cardChosenOption);

    const defaultMapProps = {
        center: {
            lat: myLocation.lat,
            lng: myLocation.lng,
        },
        zoom: 11,
    };

    return (
        <div className="map_page_container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={defaultMapProps.center}
                defaultZoom={defaultMapProps.zoom}
            >

            </GoogleMapReact>
        </div>
    );
};

export default MapPage;
