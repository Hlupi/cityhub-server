"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_geocode_1 = require("react-geocode");
react_geocode_1.default.setApiKey("AIzaSyCROzHfzVBykQOiB0CvKeqZV1VaIp7Ux6g");
exports.GeocodeAddress = (address) => {
    react_geocode_1.default.fromAddress(address).then(response => {
        const { lat, lng } = response.results[0].geometry.location;
        return { lat, lng };
    }, error => {
        console.error(error);
    });
};
//# sourceMappingURL=logic.js.map