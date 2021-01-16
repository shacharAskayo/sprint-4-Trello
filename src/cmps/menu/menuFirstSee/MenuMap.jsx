import { Component } from 'react'

//icons:
import RoomIcon from '@material-ui/icons/Room';


export class MenuMap extends Component {
    render() {
        return (
            <section className="map-section">
                <button className="map" >
                    <h4 className="map-title"><span><RoomIcon /></span>Map</h4>
                </button>
            </section>
        )
    }
}