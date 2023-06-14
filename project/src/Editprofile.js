import React from 'react';
import firebase from "./Firestore";
import Firebase from 'firebase';
import firestore from "./Firestore";
import NavBar from "./navBar";
import { Form } from 'react-bootstrap';
import App from './App'
import { Redirect } from 'react-router-dom';
var L = require("leaflet");

class Editprofile extends React.Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      biography: "",
      globalwarming: false,
      genderequality: false,
      racialequality: false,
      policebrutality: false,
      lgbtq: false,
      other: false,
      data: [],
    };
  };


  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          signedIn: true,
          currentUser: user
        });
        const db = firebase.firestore();
        db.settings({
          timestampsInSnapshots: true
        });
        const userRef = db.collection("users");

      }
    });
  }

  componentDidMount() {
    var mymap = L.map('mapid1').setView([40.7136, -73.9724], 9);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 15,
      minZoom: 12,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiY3VzdW1tZXIiLCJhIjoiY2p5NXc5cXhwMDFxeTNmbzhwNWpsZTRibSJ9.204smoZZqhejVVBy7oiHfg'
    }).addTo(mymap);

  }
  updateInput = e => {
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addUser = e => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          signedIn: true,
          currentUser: user
        });
        const db = firestore.firestore();
        db.settings({
          timestampsInSnapshots: true
        });
        db.collection('users').doc(user.uid).update({
          fullname: this.state.fullname,
          biography: this.state.biography,
          globalwarming: this.state.globalwarming,
          genderequality: this.state.genderequality,
          racialequality: this.state.racialequality,
          policebrutality: this.state.policebrutality,
          lgbtq: this.state.lgbtq,
          other: this.state.other,
        }).then(
          this.setState({
            fullname: "",
            biography: "",
            globalwarming: false,
            genderequality: false,
            racialequality: false,
            policebrutality: false,
            lgbtq: false,
            other: false,
          })

        )

      }
    });
  }


  render() {
    return (
      <div>
        <NavBar />
        <div class="plzalign">
          <div class="form-style-5">
            <form class="plzalign" onSubmit={this.addUser}>
              <br />
              <input
                required
                type="text"
                name="fullname"
                placeholder="Full Name"
                onChange={this.updateInput}
                value={this.state.fullname}
                onChange={this.updateInput}
              />
              <br />
              <input
                required
                type="text"
                name="biography"
                placeholder="Give a brief description of yourself"
                onChange={this.updateInput}
                value={this.state.biography}
                onChange={this.updateInput}


              ></input>  <b> What kinds of protests would you like to see? </b>
              <Form.Check
                type="checkbox"
                label="Global Warming"
                value={this.state.globalwarming}
                onChange={() => { this.state.globalwarming = !this.state.globalwarming }}
                value={this.state.globalwarming}
              />
              <Form.Check
                type="checkbox"
                label="Gender Equality"
                value={this.state.genderequality}
                onChange={() => { this.state.genderequality = !this.state.genderequality }}
                value={this.state.genderequality}
              />
              <Form.Check
                type="checkbox"
                label="Racial Equality"
                value={this.state.racialequality}
                onChange={() => { this.state.racialequality = !this.state.racialequality }}
                value={this.state.racialequality}
              />
              <Form.Check
                type="checkbox"
                label="Police Brutality"
                value={this.state.policebrutality}
                onChange={() => { this.state.policebrutality = !this.state.policebrutality }}
                value={this.state.policebrutality}
              />
              <Form.Check
                type="checkbox"
                label="LGBTQ+"
                value={this.state.lgbtq}
                onChange={() => { this.state.lgbtq = !this.state.lgbtq }}
                value={this.lgbtq}
              />
              <Form.Check
                type="checkbox"
                label="Other"
                value={this.state.other}
                onChange={() => { this.state.other = !this.state.other }}
                value={this.state.other}
              />
              <div class="submitButton">
                <button type="submit" class="btn btn-lg btn-primary" >Submit</button>
              </div>
            </form>
            <footer class="footer">
              <p>© Activst 2019</p>
            </footer>
          </div>
        </div>
        <div id="mapid1" class='BACKGROUNDMAP2'></div>
      </div>
    )
  }
}

export default Editprofile;