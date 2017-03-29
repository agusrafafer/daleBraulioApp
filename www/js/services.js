angular.module('app.services', [])

        .factory('wsFactory', [function() {
                return {
                    url: "http://www.dalebraulio.com.ar/home/webresources"
                };
            }])

        .factory('usuarioFactory', function() {
            return {
                usuario: {
                    usuario: "",
                    cuit: "",
                    razonSoc: "",
                    mailLogin: "",
                    clave: "",
                    confirmClave: ""
                }
            };
        })

        .factory('productoFactory', function() {
            return {
                items: [],
                seleccionado: "",
                textoBuscado: "",
                textoBuscadoAnt: "",
                filtros: {
                    opcion: "",
                    empresa: -1,
                    provincia: -1,
                    rubro: -1,
                    precioMin: -1,
                    precioMax: -1,
                    ceil: -1,//Es el precio más alto de todos (el tope de todos los precios de los productos en el listado)
                    floor: -1,//Es el precio mas chico de todos (el piso de todos los precios de los productos en el listado)
                    items: []
                }
            };
        })
        
        .factory('pedidoFactory', function() {
            return {
                items: [],
                seleccionado: "",
                filtros: {
                    opcion: "",
                    sucursal: "",
                    itemsSucursales: [],
                    fechaDesde: -1,
                    fechaHasta: -1, 
                    itemsPedidos: []
                }
            };
        })

        .service('usuarioService', ['$http', '$q', 'wsFactory', function($http, $q, wsFactory) {
                this.validarLogin = function(nombreUsuario, password) {
                    //defered = diferido (asincrono)
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.get(wsFactory.url + '/datos.usuario/login/' + nombreUsuario + '/' + password)
                            .success(function(data) {
                                defered.resolve(data);
                            })
                            .error(function(data, status) {
                                defered.reject(data, status);
                            });

                    return promise;
                };

                this.validarCuit = function(cuit) {
                    //defered = diferido (asincrono)
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.get(wsFactory.url + '/datos.usuario/cuit/' + cuit)
                            .success(function(data) {
                                defered.resolve(data);
                            })
                            .error(function(data, status) {
                                defered.reject(data, status);
                            });

                    return promise;
                };

                this.registrar = function(razonSocial, cuit, clave, mailLogin) {
                    //defered = diferido (asincrono)
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.post(wsFactory.url + '/datos.usuario/registrar', {razonSocial: razonSocial, cuit: cuit, clave: clave, mailLogin: mailLogin})
                            .success(function(data) {
                                defered.resolve(data);
                            })
                            .error(function(data, status) {
                                defered.reject(data, status);
                            });

                    return promise;
                };

            }])

        .service('productoService', ['$http', '$q', 'wsFactory', function($http, $q, wsFactory) {
                this.buscarFiltrarProductos = function(textoBuscado, idEmpresa, idProvincia, idRubro, precioMin, precioMax, pagIni, pagTam) {
                    //defered = diferido (asincrono)
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.get(wsFactory.url + '/datos.producto/buscar/' + textoBuscado + '/' + idEmpresa + '/' + idProvincia + '/' + idRubro + '/' + precioMin + '/' + precioMax + '/' + pagIni + '/' + pagTam)
                            .success(function(data) {
                                defered.resolve(data);
                            })
                            .error(function(data, status) {
                                defered.reject(data, status);
                            });

                    return promise;
                };

                this.buscarFiltroDisponible = function(textoBuscado, idEmpresa, idProvincia, idRubro, precioMin, precioMax, opcion, pagIni, pagTam) {
                    //defered = diferido (asincrono)
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.get(wsFactory.url + '/datos.producto/disponibles/' + textoBuscado + '/' + idEmpresa + '/' + idProvincia + '/' + idRubro + '/' + precioMin + '/' + precioMax + '/' + opcion + '/' + pagIni + '/' + pagTam)
                            .success(function(data) {
                                defered.resolve(data);
                            })
                            .error(function(data, status) {
                                defered.reject(data, status);
                            });

                    return promise;
                };

            }])

        .service('pedidoService', ['$http', '$q', 'wsFactory', function($http, $q, wsFactory) {

                this.registrar = function(idProducto, cant, idSucOrigen, idSucDestino) {
                    //defered = diferido (asincrono)
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.post(wsFactory.url + '/datos.pedido/registrar', {idProducto: idProducto, cant: cant, idSucOrigen: idSucOrigen, idSucDestino: idSucDestino})
                            .success(function(data) {
                                defered.resolve(data);
                            })
                            .error(function(data, status) {
                                defered.reject(data, status);
                            });

                    return promise;
                };
                
                this.sucursalesParaPedido = function(idSucursal, esParaPedRealizados) {
                    //defered = diferido (asincrono)
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.get(wsFactory.url + '/datos.pedido/sucursales/' + idSucursal + '/' + esParaPedRealizados)
                            .success(function(data) {
                                defered.resolve(data);
                            })
                            .error(function(data, status) {
                                defered.reject(data, status);
                            });

                    return promise;
                };
                
                this.buscarPedidos = function(idSucursalOrigen, idSucursalDestino, fechaDesde, fechaHasta, esParaPedRealizados) {
                    //defered = diferido (asincrono)
                    var defered = $q.defer();
                    var promise = defered.promise;

                    $http.get(wsFactory.url + '/datos.pedido/buscar/' + idSucursalOrigen + '/' + idSucursalDestino + '/' + fechaDesde + '/' + fechaHasta + '/' + esParaPedRealizados)
                            .success(function(data) {
                                defered.resolve(data);
                            })
                            .error(function(data, status) {
                                defered.reject(data, status);
                            });

                    return promise;
                };

            }]);




;