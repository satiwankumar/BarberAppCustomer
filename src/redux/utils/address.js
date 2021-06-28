import axios from 'axios';

const googleBaseUrl =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&input=';
const googleAllBaseUrl =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
const geoBase = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const googleApiKey = 'AIzaSyBFRqlCOvRtuKLpvDSP5qLkiyCr5dKx7jI';
const geocodeUrl =
  'http://dev61.onlinetestingserver.com/forward-geo-code?address=';

export const AddressApi = {
  getAddressByLatlng: (data, callback) => {
    let latlng = data.lat + ',' + data.lng;
    let full_url =
      geoBase +
      latlng +
      '&sensor=false' +
      '&key=' +
      googleApiKey 
    axios(full_url).then((d) => {
      d.json().then((data) => {
        let re = [];
        if (data.status === 'OK') {
          // data.result
          let a = data.results.reverse();
          // console.log('asd',a)
          for (da of a) {
            // console.log(da)
            if (da.types.indexOf('country') > -1) {
              for (component of da.address_components) {
                if (component.types.indexOf('country') > -1) {
                  callback(da);
                  break;
                }
              }
              break;
            }
          }
        }
      });
    });
  },
  getAddressPrediction: async (word, city = false) => {
    let url ="https://jsonplaceholder.typicode.com/todos/1";
    console.log("predic",url);
    try {
        console.log("eeeeeee");
        const response = await axios.get(url);
        console.log("response!!!!!!!");
    } catch (error) {
        console.error(error);
    }
   
  },
  getSessionToken: () => {
    let sessionKey = Math.floor(Math.random() * 10).toString();
    // console.log('sessionKey ',sessionKey)
    return sessionKey;
  },
  getGeoCode: (address, success) => {
    let url = geocodeUrl + address;
    // console.log(url)
    fetch(url).then((d) => {
      // console.log(d)
      d.json().then((data) => {
        success(data);
        // console.log('add data',data)
      });
    });
  },
};
export const getAddressPrediction = async (word, city = false) => {
    let url =`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${word}&key=AIzaSyBFRqlCOvRtuKLpvDSP5qLkiyCr5dKx7jI`;
    try {
        const response = await axios.get(url);
        const predictions = response.data.predictions;
        return predictions;
    } catch (error) {
        console.error(error);
    }
}

export const getGeoCode = async (address) => {
  let url = geocodeUrl + address;
  try {
    const response = await axios.get(url);
    console.log("geoCode",response.data);
    const geoCode = response.data;
    return geoCode;
} catch (error) {
    console.error(error);
}
}