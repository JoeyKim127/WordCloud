import React, { Component } from 'react'
import keys from './Keys';


const APPID = keys.APPID;


class Location extends Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userAddress: null
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        // this.getUserAddress = this.getUserAddress.bind(this);
    }

getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
  } else {
    alert( "Geolocation is not supported by this browser.");
  }
} 

handleLocationError(UNKNOWN_ERROR) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
         alert( "User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
         alert( "Location information is unavailable.")
          break;
        case error.TIMEOUT:
         alert( "The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
         alert( "An unknown error occurred.")
          break;
        default:
        alert( "An unknown error occurred.")
      }
}

getCoordinates(position) {
    console.log("position: ", position)
    console.log("position.coords.latitude: ", position.coords.latitude)
    console.log("position.coords.latitude: ", position.coords.latitude)
    this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    });
}

_callApi =  () => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${APPID}&units=metric&lang=kr`)
     // call the response object
     // .then(movie => console.log(movie))
     // make the reponse object valid json type
     .then(current => current.json())
     
     .then(json => json.current.name)

     .catch(err => console.log(err))
    
 }
    render() { 
        console.log("currentjson()",current.json())
        console.log("json.current.name",json.current.name)

        return (
            <div className="geo">
                <h3>Location area</h3>
                <button onClick={this.getLocation}>get coords</button>
                <h4>html5</h4>
                <p>latitude: {this.state.latitude}</p>
                <p>longitude: {this.state.longitude}</p>
                <p>address: {this.state.userAddress}</p>
                {
                    this.state.latitude && this.state.longitude ?
                    url: `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${APPID}&units=metric&lang=kr`
                }
            </div>
        )
    };

};

export default Location;