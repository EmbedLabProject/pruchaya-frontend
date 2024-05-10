import { getUserLat, getUserLong } from "./main";



export function withinRadiusCon(lat1: number, lon1: number){
    const k = (Math.PI/180);
    const lat2 = getUserLat();
    const lon2 = getUserLong();
    const dist = Math.acos(Math.sin(k*lat1)*Math.sin(k*lat2)+Math.cos(k*lat1)*Math.cos(k*lat2)*Math.cos(k*lon2-k*lon1))*6371;
    console.log("Lat 1: " + lat1 + " Lon 1: " + lon1 + " Lat 2: " + lat2 + " Lon2 2: " + lon2);
    console.log(dist);
    return (dist < 5);
}

export function fallenTreeCon(desc: string){
    const keyword = ["โค่น","ล้ม","หัก"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;
}

export function beeHiveCon(desc: string){
    const keyword = ["รัง"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;

}

export function witheredCon(desc: string){
    const keyword = ["เหี่ยว","เฉา"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;

}

export function obstructedCon(desc: string){
    const keyword = ["ขวาง"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;
}