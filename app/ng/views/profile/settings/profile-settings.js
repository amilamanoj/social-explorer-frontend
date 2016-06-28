'use strict';

angular.module('myApp.profile')

    .constant('profileSettingsState', {
        name: 'profile.settings',
        options: {


            url: '/settings',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@profile': {
                    templateUrl: 'views/profile/settings/profile-settings.html',
                    controller: 'ProfileSettingsCtrl'
                }


            },

            ncyBreadcrumb: {
                label: "Settings",
                parent: "profile"
            }

        }

    })
     .controller('ProfileSettingsCtrl', function($scope, $state, Profile, currUser, $rootScope, $mdToast) {

         $scope.updateUser = updateUser;
         $scope.cancel = cancel;

         $scope.user=Profile.get({userId:currUser.getUser()._id});
         console.log("iam here");


         function updateUser(){
             console.log("edit user");
             $scope.newUser = new Profile();
             $scope.newUser._id = this.user._id;
             $scope.newUser.username = this.user.username;
             $scope.newUser.email = this.user.email;
             $scope.newUser.age = this.user.age;
             $scope.newUser.country = this.user.country;
             $scope.newUser.city = this.user.city;
             $scope.newUser.description = this.user.description;


             if (this.user.image!= undefined) {
                 $scope.newUser.img = this.user.image.base64;
             }

             console.log($scope.newUser);


             $scope.newUser.$update()
                 .then(function(){
                     $rootScope.$broadcast('profileUpdate', $scope.newUser);
                     $state.go('profile.settings');
                     showSimpleToast("Profile updated!")
                 }).catch(function(e){
                 console.log("error: " + e);
                 showSimpleToast("User update failed: " + e);

             });
         }

         $scope.countries = [
             "Afghanistan",
             "Åland Islands",
             "Albania",
             "Algeria",
             "American Samoa",
             "Andorra",
             "Angola",
             "Anguilla",
             "Antarctica",
             "Antigua and Barbuda",
             "Argentina",
             "Armenia",
             "Aruba",
             "Australia",
             "Austria",
             "Azerbaijan",
             "Bahamas",
             "Bahrain",
             "Bangladesh",
             "Barbados",
             "Belarus",
             "Belgium",
             "Belize",
             "Benin",
             "Bermuda",
             "Bhutan",
             "Bolivia",
             "Bosnia and Herzegovina",
             "Botswana",
             "Bouvet Island",
             "Brazil",
             "British Indian Ocean Territory",
             "Brunei Darussalam",
             "Bulgaria",
             "Burkina Faso",
             "Burundi",
             "Cambodia",
             "Cameroon",
             "Canada",
             "Cape Verde",
             "Cayman Islands",
             "Central African Republic",
             "Chad",
             "Chile",
             "China",
             "Christmas Island",
             "Cocos (Keeling) Islands",
             "Colombia",
             "Comoros",
             "Congo",
             "Congo, The Democratic Republic of the",
             "Cook Islands",
             "Costa Rica",
             "Cote D\'Ivoire",
             "Croatia",
             "Cuba",
             "Cyprus",
             "Czech Republic",
             "Denmark",
             "Djibouti",
             "Dominica",
             "Dominican Republic",
             "Ecuador",
             "Egypt",
             "El Salvador",
             "Equatorial Guinea",
             "Eritrea",
             "Estonia",
             "Ethiopia",
             "Falkland Islands (Malvinas)",
             "Faroe Islands",
             "Fiji",
             "Finland",
             "France",
             "French Guiana",
             "French Polynesia",
             "French Southern Territories",
             "Gabon",
             "Gambia",
             "Georgia",
             "Germany",
             "Ghana",
             "Gibraltar",
             "Greece",
             "Greenland",
             "Grenada",
             "Guadeloupe",
             "Guam",
             "Guatemala",
             "Guernsey",
             "Guinea",
             "Guinea-Bissau",
             "Guyana",
             "Haiti",
             "Heard Island and Mcdonald Islands",
             "Holy See (Vatican City State)",
             "Honduras",
             "Hong Kong",
             "Hungary",
             "Iceland",
             "India",
             "Indonesia",
             "Iran, Islamic Republic Of",
             "Iraq",
             "Ireland",
             "Isle of Man",
             "Israel",
             "Italy",
             "Jamaica",
             "Japan",
             "Jersey",
             "Jordan",
             "Kazakhstan",
             "Kenya",
             "Kiribati",
             "Korea, Democratic People\'s Republic of",
             "Korea, Republic of",
             "Kuwait",
             "Kyrgyzstan",
             "Lao People\'s Democratic Republic",
             "Latvia",
             "Lebanon",
             "Lesotho",
             "Liberia",
             "Libyan Arab Jamahiriya",
             "Liechtenstein",
             "Lithuania",
             "Luxembourg",
             "Macao",
             "Macedonia, The Former Yugoslav Republic of",
             "Madagascar",
             "Malawi",
             "Malaysia",
             "Maldives",
             "Mali",
             "Malta",
             "Marshall Islands",
             "Martinique",
             "Mauritania",
             "Mauritius",
             "Mayotte",
             "Mexico",
             "Micronesia, Federated States of",
             "Moldova, Republic of",
             "Monaco",
             "Mongolia",
             "Montserrat",
             "Morocco",
             "Mozambique",
             "Myanmar",
             "Namibia",
             "Nauru",
             "Nepal",
             "Netherlands",
             "Netherlands Antilles",
             "New Caledonia",
             "New Zealand",
             "Nicaragua",
             "Niger",
             "Nigeria",
             "Niue",
             "Norfolk Island",
             "Northern Mariana Islands",
             "Norway",
             "Oman",
             "Pakistan",
             "Palau",
             "Palestinian Territory, Occupied",
             "Panama",
             "Papua New Guinea",
             "Paraguay",
             "Peru",
             "Philippines",
             "Pitcairn",
             "Poland",
             "Portugal",
             "Puerto Rico",
             "Qatar",
             "Reunion",
             "Romania",
             "Russian Federation",
             "Rwanda",
             "Saint Helena",
             "Saint Kitts and Nevis",
             "Saint Lucia",
             "Saint Pierre and Miquelon",
             "Saint Vincent and the Grenadines",
             "Samoa",
             "San Marino",
             "Sao Tome and Principe",
             "Saudi Arabia",
             "Senegal",
             "Serbia and Montenegro",
             "Seychelles",
             "Sierra Leone",
             "Singapore",
             "Slovakia",
             "Slovenia",
             "Solomon Islands",
             "Somalia",
             "South Africa",
             "South Georgia and the South Sandwich Islands",
             "Spain",
             "Sri Lanka",
             "Sudan",
             "Suriname",
             "Svalbard and Jan Mayen",
             "Swaziland",
             "Sweden",
             "Switzerland",
             "Syrian Arab Republic",
             "Taiwan, Province of China",
             "Tajikistan",
             "Tanzania, United Republic of",
             "Thailand",
             "Timor-Leste",
             "Togo",
             "Tokelau",
             "Tonga",
             "Trinidad and Tobago",
             "Tunisia",
             "Turkey",
             "Turkmenistan",
             "Turks and Caicos Islands",
             "Tuvalu",
             "Uganda",
             "Ukraine",
             "United Arab Emirates",
             "United Kingdom",
             "United States",
             "United States Minor Outlying Islands",
             "Uruguay",
             "Uzbekistan",
             "Vanuatu",
             "Venezuela",
             "Vietnam",
             "Virgin Islands, British",
             "Virgin Islands, U.S.",
             "Wallis and Futuna",
             "Western Sahara",
             "Yemen",
             "Zambia",
             "Zimbabwe"
         ];



         function cancel(){
             $state.go('profile.settings')
         }



         function showSimpleToast(txt){
             $mdToast.show(
                 $mdToast.simple()
                     .textContent(txt)
                     .position('bottom right')
                     .hideDelay(3000)

             );
         }


     });
