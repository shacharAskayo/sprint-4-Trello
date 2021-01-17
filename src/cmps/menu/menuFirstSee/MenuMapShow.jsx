
import { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

//icons:
import RoomIcon from '@material-ui/icons/Room';


class _MenuMapShow extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        gGoogleMap: ''
    };

    render() {
        return (
            <section className="map-section">
                <Map
                    google={this.props.google}
                    initialCenter={{ lat: 32.0749831, lng: 34.9120554 }}
                    center={this.state.center}
                    zoom={14}>

                    <Marker
                        name={'Current location'} />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>

                </Map>
            </section>
        )
    }
}
export const MenuMapShow = GoogleApiWrapper({
    apiKey: ('AIzaSyBzfpQbTtSYT__Qh9PIPLUnA9xBMKj1iFY')
})(_MenuMapShow)