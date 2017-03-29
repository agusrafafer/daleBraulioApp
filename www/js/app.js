// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services', 'ui.mask', 'rzModule', 'ionic-datepicker'])

        .config(function($ionicConfigProvider) {

        })
        .config(['$httpProvider', function($httpProvider) {
                // ...www.worklife.com.ar

                // delete header from client:
                // http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
            }])
        .config(function(ionicDatePickerProvider) {
            var datePickerObj = {
                inputDate: new Date(),
                titleLabel: 'Seleccione una fecha',
                setLabel: 'Ok',
                todayLabel: 'Hoy',
                closeLabel: 'Cerrar',
                mondayFirst: false,
                weeksList: ["D", "L", "M", "M", "J", "V", "S"],
                monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                templateType: 'popup',
                from: new Date(2010, 1, 1),
                to: new Date(2030, 1, 1),
                showTodayButton: true,
                dateFormat: 'dd MMMM yyyy',
                closeOnSelect: false,
                disableWeekdays: []
            };
            ionicDatePickerProvider.configDatePicker(datePickerObj);
        })

        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })