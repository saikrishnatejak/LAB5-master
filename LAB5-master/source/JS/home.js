/**
 * Created by gani on 1/29/2018.
 */

socialNetwork.controller('homeController', ['$scope', '$location', '$timeout', '$http', '$window', function($scope, $location, $timeout, $http, $window) {

    var homeController = this;
   //


    var map;
    var mapOptions;

    $scope.gFromPlace;
    $scope.gToPlace;

    $window.document.title = "Home";

    homeController.userData = gUserData;

    var loginUserImage = document.getElementById('login_user_image');
    loginUserImage.src = gUserData.Picture;

    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();

    homeController.signOut = function () {
        $location.path("login");
    };


    $scope.initialize = function () {
        var pos = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 5,
            center: pos
        };

        map = new google.maps.Map(document.getElementById('map-canvas'));

        map.setCenter(new google.maps.LatLng(41.850033, -87.6500523));
        map.setZoom(4);
    };
    $scope.calcRoute = function () {
        var end = document.getElementById('endlocation').value;
        var start = document.getElementById('startlocation').value;

        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);
                console.log(status);
            }

        });

        $scope.getWeather($('#fromcityLat').val(), $('#fromcityLng').val(), 'from');
        $scope.getWeather($('#tocityLat').val(), $('#tocityLng').val(), 'to');
    };

    $scope.initialize();

    $scope.getWeather = function(lat, long, flag) {
        $http.get('http://api.wunderground.com/api/c3bb2ca8a46574cb/geolookup/q/' + parseFloat(lat) +',' + parseFloat(long)+'.json').then(function (response) {
            var data =  response.data;
            console.log(data);
            var city = data.location.city.replace(' ', '_');
            var state = data.location.state;
            if(flag === 'from'){
                homeController.fromCity = data.location.city;
                homeController.fromState = data.location.state;
            }
            else if(flag === 'to')
            {
                homeController.toCity = data.location.city;
                homeController.toState = data.location.state;
            }
            $scope.getWeatherData(city, state, flag);
        })
    };

    $scope.getWeatherData = function(city, state, flag) {
        $http.get('http://api.wunderground.com/api/c3bb2ca8a46574cb/conditions/q/' + state + '/' + city + '.json?noCache=false').then(function (response) {
            var data = response.data;
            temp = data.current_observation.temp_f;
            icon = data.current_observation.icon_url;
            weather = data.current_observation.weather;
            if (flag === 'from') {
            homeController.currentfromcityweather = {
                html: "Currently " + temp + " &deg; F and " + weather + ""
            };
                homeController.fromcurrentIcon = {
                    html: "<img src='" + icon + "'/>"
                }
        }
            else if(flag === 'to'){
                homeController.currenttocityweather = {
                    html: "Currently " + temp + " &deg; F and " + weather + ""
                };
                homeController.tocurrentIcon = {
                    html: "<img src='" + icon + "'/>"
                }
            }
        })
    };
}]);
