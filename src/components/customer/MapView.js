import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import MapCards from './MapCards';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MapView = ({ length }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '80vh'
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY
  });

  const [map, setMap] = useState(null);
  console.log(map);

  const onLoad = useCallback(
    function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const allSpaces = useSelector((state) => state.space.all.spaces);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const successCallback = (position) => {
    setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <div>
      <Row className="flex-xl-row flex-column-reverse gap-4 gap-xl-0">
        <Col xl={6} xxl={5}>
          <MapCards length={length} />
        </Col>
        <Col xl={6} xxl={7}>
          <div className=" bg-white rounded-4 p-3">
            {center !== null && isLoaded ? (
              <GoogleMap
                onLoad={onLoad}
                onUnmount={onUnmount}
                center={center}
                zoom={4}
                onClick={() => setActiveMarker(null)}
                mapContainerStyle={containerStyle}
              >
                {allSpaces.length > 0 &&
                  allSpaces.map((space, index) => (
                    <MarkerF
                      key={index}
                      position={{
                        lat: space.location.coordinates[1],
                        lng: space.location.coordinates[0]
                      }}
                      onClick={() => handleActiveMarker(space._id)}
                    >
                      {activeMarker === space._id ? (
                        <InfoWindowF
                          onCloseClick={() => setActiveMarker(null)}
                          mapContainerStyle={{ width: '400px' }}
                        >
                          <>
                            <Image
                              src={`${process.env.REACT_APP_SERVER_URL}${space.images[0]}`}
                              style={{ width: '250px' }}
                            />
                            <div className="p-3">
                              <p>{`Title: ${space.description}`}</p>
                              <p>{`Contact: ${space.contact}`}</p>
                              <div className="text-center">
                                <Link to={`/dashboard/customer/single-space/${space._id}`}>
                                  <Button className="btn-sm">See Details</Button>
                                </Link>
                              </div>
                            </div>
                          </>
                        </InfoWindowF>
                      ) : null}
                    </MarkerF>
                  ))}
              </GoogleMap>
            ) : (
              <p>Loading</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MapView;
