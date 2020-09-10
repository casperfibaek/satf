"use strict";
// global CustomFunctions
/* eslint-disable no-unused-vars */
function makeRequest(method, url, timeout) {
    if (timeout === void 0) { timeout = 12000; }
    return new Promise((function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.timeout = timeout;
        xhr.onload = function changeHappened() {
            if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            }
            else {
                reject(new Error({
                    status: this.status,
                    statusText: xhr.statusText,
                }));
            }
        };
        xhr.onerror = function errorHappened() {
            reject(new Error({
                status: this.status,
                statusText: xhr.statusText,
            }));
        };
        xhr.ontimeout = function timeoutHappened() {
            reject(new Error({
                status: this.status,
                statusText: "Timeout: " + method + "@" + url,
            }));
        };
        xhr.send();
    }));
}
function isValidPluscode(code) {
    // A separator used to break the code into two parts to aid memorability.
    var seperator = '+';
    // The number of characters to place before the separator.
    var seperatorPosition = 8;
    // The character used to pad codes.
    var paddingCharacter = '0';
    // The character set used to encode the values.
    var codeAlphabet = '23456789CFGHJMPQRVWX';
    if (!code || typeof code !== 'string') {
        return false;
    }
    // The separator is required.
    if (code.indexOf(seperator) === -1) {
        return false;
    }
    if (code.indexOf(seperator) !== code.lastIndexOf(seperator)) {
        return false;
    }
    // Is it the only character?
    if (code.length === 1) {
        return false;
    }
    // Is it in an illegal position?
    if (code.indexOf(seperator) > seperatorPosition || code.indexOf(seperator) % 2 === 1) {
        return false;
    }
    // We can have an even number of padding characters before the separator,
    // but then it must be the final character.
    if (code.indexOf(paddingCharacter) > -1) {
        // Not allowed to start with them!
        if (code.indexOf(paddingCharacter) === 0) {
            return false;
        }
        // There can only be one group and it must have even length.
        var padMatch = code.match(new RegExp("(" + paddingCharacter + "+)", 'g'));
        if (padMatch.length > 1 || padMatch[0].length % 2 === 1 || padMatch[0].length > seperatorPosition - 2) {
            return false;
        }
        // If the code is long enough to end with a separator, make sure it does.
        if (code.charAt(code.length - 1) !== seperator) {
            return false;
        }
    }
    // If there are characters after the separator, make sure there isn't just
    // one of them (not legal).
    if (code.length - code.indexOf(seperator) - 1 === 1) {
        return false;
    }
    // Strip the separator and any padding characters.
    var nosepCode = code.replace(new RegExp("\\" + seperator + "+"), '').replace(new RegExp(paddingCharacter + "+"), '');
    // Check the code contains only valid characters.
    for (var i = 0, len = nosepCode.length; i < len; i += 1) {
        var character = nosepCode.charAt(i).toUpperCase();
        if (character !== seperator && codeAlphabet.indexOf(character) === -1) {
            return false;
        }
    }
    return true;
}
function isValidWhatFreeWords(str) {
    if (typeof str !== 'string') {
        return false;
    }
    if (str.split('.').length !== 3) {
        return false;
    }
    if (/^[a-zA-Z.]+$/.test(str) === false) {
        return false;
    }
    return true;
}
function LatLngToWhatFreeWords(latitude, longitude) {
    return new Promise(function (resolve, reject) {
        makeRequest('get', "https://satf.azurewebsites.net/api/latlng_to_whatfreewords?lat=" + latitude + "&lng=" + longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    });
}
function What3WordsToLatLng(words) {
    return new Promise(function (resolve, reject) {
        makeRequest('get', "https://satf.azurewebsites.net/api/whatfreewords_to_latlng?words=" + words)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    });
}
function LatLngToPluscode(latitude, longitude) {
    return new Promise(function (resolve, reject) {
        makeRequest('get', "https://satf.azurewebsites.net/api/latlng_to_pluscode?lat=" + latitude + "&lng=" + longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    });
}
function PlusCodeToLatLng(code) {
    return new Promise(function (resolve, reject) {
        makeRequest('get', "https://satf.azurewebsites.net/api/pluscode_to_latlng?code=" + code)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    });
}
function getLatLngInfo(baseurl, latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    try {
        if (isValidWhatFreeWords(latitude)) {
            return What3WordsToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                return new Promise((function (resolve, reject) {
                    makeRequest('get', baseurl + "?lat=" + coords[0] + "&lng=" + coords[1])
                        .then(function (value) { resolve(value); })
                        .catch(function (err) { reject(err); });
                }));
            });
        }
        if (isValidPluscode(latitude)) {
            return PlusCodeToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                return new Promise((function (resolve, reject) {
                    makeRequest('get', baseurl + "?lat=" + coords[0] + "&lng=" + coords[1])
                        .then(function (value) { resolve(value); })
                        .catch(function (err) { reject(err); });
                }));
            });
        }
        return new Promise((function (resolve, reject) {
            makeRequest('get', baseurl + "?lat=" + latitude + "&lng=" + longitude)
                .then(function (value) { resolve(value); })
                .catch(function (err) { reject(err); });
        }));
    }
    catch (err) {
        var error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
        throw error;
    }
}
function helloWorld() {
    console.log('hello hello - from new - see me?');
    
    return 'hello rev2';
}
function PopulationDensity(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/population_density';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(Number(value)); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function PopulationDensityBuffer(buffer_in_meters, latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var url = function (buffer, lat, lng) { return "https://satf.azurewebsites.net/api/population_density_buffer?lat=" + lat + "&lng=" + lng + "&buffer=" + buffer; };
    try {
        if (isValidWhatFreeWords(latitude)) {
            return What3WordsToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                var lat = coords[0];
                var lng = coords[1];
                return new Promise(function (resolve, reject) {
                    makeRequest('get', url(buffer_in_meters, lat, lng))
                        .then(function (value) { resolve(Number(value)); })
                        .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
                });
            });
        }
        if (isValidPluscode(latitude)) {
            return PlusCodeToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                var lat = coords[0];
                var lng = coords[1];
                return new Promise(function (resolve, reject) {
                    makeRequest('get', url(buffer_in_meters, lat, lng))
                        .then(function (value) { resolve(Number(value)); })
                        .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
                });
            });
        }
        var lat_1 = latitude;
        var lng_1 = longitude;
        return new Promise(function (resolve, reject) {
            makeRequest('get', url(buffer_in_meters, lat_1, lng_1))
                .then(function (value) { resolve(Number(value)); })
                .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
        });
    }
    catch (err) {
        var error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
        throw error;
    }
}
function PopulationDensityWalk(minutes, latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var url = function (buffer, lat, lng) { return "https://satf.azurewebsites.net/api/population_density_walk?lat=" + lat + "&lng=" + lng + "&minutes=" + buffer; };
    try {
        if (isValidWhatFreeWords(latitude)) {
            return What3WordsToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                var lat = coords[0];
                var lng = coords[1];
                return new Promise(function (resolve, reject) {
                    makeRequest('get', url(minutes, lat, lng))
                        .then(function (value) { resolve(Number(value)); })
                        .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
                });
            });
        }
        if (isValidPluscode(latitude)) {
            return PlusCodeToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                var lat = coords[0];
                var lng = coords[1];
                return new Promise(function (resolve, reject) {
                    makeRequest('get', url(minutes, lat, lng))
                        .then(function (value) { resolve(Number(value)); })
                        .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
                });
            });
        }
        var lat_2 = latitude;
        var lng_2 = longitude;
        return new Promise(function (resolve, reject) {
            makeRequest('get', url(minutes, lat_2, lng_2))
                .then(function (value) { resolve(Number(value)); })
                .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
        });
    }
    catch (err) {
        var error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
        throw error;
    }
}
function PopulationDensityBike(minutes, latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var url = function (buffer, lat, lng) { return "https://satf.azurewebsites.net/api/population_density_bike?lat=" + lat + "&lng=" + lng + "&minutes=" + buffer; };
    try {
        if (isValidWhatFreeWords(latitude)) {
            return What3WordsToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                var lat = coords[0];
                var lng = coords[1];
                return new Promise(function (resolve, reject) {
                    makeRequest('get', url(minutes, lat, lng))
                        .then(function (value) { resolve(Number(value)); })
                        .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
                });
            });
        }
        if (isValidPluscode(latitude)) {
            return PlusCodeToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                var lat = coords[0];
                var lng = coords[1];
                return new Promise(function (resolve, reject) {
                    makeRequest('get', url(minutes, lat, lng))
                        .then(function (value) { resolve(Number(value)); })
                        .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
                });
            });
        }
        var lat_3 = latitude;
        var lng_3 = longitude;
        return new Promise(function (resolve, reject) {
            makeRequest('get', url(minutes, lat_3, lng_3))
                .then(function (value) { resolve(Number(value)); })
                .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
        });
    }
    catch (err) {
        var error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
        throw error;
    }
}
function PopulationDensityCar(minutes, latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var url = function (buffer, lat, lng) { return "https://satf.azurewebsites.net/api/population_density_car?lat=" + lat + "&lng=" + lng + "&minutes=" + buffer; };
    try {
        if (isValidWhatFreeWords(latitude)) {
            return What3WordsToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                var lat = coords[0];
                var lng = coords[1];
                return new Promise(function (resolve, reject) {
                    makeRequest('get', url(minutes, lat, lng))
                        .then(function (value) { resolve(Number(value)); })
                        .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
                });
            });
        }
        if (isValidPluscode(latitude)) {
            return PlusCodeToLatLng(latitude).then(function (latlng) {
                var coords = JSON.parse(latlng);
                var lat = coords[0];
                var lng = coords[1];
                return new Promise(function (resolve, reject) {
                    makeRequest('get', url(minutes, lat, lng))
                        .then(function (value) { resolve(Number(value)); })
                        .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
                });
            });
        }
        var lat_4 = latitude;
        var lng_4 = longitude;
        return new Promise(function (resolve, reject) {
            makeRequest('get', url(minutes, lat_4, lng_4))
                .then(function (value) { resolve(Number(value)); })
                .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
        });
    }
    catch (err) {
        var error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
        throw error;
    }
}
function AdminLevel1(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/admin_level_1';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function AdminLevel2(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/admin_level_2';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function AdminLevel2FuzzyLev(name) {
    return new Promise((function (resolve, reject) {
        makeRequest('get', "https://satf.azurewebsites.net/api/admin_level_2_fuzzy_lev?name=" + name)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function AdminLevel2FuzzyTri(name) {
    return new Promise((function (resolve, reject) {
        makeRequest('get', "https://satf.azurewebsites.net/api/admin_level_2_fuzzy_tri?name=" + name)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function UrbanStatus(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/urban_status';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function UrbanStatusSimple(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/urban_status_simple';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function NearestPlace(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/nearest_placename';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function NearestPoi(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/nearest_poi';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function NearestBank(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/nearest_bank';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
function NearestBankDist(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    var baseurl = 'https://satf.azurewebsites.net/api/nearest_bank_distance';
    return new Promise((function (resolve, reject) {
        getLatLngInfo(baseurl, latitude, longitude)
            .then(function (value) { resolve(value); })
            .catch(function (err) { reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err))); });
    }));
}
