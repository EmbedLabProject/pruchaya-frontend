import { getProblems } from "./api";

let allProblems: any[] = [];
let userLatitude = 0;
let userLongitude = 0;
let currentProblemId = "";
let expertMode = false;



export async function initalize() {
    currentProblemId = "";
    expertMode = false;
    getLocation();
}

export function isExpertMode(){
    return expertMode;
}

export async function getAllProblems(){
    allProblems = await getProblems();
    return allProblems;
}

export async function getProblemById(id: string){
    return (await getAllProblems()).find(p => (p.ticket_id == id));
}

export function setMode(isExpert: boolean){
    expertMode = isExpert;
}

export function getUserLat(){
    return userLatitude;
}

export function getUserLong(){
    return userLongitude;
}




function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
    //   console.log("Geolocation not supported");
    }
  }

  function success(position: any) {
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    // console.log(`Latitude: ${userLatitude}, Longitude: ${userLongitude}`);
  }

  function error() {
    // console.log("Unable to retrieve your location");
  }