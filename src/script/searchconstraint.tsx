
export function withinRadiusCon(myLat: number, myLong: number, probLat: number, probLong: number){
    return true;
}

export function fallenTreeCon(desc: string){
    const keyword = ["โค่น","ล้ม","หัก","ต้น"]
    keyword.forEach(i => {
        if (desc.includes(i)){
            return true;
        }
    })
    return false;
}

export function beeHiveCon(desc: string){
    const keyword = ["รัง"]
    keyword.forEach(i => {
        if (desc.includes(i)){
            return true;
        }
    })
    return false;

}

export function witheredCon(desc: string){
    const keyword = ["เหี่ยว","เฉา"]
    keyword.forEach(i => {
        if (desc.includes(i)){
            return true;
        }
    })
    return false;

}

export function obstructedCon(desc: string){
    const keyword = ["ขวาง"]
    keyword.forEach(i => {
        if (desc.includes(i)){
            return true;
        }
    })
    return false;
}