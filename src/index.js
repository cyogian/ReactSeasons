import "./index.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";

// Hooks based App Component
const App = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [address, setAddress] = useState(null);
  const appCode = "7RPWqLqKW0C5u3XQSKrohw";
  const appId = "wkVafqaAkhcWml7qHCyo";

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        fetch(
          `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=${appId}&app_code=${appCode}&mode=retrieveAddresses&prox=${position.coords.latitude},${position.coords.longitude}`
        )
          .then(response => {
            return response.json();
          })
          .then(myJson => {
            let address = myJson.Response.View[0].Result[0].Location.Address;
            setAddress(`${address.City}, ${address.State}, ${address.Country}`);
          });
      },
      err => setErrorMessage(err.message)
    );
  }, []);

  const helperFunc = () => {
    if (errorMessage && !lat) {
      return (
        <div className="ui loc">
          <div className="ui negative message">
            <div className="header">{"Oops! " + errorMessage}</div>
          </div>
        </div>
      );
    }
    if (!errorMessage && !lat) {
      return <Loader message="Please accept the location request!" />;
    }

    return (
      <div>
        <div className="loc">
          <pre className="loc-details">
            <strong>Latitude:</strong> {lat}
            <br />
            <strong>Longitude:</strong> {long}
            <br />
            <strong>Address:</strong> {address}
          </pre>
        </div>
        <SeasonDisplay lat={lat} />
      </div>
    );
  };
  return helperFunc();
};

ReactDOM.render(<App />, document.querySelector("#root"));

// Class Based App Component

// class App extends React.Component {
//   state = {
//     lat: null,
//     long: null,
//     address: null,
//     appCode: "7RPWqLqKW0C5u3XQSKrohw",
//     appId: "wkVafqaAkhcWml7qHCyo",
//     errorMessage: null
//   };

//   componentDidMount() {
//     window.navigator.geolocation.getCurrentPosition(
//       position => {
//         this.setState({
//           lat: position.coords.latitude,
//           long: position.coords.longitude
//         });
//         fetch(
//           `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=${this.state.appId}&app_code=${this.state.appCode}&mode=retrieveAddresses&prox=${this.state.lat},${this.state.long}`
//         )
//           .then(response => {
//             return response.json();
//           })
//           .then(myJson => {
//             let address = myJson.Response.View[0].Result[0].Location.Address;
//             this.setState({
//               address: `${address.City}, ${address.State}, ${address.Country}`
//             });
//           });
//       },
//       err => this.setState({ errorMessage: err.message })
//     );
//   }

//   helperFunc() {
//     if (this.state.errorMessage && !this.state.lat) {
//       return (
//         <div className="ui loc">
//           <div className="ui negative message">
//             <div className="header">{"Oops! " + this.state.errorMessage}</div>
//           </div>
//         </div>
//       );
//     }
//     if (!this.state.errorMessage && !this.state.lat) {
//       return <Loader message="Please accept the location request!" />;
//     }

//     return (
//       <div>
//         <div className="loc">
//           <pre className="loc-details">
//             <strong>Latitude:</strong> {this.state.lat}
//             <br />
//             <strong>Longitude:</strong> {this.state.long}
//             <br />
//             <strong>Address:</strong> {this.state.address}
//           </pre>
//         </div>
//         <SeasonDisplay lat={this.state.lat} />
//       </div>
//     );
//   }

//   render() {
//     return this.helperFunc();
//   }
// }
