import { getProblems, getSensorData } from "./api";

let allProblems: any[] = [];
let userLatitude = 0;
let userLongitude = 0;
let currentProblemId = "";
let expertMode = false;
let currentSensorId = "";
let currentSensorData: any[] = [];
let solving = "";
let messages: any[] = [];
let userSensorData: any[] = [];
let meanSensorData: { humidity: number; light: number; vibration: number; } | null = null;



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

export function getSensorId(){
    return currentSensorId;
}

export async function loadSensorData(device_id: string){
    const response = await getSensorData(device_id);
    if (response.data.length == 0){
        currentSensorData = [];
        currentSensorId = device_id;
        return currentSensorData;
    }
    if (device_id == currentSensorId){
        return currentSensorData;
    }
    
    currentSensorData = response.data;
    currentSensorId = device_id;
    return currentSensorData;
}

export function getUserSensorData(){
    return userSensorData;
}

export function setUserSensorData(newSensorData: any[]){
    userSensorData = newSensorData;
    let sumHumid = 0;
    let sumLight = 0;
    let sumVibra = 0;
    let selectedData = 0;
    userSensorData.forEach(i => {
        if (i.selected){
            selectedData++;
            sumHumid += i.humidity;
            sumLight += i.light;
            sumVibra += i.vibration;
        }
    })
    if (selectedData == 0){
        meanSensorData = null;
    }
    else {
        meanSensorData = {humidity: sumHumid/selectedData, light: sumLight/selectedData, vibration: sumVibra/selectedData};
    }
}

export function getMeanSensorData(){
    return meanSensorData;
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

export function appendCurrentMessages(m: any){
    messages = [...messages, m];
}

export function getCurrentMessages(){
    
    return messages;
}

export function clearCurrentMessages(){
    messages = [];
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


