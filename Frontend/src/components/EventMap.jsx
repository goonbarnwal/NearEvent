import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";


// Fix Leaflet default marker issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",

    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",

    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"

});



function EventMap({ events, userLocation }) {


    const defaultLocation = [

        18.5204,
        73.8567

    ]; // Pune fallback



    return (

        <MapContainer

            center={
                userLocation
                    ?
                    [
                        userLocation.latitude,
                        userLocation.longitude
                    ]
                    :
                    defaultLocation
            }

            zoom={13}

            style={{

                height:"450px",

                width:"100%",

                borderRadius:"12px"

            }}

        >


            <TileLayer

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                attribution='&copy; OpenStreetMap contributors'

            />



            {/* User Location */}

            {
                userLocation && (

                    <Marker

                        position={[

                            userLocation.latitude,

                            userLocation.longitude

                        ]}

                    >

                        <Popup>

                            📍 Your Location

                        </Popup>


                    </Marker>

                )
            }




            {/* Event Locations */}

            {

                events.map((event)=>{


                    if(

                        !event.location ||

                        !event.location.latitude ||

                        !event.location.longitude

                    ){

                        return null;

                    }



                    return (

                        <Marker

                            key={event._id}

                            position={[

                                event.location.latitude,

                                event.location.longitude

                            ]}

                        >

                            <Popup>

                                <h3>

                                    {event.title}

                                </h3>


                                <p>

                                    📍 {event.city}

                                </p>


                                <p>

                                    📅 {

                                    new Date(
                                        event.startDate
                                    )
                                    .toLocaleDateString()

                                    }

                                </p>


                            </Popup>


                        </Marker>

                    );


                })

            }


        </MapContainer>

    );

}


export default EventMap;