import React, {Component} from 'react';
import NavBar from './navBar';
import './App.css';
var L = require("leaflet");
var ColorsList = new Array('red', 'green', 'blue', 'orange', 'yellow', 'orange', "#4c69fa", "#fa4ce6","#52fa4c","#ef9906");


class History extends Component {
  constructor(){
    super();
    this.state = {};
  }
  componentDidMount(){
  var historymap = L.map('mapid').setView([40.7136, -73.9724],9);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 15,
            minZoom: 12,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiY3VzdW1tZXIiLCJhIjoiY2p5NXc5cXhwMDFxeTNmbzhwNWpsZTRibSJ9.204smoZZqhejVVBy7oiHfg'
        }).addTo(historymap);

        var circle = L.circle([40.7510961, -73.9749958], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: Math.floor((Math.random()*600)+200)
      }).addTo(historymap);
      circle.bindPopup('<a href="https://en.wikipedia.org/wiki/New_York_City_draft_riots"  class="customP">The Draft Riots of 1863</a>');

         circle = L.circle([40.7829, -73.9654], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: Math.floor((Math.random()*600)+200)
      }).addTo(historymap);
      circle.bindPopup('<a href="https://en.wikipedia.org/wiki/Peace_walk"  class="customP">Peace March, April 15, 1967</a>');

         circle = L.circle([40.7900, -73.9650], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: Math.floor((Math.random()*600)+200)
      }).addTo(historymap);
      circle.bindPopup('<a href="https://en.wikipedia.org/wiki/Anti-nuclear_protests_in_the_United_States" class="customP">Anti-Nuclear March, June 12, 1982</a>');

         circle = L.circle([40.7490646, -73.9679989], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: Math.floor((Math.random()*600)+200)
      }).addTo(historymap);
      circle.bindPopup('<a href="https://en.wikipedia.org/wiki/Protests_against_the_Iraq_War" class="customP">Anti-Iraq War Protest, 2003</a>');

        circle = L.circle([40.7359, -73.9911], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: Math.floor((Math.random()*600)+200)
      }).addTo(historymap);
      circle.bindPopup('<a href="https://en.wikipedia.org/wiki/Unemployed_Councils" class="customP">Mass rally of the Jobless, November 24, 1934</a>');

        circle = L.circle([40.7328, -74.0071], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: 300
      }).addTo(historymap);
      circle.bindPopup('<a href="https://en.wikipedia.org/wiki/NYC_Pride_March" class="customP">Gay Pride Rally, July 1975</a>');

        circle = L.circle([40.686203, -73.82422], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: Math.floor((Math.random()*600)+200)
      }).addTo(historymap);
      circle.bindPopup('<a href="https://www.citylab.com/transportation/2017/07/how-low-did-he-go/533019/" class="customP">Protest against the Southern Parkway, January 16, 1940</a>');

        circle = L.circle([40.7333, -74.0073], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: 200
      }).addTo(historymap);
      circle.bindPopup('<a href="https://en.wikipedia.org/wiki/Earth_Day#Earth_Day_1970" class="customP">First Earth Day, April 22, 1970</a>');

        circle = L.circle([40.7264, -73.9818], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: 200
      }).addTo(historymap);
      circle.bindPopup('<a href="https://www.lespi-nyc.org/history.html" class="customP">North Playground Renovation Protest, July 2, 1990</a>');

        circle = L.circle([40.7301, -73.9908], {
          color: '',
          fillColor: ColorsList[Math.floor(Math.random()*ColorsList.length)],
          fillOpacity: 0.5,
          radius: 200
      }).addTo(historymap);
      circle.bindPopup('<a href="https://en.wikipedia.org/wiki/Astor_Place_Riot" class="customP">Astor Place Riot, May 10, 1849</a>');

  }
  render(){
    return(
      <div class ="homePageBackground">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""/>
          <NavBar />
          <div id="mapid"></div>
      </div>
    );
  }
}

export default History;
