/**
 * Created by gani on 1/28/2018.
 */
var socialNetwork = angular.module('socialNetwork', ['ngRoute', 'ngSanitize']);
var gPictureSrc = '';
var gUserData = '';
var gProfileData = '';

socialNetwork.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

socialNetwork.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'loginController',
            controllerAs: 'loginController'
        })
        .when('/about', {
            templateUrl: 'about.html',
            controller: 'aboutController'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController',
            controllerAs: 'homeController'
        })
        .when('/profile', {
            templateUrl: 'profile.html',
            controller: 'profileController',
            controllerAs: 'profileController'
        })
        .otherwise({ redirectTo: '/' });

});

function previewFile() {
    var preview = document.getElementById('user_image'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        gPictureSrc = preview.src;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
};


socialNetwork.directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };

});
socialNetwork.directive('googlesourceplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gFromPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gFromPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                    var place = scope.gFromPlace.getPlace();
                    document.getElementById('fromcityLat').value = place.geometry.location.lat();
                    document.getElementById('fromcityLng').value = place.geometry.location.lng();
                });
            });
        }
    };

});
socialNetwork.directive('googledestinationplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gToPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gToPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                    var place = scope.gToPlace.getPlace();
                    document.getElementById('tocityLat').value = place.geometry.location.lat();
                    document.getElementById('tocityLng').value = place.geometry.location.lng();
                });
            });
        }
    };

});
