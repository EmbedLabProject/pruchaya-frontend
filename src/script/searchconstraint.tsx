import { distFromUser } from "./main";


export function withinRadiusCon(lat1: number, lon1: number){
    return (distFromUser(lat1, lon1) < 5);
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