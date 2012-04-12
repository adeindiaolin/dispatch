var minLat = 0;
var maxLat = 100;
var minLong = 0;
var maxLong = 100;

function getLatLong() {
    // spoofs latitude and longitude locations
    // using the variables defined above    
    return {
        lat: Math.random() * (maxLat - minLat) + minLat,
        long: Math.random() * (maxLong - minLong) + minLong 
    }
}

exports.getLatLong = getLatLong;
