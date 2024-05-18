import { getProblems } from "./api";

let allProblems: any[] = [];
let userLatitude = 0;
let userLongitude = 0;
let currentProblemId = "";
let expertMode = false;
let solving = "";



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

export function getSolving(){
    return solving;
}

export function setSolving(ticket_id: string){
    solving = ticket_id;
}


function calculateDist(lat1: number, lon1: number, lat2: number, lon2: number){
    const k = (Math.PI/180);
    // console.log("Lat 1: " + lat1);
    // console.log("Lon 1: " + lon1);
    // console.log("Lat 2: " + lat2);
    // console.log("Lon 2: " + lon2);
    return Math.acos(Math.sin(k*lat1)*Math.sin(k*lat2)+Math.cos(k*lat1)*Math.cos(k*lat2)*Math.cos(k*lon2-k*lon1))*6371;
    
}

export function distFromUser(lat1: number, lon1: number){
    let lat2 = getUserLat();
    let lon2 = getUserLong();
    return calculateDist(lat1, lon1, lat2, lon2);
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