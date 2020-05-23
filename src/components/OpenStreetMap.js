import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../styles/OpenStreetMap.css'
import ReactLeafletSearch from "react-leaflet-search";
import LocateControl from './LocateControl'
import Control from 'react-leaflet-control';
import { FlagFill } from 'react-bootstrap-icons'

class OpenStreetMap extends Component {
    state = {
        center: [50.0619474, 19.9368564],
        zoom: 15,
    }

    handleSetPlaceLocalisation = () => {
        // console.log(this.props.localisation[0]);
        if (this.props.exploreData.localisation) {
            this.setState({
                center: [this.props.exploreData.localisation[0], this.props.exploreData.localisation[1]],
            })
        }
    }

    render() {
        const locateOptions = {
            position: 'topleft',
            strings: {
                title: 'Where am I?'
            },
            onActivate: () => { } // callback before engine starts retrieving locations
        }
        const position = this.state.center


        return (
            <Map center={position} zoom={this.state.zoom}
                scrollWheelZoom={false} viewport={this.state.center}>

                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {this.props.exploreData.place}<br />
                        {this.props.exploreData.address}
                    </Popup>
                </Marker>

                <LocateControl options={locateOptions} />

                <ReactLeafletSearch id="searchmap" position="topleft" className="custom-style" inputPlaceholder="Find Place" zoom={this.state.zoom} />

                <Control position="topleft">
                    <button className="centerView"
                        onClick={this.handleSetPlaceLocalisation}
                    >
                        <FlagFill />
                        {this.props.exploreData.place}
                    </button>
                </Control>
            </Map>
        )
    }
}

export default OpenStreetMap