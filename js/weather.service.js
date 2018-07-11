angular
.module('WeatherApp')
.factory('weatherService', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http, logger) {
return {
    getPlaces
};

function getPlaces(genderTemp) {
    return $http.get('https://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=a9890e63974773d7a3a34304a3f092c3')
        .then(getPlacesComplete)
        .catch(getPlacesFailed);
   


    function getDiff(a) {
        const tempDiff = Math.abs(genderTemp - a.temp);
        const humidityDiff = Math.abs(50 - a.humidity);
        return tempDiff + humidityDiff;       
    }


    function getPlacesComplete(response) {
        return response.data.list
        .map(({name, main:{humidity}, main:{temp}}) => ({name, humidity, temp}))
        .sort((a, b) => getDiff(a) - getDiff(b));
    }

    function getPlacesFailed(error) {
        logger.error('XHR Failed for getPlaces.' + error.data);
    }
}
}