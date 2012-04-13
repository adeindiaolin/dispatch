function distanceCosine(caller, puller) {
    // Assumes JSON inputs with "latitude" and "longitude" keys
    // return distance in km according to Law of Cosines
    // https://developers.google.com/maps/articles/phpsqlsearch
    var callerLoc = {
        latitude: degreesToRadians(caller.latitude),
        longitude: degreesToRadians(caller.longitude)
    };
    var pullerLoc = {
        latitude: degreesToRadians(puller.latitude),
        longitude: degreesToRadians(puller.longitude)
    };

    return 6371 * Math.acos(
            Math.cos(callerLoc.latitude) * Math.cos(pullerLoc.latitude) *
            Math.cos(callerLoc.longitude - pullerLoc.longitude) +
            Math.sin(callerLoc.latitude) * Math.sin(pullerLoc.latitude)
        )
}

function distanceHaversine(caller, puller) {
    // Assumes JSON inputs with "latitude" and "longitude" keys
    // return distance in km according to Haversine's formula
    // http://www.movable-type.co.uk/scripts/latlong.html
    var callerLoc = {
        latitude: degreesToRadians(caller.latitude),
        longitude: degreesToRadians(caller.longitude)
    };
    var deltaLoc = {
        latitude: degreesToRadians(puller.latitude) - callerLoc.latitude,
        longitude: degreesToRadians(puller.longitude) - callerLoc.longitude
    };
    
    var dLat = degreesToRadians(puller.latitude - caller.latitude);
    var dLon = degreesToRadians(puller.longitude - caller.longitude);
    var lat1 = degreesToRadians(caller.latitude);
    var lat2 = degreesToRadians(puller.latitude);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 

    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); // km
}

function degreesToRadians(deg) {
    return deg*Math.PI/180;
}

/*
// TEST CODE:
var caller = {
    latitude: 50.0359,
    longitude: 5.4253
};
var puller = {
    latitude: 58.3838,
    longitude: 3.0412
};
console.log(distanceCosine(caller,puller));
console.log(distanceHaversine(caller,puller));
*/

exports.distanceCosine = distanceCosine;
exports.distanceHaversine = distanceHaversine;
exports.degreesToRadians = degreesToRadians;
