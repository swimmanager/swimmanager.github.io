var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c, c1, c2, c3;
        c = c1 = c2 = c3 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};

var Conector = {
    url: "https://eve-test-1.herokuapp.com",
    atletas: {
        nombres: "/atletanombres",
        all: "/atletas",
        getNombre: function ($http) {
            var uri = Conector.url + Conector.atletas.nombres;
            return $http.get(uri);
        },
        addNombre: function ($http, data, auth) {
            var uri = Conector.url + Conector.atletas.nombres;
            var confg = {
                headers: {
                    "Authorization": "Basic " + auth
                }
            };
            return $http.post(uri, data, confg);
        },
        updateNombre: function ($http, data, auth, id, etag) {
            var uri = Conector.url + Conector.atletas.nombres + "/" + id;
            var config = {
                headers: {
                    "Authorization": "Basic " + auth,
                    "If-Match": etag
                }
            };
            return $http.patch(uri, data, config);
        },
        deleteNombre: function ($http, auth, id, etag) {
            console.log(auth);
            var uri = Conector.url + Conector.atletas.nombres + "/" + id;
            var config = {
                headers: {
                    "Authorization": "Basic " + auth,
                    "If-Match": etag
                }
            };
            return $http.delete(uri, config);
        },

        getAll: function ($http) {
            var uri = Conector.url + Conector.atletas.all + "?embedded={\"Nombre\":1}";
            return $http.get(uri);
        },
        getOneAll: function ($http, id) {
            var uri = Conector.url + Conector.atletas.all + "?embedded={\"Nombre\":1}&where={\"Nombre\":\"" + id + "\"}";
            return $http.get(uri);
        },
        addAll: function ($http, data, auth) {
            var uri = Conector.url + Conector.atletas.all;
            var confg = {
                headers: {
                    "Authorization": "Basic " + auth
                }
            };
            return $http.post(uri, data, confg);
        },
        updateAll: function ($http, data, auth, id, etag) {
            var uri = Conector.url + Conector.atletas.all + "/" + id;
            var config = {
                headers: {
                    "Authorization": "Basic " + auth,
                    "If-Match": etag
                }
            };
            return $http.patch(uri, data, config);
        },
        deleteAll: function ($http, auth, id, etag) {
            console.log(auth);
            var uri = Conector.url + Conector.atletas.all + "/" + id;
            var config = {
                headers: {
                    "Authorization": "Basic " + auth,
                    "If-Match": etag
                }
            };
            return $http.delete(uri, config);
        }


    },
    torneos: {
        base: "/torneos",
        getAll: function ($http) {
            var uri = Conector.url + Conector.torneos.base;
            return $http.get(uri);
        },
        getOne: function ($http, id) {
            var uri = Conector.url + Conector.torneos.base + "/" + id;
            return $http.get(uri);
        },
        add: function ($http, data, auth) {
            var uri = Conector.url + Conector.torneos;
            var confg = {
                headers: {
                    "Authorization": "Basic " + auth
                }
            };
            return $http.post(uri, data, confg);
        },
        update: function ($http, data, auth, id, etag) {
            var uri = Conector.url + Conector.torneos + "/" + id;
            var config = {
                headers: {
                    "Authorization": "Basic " + auth,
                    "If-Match": etag
                }
            };
            return $http.patch(uri, data, config);
        },
        delete: function ($http, auth, id, etag) {
            console.log(auth);
            var uri = Conector.url + Conector.torneos + "/" + id;
            var config = {
                headers: {
                    "Authorization": "Basic " + auth,
                    "If-Match": etag
                }
            };
            return $http.delete(uri, config);
        }

    }
};