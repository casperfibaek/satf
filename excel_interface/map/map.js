"use strict";
function htmlTable(obj) {
    var table = '<table class=""><tbody>';
    if (obj._data) {
        for (var i = 0; i < obj._data.length; i += 1) {
            table += "<tr><td>" + obj._data[i] + "</td></tr>";
        }
    }
    else {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i += 1) {
            var key = keys[i];
            var val = obj[key];
            table += "<tr><td>" + key + "</td><td>" + val + "</td></tr>";
        }
    }
    table += '</tbody></table>';
    return table;
}
function arrayToGeojson(arr) {
    var geojson = {
        type: 'FeatureCollection',
        features: [],
    };
    for (var i = 0; i < arr.length; i += 1) {
        geojson.features.push({
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [arr[i]],
            },
        });
    }
    return geojson;
}
if (localStorage.getItem('eventNumber') === null) {
    localStorage.setItem('eventNumber', '0');
}
var localEvent = Number(localStorage.getItem('eventNumber'));
// Bounds
var southWest = L.latLng(5.3353253293190095, -1.1842325491159249);
var northEast = L.latLng(6.1770972290384405, 0.4266650607723487);
var bounds = L.latLngBounds(southWest, northEast);
// Base layers
var osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', minZoom: 9, maxZoom: 18 });
var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
});
var s2Dry = L.tileLayer('https://imap.niras.dk/proximity/s2_dry/{z}/{x}/{y}.png', {
    tms: true, opacity: 1, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var s2Wet = L.tileLayer('https://imap.niras.dk/proximity/s2_wet/{z}/{x}/{y}.png', {
    tms: true, opacity: 1, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var white = L.tileLayer('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==', { minZoom: 9, maxZoom: 15 });
var map = L.map('map', {
    center: [5.6899537, -0.557727],
    zoom: 13,
    minZoom: 5,
    minNativeZoom: 9,
    maxZoom: 19,
    maxNativeZoom: 18,
    layers: [osm],
});
window.map = map;
L.control.scale().addTo(map);
var allClasses = L.tileLayer('https://imap.niras.dk/proximity/all_classes/{z}/{x}/{y}.png', {
    tms: true, opacity: 0.7, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var urbanNonUrban = L.tileLayer('https://imap.niras.dk/proximity/urban_non-urban/{z}/{x}/{y}.png', {
    tms: true, opacity: 0.7, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var bankDistance = L.tileLayer('https://imap.niras.dk/proximity/bank_distance/{z}/{x}/{y}.png', {
    tms: true, opacity: 0.7, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var roadDensity = L.tileLayer('https://imap.niras.dk/proximity/road_density/{z}/{x}/{y}.png', {
    tms: true, opacity: 0.7, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var viirs = L.tileLayer('https://imap.niras.dk/proximity/viirs/{z}/{x}/{y}.png', {
    tms: true, opacity: 0.7, attribution: 'NASA', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var surfDry = L.tileLayer('https://imap.niras.dk/proximity/surf_dry/{z}/{x}/{y}.png', {
    tms: true, opacity: 0.7, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var surfWet = L.tileLayer('https://imap.niras.dk/proximity/surf_wet/{z}/{x}/{y}.png', {
    tms: true, opacity: 0.7, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var texB04 = L.tileLayer('https://imap.niras.dk/proximity/dry_b4_tex/{z}/{x}/{y}.png', {
    tms: true, opacity: 1, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var texB08 = L.tileLayer('https://imap.niras.dk/proximity/dry_b8_tex/{z}/{x}/{y}.png', {
    tms: true, opacity: 1, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var texB12 = L.tileLayer('https://imap.niras.dk/proximity/dry_b12_tex/{z}/{x}/{y}.png', {
    tms: true, opacity: 1, attribution: 'NIRAS', minZoom: 9, maxNativeZoom: 15, maxZoom: 21,
    bounds: bounds,
});
var basemaps = {
    OpenStreetMap: osm,
    'Esri WorldMap': esri,
    'Dry Season 2019 (RGB)': s2Dry,
    'Wet Season 2019 (RGB)': s2Wet,
    'Without background': white,
};
var overlaymaps = {
    'Classification (All)': allClasses,
    'Classification (Urb/Rur)': urbanNonUrban,
    'Nighttime Lights 2019': viirs,
    'Distance to Banks': bankDistance,
    'Road Density': roadDensity,
    'Dry season SAR (Coh2 * Db)': surfDry,
    'Wet season SAR (Coh2 * Db)': surfWet,
    'PCA Texture Red': texB04,
    'PCA Texture NIR': texB08,
    'PCA Texture SWIR': texB12,
};
L.control.layers(basemaps, overlaymaps, { collapsed: true }).addTo(map);
function addMarkers(themap, markername) {
    try {
        var markerArray = JSON.parse(localStorage[markername]);
        var geojson = arrayToGeojson(markerArray);
        var geojsonMarkerOptions_1 = {
            radius: 8,
            fillColor: '#ff7800',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
        };
        var geojsonLayer = L.geoJSON(geojson, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions_1);
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    layer.bindPopup(htmlTable(feature.properties));
                }
            },
            // Flip coords
            coordsToLatLng: function (coords) {
                return new L.LatLng(coords[0], coords[1]);
            },
        }).addTo(themap);
        map.fitBounds(geojsonLayer.getBounds());
    }
    catch (err) {
        console.log(err);
    }
    // const markersList = JSON.parse(localStorage.getItem(markername));
    // let markers = [];
    // if (typeof markersList[0][0] === 'string') {
    //   markers = JSON.parse(localStorage.getItem(markername)).slice(1, -1);
    // } else {
    //   markers = JSON.parse(localStorage.getItem(markername));
    // }
    // const markerGroup = L.featureGroup().addTo(themap);
    // for (let i = 0; i < markers.length; i += 1) {
    //   markerGroup.addLayer(L.circleMarker(markers[i]));
    // }
    // themap.fitBounds(markerGroup.getBounds());
}
Office.onReady().then(function () {
    try {
        addMarkers(map, 'markers');
    }
    catch (err) {
        console.log('Could not add markers to map: ', err);
    }
    setInterval(function () {
        var globalEvent = Number(localStorage.getItem('eventNumber'));
        if (globalEvent !== localEvent) {
            try {
                addMarkers(map, 'markers');
            }
            catch (err) {
                console.log('Could not add markers to map: ', err);
            }
            localEvent = globalEvent;
        }
    }, 100);
    function onMapClick(e) {
        var coords = e.latlng;
        L.circleMarker(coords, { radius: 10 }).addTo(map);
        localStorage.setItem('newCoords', JSON.stringify(coords));
        Office.context.ui.messageParent('newCoords');
        idbKeyval.get('hello').then(function (val) { return console.log(val); });
    }
    map.on('click', onMapClick);
});
