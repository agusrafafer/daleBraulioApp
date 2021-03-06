angular.module('app.routes', [])

        .config(function($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider



                    .state('menu.login', {
                        url: '/page1',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/login.html',
                                controller: 'usuarioCtrl'
                            }
                        }
                    })

                    .state('menu.daleBraulio', {
                        url: '/page2',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/daleBraulio.html',
                                controller: 'productoCtrl'
                            }
                        }
                    })

                    .state('menu.registro', {
                        url: '/page3',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/registro.html',
                                controller: 'usuarioCtrl'
                            }
                        }
                    })

                    .state('menu', {
                        url: '/side-menu21',
                        templateUrl: 'templates/menu.html',
                        controller: 'usuarioCtrl'
                    })

                    .state('menu.resultados', {
                        url: '/page5',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/resultados.html',
                                controller: 'productoCtrl'
                            }
                        }
                    })

                    .state('menu.producto', {
                        url: '/page6',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/producto.html',
                                controller: 'productoCtrl'
                            }
                        }
                    })

                    .state('menu.descripcion', {
                        url: '/page7',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/descripcion.html',
                                controller: 'productoCtrl'
                            }
                        }
                    })

                    .state('menu.ubicacion', {
                        url: '/page8',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/ubicacion.html',
                                controller: 'ubicacionCtrl'
                            }
                        }
                    })

                    .state('menu.opcionFiltros', {
                        url: '/page9',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/opcionFiltros.html',
                                controller: 'productoCtrl'
                            }
                        }
                    })

                    .state('menu.filtros', {
                        url: '/page10',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/filtros.html',
                                controller: 'productoCtrl'
                            }
                        }
                    })

                    .state('menu.opcionFiltrosPedidos', {
                        url: '/page11',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/opcionFiltrosPedidos.html',
                                controller: 'productoCtrl'
                            }
                        }
                    })

                    .state('menu.pedidos', {
                        url: '/page12',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/pedidos.html',
                                controller: 'productoCtrl'
                            }
                        }
                    });


            $urlRouterProvider.otherwise('/side-menu21/page2');



        });