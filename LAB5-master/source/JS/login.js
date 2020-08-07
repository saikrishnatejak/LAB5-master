/**
 * Created by gani on 1/29/2018.
 */

socialNetwork.controller('loginController', ['$scope', '$location', '$window', '$http', function($scope, $location, $window, $http) {

    var loginController = this;

    $window.document.title = "Login";
    $("#welcome_image_container").hide();

    /*loginController.previewFile = function () {
        var preview = document.getElementById('user_image'); //selects the query named img
        var file    = document.querySelector('input[type=file]').files[0]; //sames as here
        var reader  = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
            loginController.pictureSrc = preview.src;
        }

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
        } else {
            preview.src = "";
        }
    };*/

    loginController.registerUser = function () {
        if(loginController.register_Email === null || loginController.register_Email === undefined || loginController.register_Email === '' || loginController.register_Name === null || loginController.register_Name === undefined || loginController.register_Name === '' || loginController.register_MobileNo === null || loginController.register_MobileNo === undefined || loginController.register_MobileNo === '' || loginController.register_Password === null || loginController.register_Password === undefined || loginController.register_Password === '') {
                alert("Please enter all data fields to register.");
        }
        else {
            if(loginController.register_Password === loginController.register_ConfirmPassword){
                var data = {
                    'email': loginController.register_Email,
                    'name': loginController.register_Name,
                    'MobileNo': loginController.register_MobileNo,
                    'Password': loginController.register_Password
                };
                var email = loginController.register_Email;
                //localStorage.setItem(email, JSON.stringify(data));
                var config = {
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
                $http.post('http://127.0.0.1:8081/register',data).then(function (response) {
                    alert('success');
                    $scope.message = response.data;
                    $('.register-modal').modal('hide');
                });

            }
            else
            {
                alert("Please enter same password to proceed.");
            }

        }
    };



    loginController.showUserPicture = function () {
        var x=$http.get('http://127.0.0.1:8081/signin',{params: {email:loginController.login_email}});
        x.success(function (data) {
            if(data!=null) {
                if (loginController.login_email === data.email) {
                    $("#welcome_image_container").show();
                    var dataImage = data.Picture;
                    bannerImg = document.getElementById('user_welcome_image');
                    bannerImg.src =  dataImage;
                }
                else {
                    alert("Invalid login or password");
                }
            }
            if(data==null)
            {
                alert("Invalid login or password");
            }
        });
    };

    loginController.signIn = function () {
        $http.get('http://127.0.0.1:8081/signin',{params: {email:loginController.login_email}}).then(function (response) {
            if(response.data!=null) {
                alert('Success');
                if (loginController.login_email === response.data.email & loginController.login_password === response.data.Password) {
                    gProfileData = response.data;
                    $location.path("profile");
                }
                else {
                    alert("Invalid login or password");
                }
            }
            if(data==null)
            {
                alert("Invalid login or password");
            }
        });
    };
}
]);