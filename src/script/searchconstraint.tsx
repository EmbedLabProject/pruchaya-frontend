import { distFromUser } from "./main";


export function withinRadiusCon(lat1: number, lon1: number){
    return (distFromUser(lat1, lon1) < 5);
}

export function fallenTreeCon(desc: string){
    const keyword = ["โค่น","ล้ม","หัก","หล่น"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;
}

export function wiringCon(desc: string){ // changed to wire
    const keyword = ["สายไฟ","ไฟฟ้า"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;

}

export function witheredCon(desc: string){
    const keyword = ["เฉา","รด","เหี่ยว","แห้ง","ตาย","เหลือง","ซีด"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;

}

export function obstructedCon(desc: string){
    const keyword = ["ยื่น","เลื้อย","ล้ำ","เกิน","เข้ามา","กีด","ขวาง","ยื่น","บัง","ครูด","คลุม","ล้ำ"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;
}

export function drainageCon(desc: string){
    const keyword = ["ท่อ","ระบาย","หลุม","ราง"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;
}

export function cuttingCon(desc: string){
    const keyword = ["ตัด"]
    for (let i of keyword) {
        if (desc.includes(i)) {
            return true;
        }
    }
    return false;
}