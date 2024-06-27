"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haversineDistance = void 0;
const haversineDistance = (lat1, long1, lat2, long2) => {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLong = toRad(long2 - long1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
exports.haversineDistance = haversineDistance;
//# sourceMappingURL=getLocation.js.map