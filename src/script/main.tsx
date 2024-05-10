import { getProblems } from "./api";

const allProblems = getProblems();
let userLatitude = 0;
let userLongitude = 0;
let currentProblemId = "";


export function initalize() {
    getLocation();
}


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: any) {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    console.log(`Latitude: ${userLatitude}, Longitude: ${userLongitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }