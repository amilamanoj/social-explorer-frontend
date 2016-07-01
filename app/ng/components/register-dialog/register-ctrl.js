angular.module('myApp')
    .controller("register", function ($scope, currUser, $mdDialog) {
        $scope.username = '';
        $scope.email = '';
        $scope.pwd = '';
        $scope.pwdConfirm
        $scope.errorText = '';

      
        $scope.register = register;
        $scope.cancel = cancel;
        $scope.checkPass = checkPass;



        function register() {
            currUser.register($scope.username, $scope.email, $scope.pwd).then(function () {
                $mdDialog.hide();
            }, function (response) {
                debugger;
                if (response.status == 400 || response.status == 401) {
                    $scope.errorText = "An unknown error occured. please try again later.";
                }
            });
        }


        function cancel() {
            $mdDialog.cancel();
        }

        function checkPass() //doesnt work right now
        {
            //Store the password field objects into variables ...
            var password = document.getElementById('password');
            var passwordConfirm = document.getElementById('passwordConfirm');
            //Store the Confimation Message Object ...
            var message = document.getElementById('confirmMessage');
            //Set the colors we will be using ...
            var goodColor = "#66cc66";
            var badColor = "#ff6666";
            //Compare the values in the password field 
            //and the confirmation field
            if(password.value == passwordConfirm.value){
                //The passwords match. 
                //Set the color to the good color and inform
                //the user that they have entered the correct password 
                passwordConfirm.style.backgroundColor = goodColor;
                message.style.color = goodColor;
                message.innerHTML = "Passwords Match!"
            }else{
                //The passwords do not match.
                //Set the color to the bad color and
                //notify the user.
                pass2.style.backgroundColor = badColor;
                message.style.color = badColor;
                message.innerHTML = "Passwords Do Not Match!"
            }
        }
    });
