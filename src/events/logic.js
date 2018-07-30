import Geocode from "react-geocode"
Geocode.setApiKey("AIzaSyCROzHfzVBykQOiB0CvKeqZV1VaIp7Ux6g")

export default GeocodeAddress = (address) => {
  Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      return {lat, lng}
    },
    error => {
        console.error(error);
    }
  )

}
