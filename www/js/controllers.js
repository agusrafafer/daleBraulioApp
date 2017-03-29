angular.module('app.controllers', [])

        .controller('usuarioCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$ionicLoading', '$ionicSideMenuDelegate', '$ionicHistory', 'usuarioService', 'usuarioFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
            function($scope, $stateParams, $state, $ionicPopup, $ionicLoading, $ionicSideMenuDelegate, $ionicHistory, usuarioService, usuarioFactory) {
                $scope.usuario = {
                    usuario: "",
                    cuit: "",
                    razonSoc: "",
                    mailLogin: "",
                    clave: "",
                    confirmClave: "",
                    login: ""
                };


                $scope.login = function(nombreUsuario, password) {

                    $ionicLoading.show({
                        template: '<ion-spinner icon=\"android\" class=\"spinner-energized\"></ion-spinner>'
                    });
                    usuarioService.validarLogin(nombreUsuario, password)
                            .then(function(data) {
                                $ionicLoading.hide();
                                var respuesta = data.respuesta;
                                if (respuesta === 'OK') {
                                    usuarioFactory.usuario.usuario = data.contenido;
                                    $scope.usuario = usuarioFactory.usuario;
                                    $ionicHistory.nextViewOptions({
                                        disableBack: true
                                    });
                                    $state.go('menu.daleBraulio', {}, {location: "replace"});
                                } else {
                                    $scope.usuario = {
                                        usuario: "",
                                        cuit: "",
                                        razonSoc: "",
                                        mailLogin: "",
                                        clave: "",
                                        confirmClave: "",
                                        login: ""
                                    };
                                    usuarioFactory.usuario = {
                                        usuario: "",
                                        cuit: "",
                                        razonSoc: "",
                                        mailLogin: "",
                                        clave: "",
                                        confirmClave: "",
                                        login: ""
                                    };

                                    $ionicPopup.alert({
                                        title: 'Info',
                                        template: 'Usuario o clave incorrecta'
                                    });

                                }
                            })
                            .catch(function(data, status) {
                                $ionicLoading.hide();
                                $scope.usuario = {
                                    usuario: "",
                                    cuit: "",
                                    razonSoc: "",
                                    mailLogin: "",
                                    clave: "",
                                    confirmClave: "",
                                    login: ""
                                };
                                usuarioFactory.usuario = {
                                    usuario: "",
                                    cuit: "",
                                    razonSoc: "",
                                    mailLogin: "",
                                    clave: "",
                                    confirmClave: "",
                                    login: ""
                                };
                                $ionicPopup.alert({
                                    title: 'Info',
                                    template: 'Usuario o clave incorrecta'
                                });
                            });

                };

                $scope.validarCuit = function(cuit) {
                    if (typeof (cuit) !== "undefined" && cuit !== '') {
                        $ionicLoading.show({
                            template: '<ion-spinner icon=\"android\" class=\"spinner-energized\"></ion-spinner>'
                        });
                        usuarioService.validarCuit(cuit)
                                .then(function(data) {
                                    $ionicLoading.hide();
                                    var respuesta = data.respuesta;
                                    if (respuesta === 'OK') {
                                        $scope.usuario.razonSoc = data.contenido;
                                    } else {
                                        $scope.usuario = {
                                            usuario: "",
                                            cuit: "",
                                            razonSoc: "",
                                            mailLogin: "",
                                            clave: "",
                                            confirmClave: "",
                                            login: ""
                                        };
                                        usuarioFactory.usuario = {
                                            usuario: "",
                                            cuit: "",
                                            razonSoc: "",
                                            mailLogin: "",
                                            clave: "",
                                            confirmClave: "",
                                            login: ""
                                        };
                                        $ionicPopup.alert({
                                            title: 'Info',
                                            template: data.contenido
                                        });

                                    }
                                })
                                .catch(function(data, status) {
                                    $ionicLoading.hide();
                                    $scope.usuario = {
                                        usuario: "",
                                        cuit: "",
                                        razonSoc: "",
                                        mailLogin: "",
                                        clave: "",
                                        confirmClave: "",
                                        login: ""
                                    };
                                    usuarioFactory.usuario = {
                                        usuario: "",
                                        cuit: "",
                                        razonSoc: "",
                                        mailLogin: "",
                                        clave: "",
                                        confirmClave: "",
                                        login: ""
                                    };
                                    $ionicPopup.alert({
                                        title: 'Info',
                                        template: 'En este momento su CUIT no pudo ser procesado, por favor envie una solicitud de registro a dalebraulio@aguramail.com.ar \n Gracias!'
                                    });
                                });
                    }
                };


                $scope.isLogueado = function() {
                    if (typeof (usuarioFactory.usuario.usuario) === "undefined")
                        return false;
                    if (usuarioFactory.usuario.usuario === "") {
                        return false;
                    }
                    return true;
                };

                $scope.logout = function() {
                    $ionicSideMenuDelegate.toggleLeft();
                    var msjSalida = $scope.isLogueado() ? '¿Seguro desea salir y cerrar su sesi&oacute;n?' : '¿Seguro desea salir?';

                    var rdoClick = $ionicPopup.show({
                        title: 'Info',
                        template: msjSalida,
                        scope: $scope,
                        buttons: [{text: 'Si',
                                type: 'button-positive',
                                onTap: function(e) {
                                    return true;
                                }
                            },
                            {text: 'No',
                                onTap: function(e) {
                                    return false;
                                }
                            }]

                    });
                    rdoClick.then(function(res) {
                        if (res) {
                            usuarioFactory.usuario = {
                                usuario: "",
                                cuit: "",
                                razonSoc: "",
                                mailLogin: "",
                                clave: "",
                                confirmClave: "",
                                login: ""
                            };
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('menu.daleBraulio', {}, {location: "replace"});
                            ionic.Platform.exitApp();
                        }
                    });

                };

                $scope.registrar = function(razonSocial, cuit, clave, confirmClave, mailLogin) {
                    clave = (typeof (clave) === "undefined") ? '' : clave;
                    confirmClave = (typeof (confirmClave) === "undefined") ? '' : confirmClave;
                    if (clave === confirmClave) {
                        razonSocial = (typeof (razonSocial) === "undefined") ? '' : razonSocial;
                        cuit = (typeof (cuit) === "undefined") ? '' : cuit;
                        mailLogin = (typeof (mailLogin) === "undefined") ? '' : mailLogin;

                        if (clave === '' || confirmClave === '' || razonSocial === '' || mailLogin === '' || cuit === '') {
                            $ionicPopup.alert({
                                title: 'Info',
                                template: '<strong style=\"color: #ff3333\">Todos los campos son requeridos!</strong>'
                            });
                            return;
                        }
                        $ionicLoading.show({
                            template: '<ion-spinner icon=\"android\" class=\"spinner-energized\"></ion-spinner>'
                        });
                        usuarioService.registrar(razonSocial, cuit, clave, mailLogin)
                                .then(function(data) {
                                    $ionicLoading.hide();
                                    var respuesta = data.respuesta;
                                    var contenido = data.contenido;
                                    if (respuesta === 'OK') {
                                        if (parseInt(contenido) > -1) {
                                            //Muestro mensaje OK y Navego a la pagina de login
                                            $ionicPopup.alert({
                                                title: 'Info',
                                                template: 'La cuenta fue creada con exito.'
                                            }).then(function(res) {
                                                $state.go('menu.login');
                                            });
                                        } else {
                                            $ionicPopup.alert({
                                                title: 'Info',
                                                template: 'La cuenta no pudo ser creada porque ocurrio un error.'
                                            });
                                        }
                                    } else {
                                        $ionicPopup.alert({
                                            title: 'Info',
                                            template: contenido
                                        });
                                    }
                                })
                                .catch(function(data, status) {
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: 'Info',
                                        template: 'La cuenta no pudo ser creada porque ocurrio un error.'
                                    });
                                });
                    } else {
                        $ionicPopup.alert({
                            title: 'Info',
                            template: 'La clave y su confirmación deben ser iguales.'
                        });
                    }

                };





            }])

        .controller('productoCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$ionicModal', '$ionicLoading', '$filter', 'productoFactory', 'usuarioFactory', 'pedidoFactory', 'productoService', 'pedidoService', 'ionicDatePicker',
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
            function($scope, $stateParams, $state, $ionicPopup, $ionicModal, $ionicLoading, $filter, productoFactory, usuarioFactory, pedidoFactory, productoService, pedidoService, ionicDatePicker) {

                $scope.producto = {textoBuscado: ""};
                $scope.paginado = {pagIni: 0,
                    pagTam: 10};
                $scope.pedido = {cant: 0,
                    idProducto: -1,
                    idSucOrigen: -1,
                    idSucDestino: -1
                };


                $scope.buscar = function() {
                    if ($scope.producto.textoBuscado === '' || $scope.producto.textoBuscado.length < 2) {
                        $ionicPopup.alert({
                            title: 'Info',
                            template: '<strong style=\"color: #ff3333\">Debes ingresar lo que deseas buscar!</strong>'
                        });
                        return;
                    }

                    productoFactory.textoBuscado = $scope.producto.textoBuscado;

                    var idUsuario = (usuarioFactory.usuario.usuario) === '' ? '-1' : usuarioFactory.usuario.usuario.idUsuario;

                    $scope.pagIni = 0;
                    $scope.pagTam = 10;
                    productoFactory.filtros.empresa = -1;
                    productoFactory.filtros.rubro = -1;
                    productoFactory.filtros.provincia = -1;
                    productoFactory.filtros.ceil = -1;

                    buscar(productoFactory.textoBuscado, -1, -1, -1, -1, -1);



                };

                $scope.verMasProductosEmpresa = function() {
                    //Modificar este método para que traiga los demas productos de la empresa de manera 
                    //correcta. Debo hacer un ws que traiga los productos por idEmpresa menos el que estoy viendo

                    buscar(-1, productoFactory.seleccionado.idEmpresa.idEmpresa, -1, -1, -1, -1);
                };

                function buscar(textoBuscado, idEmpresa, idProvincia, idRubro, precioMin, precioMax) {
                    $ionicLoading.show({
                        template: '<ion-spinner icon=\"android\" class=\"spinner-energized\"></ion-spinner>'
                    });

                    productoService.buscarFiltrarProductos(textoBuscado, idEmpresa, idProvincia, idRubro, precioMin, precioMax, $scope.paginado.pagIni, $scope.paginado.pagTam)
                            .then(function(data) {
                                productoFactory.items = data.contenido;
                                $scope.verBuscar = false;
                                $ionicLoading.hide();
                                $state.go('menu.resultados');
                            })
                            .catch(function(data, status) {
                                productoFactory.items = [];
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Info',
                                    template: '<strong style=\"color: #ff3333\">Operación denegada</strong>'
                                });
                            });
                }
                ;

                $scope.verFiltrosDisponibles = function() {
                    $scope.calcularRangoPrecios();
                    $state.go('menu.opcionFiltros');
                };

                $scope.buscarFiltrosDisponibles = function(opcion) {
                    $ionicLoading.show({
                        template: '<ion-spinner icon=\"android\" class=\"spinner-energized\"></ion-spinner>'
                    });

                    var idEmpresa = productoFactory.filtros.empresa !== -1 ? productoFactory.filtros.empresa.idEmpresa : -1;
                    var idProvincia = productoFactory.filtros.provincia !== -1 ? productoFactory.filtros.provincia.idProvincia : -1;
                    var idRubro = productoFactory.filtros.rubro !== -1 ? productoFactory.filtros.rubro.idRubro : -1;
                    var precioMin = productoFactory.filtros.ceil !== -1 ? productoFactory.filtros.precioMin : -1;
                    var precioMax = productoFactory.filtros.ceil !== -1 ? productoFactory.filtros.precioMax : -1;
                    var textBusc = productoFactory.textoBuscado !== '' ? productoFactory.textoBuscado : -1;

                    productoService.buscarFiltroDisponible(textBusc, idEmpresa, idProvincia, idRubro, precioMin, precioMax, opcion, $scope.paginado.pagIni, $scope.paginado.pagTam)
                            .then(function(data) {
                                productoFactory.filtros.items = data.contenido;
                                $ionicLoading.hide();
                                $state.go('menu.filtros');
                            })
                            .catch(function(data, status) {
                                productoFactory.filtros = [];
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Info',
                                    template: '<strong style=\"color: #ff3333\">Operación denegada</strong>'
                                });
                            });
                };

                $scope.elegirFiltro = function(index, opcion) {
                    switch (opcion) {
                        case 'empresa':
                            if (index !== -1) {
                                productoFactory.filtros.empresa = productoFactory.filtros.items[index].empresa;
                            } else {
                                productoFactory.filtros.empresa = index;
                            }
                            break;
                        case 'ubicacion':
                            if (index !== -1) {
                                productoFactory.filtros.provincia = productoFactory.filtros.items[index].provincia;
                            } else {
                                productoFactory.filtros.provincia = index;
                            }
                            break;
                        case 'rubro':
                            if (index !== -1) {
                                productoFactory.filtros.rubro = productoFactory.filtros.items[index].rubro;
                            } else {
                                productoFactory.filtros.rubro = index;
                            }
                            break;
                    }
                    $state.go('menu.opcionFiltros');
                };

                $scope.aplicarFiltro = function() {
                    var idEmpresa = productoFactory.filtros.empresa !== -1 ? productoFactory.filtros.empresa.idEmpresa : -1;
                    var idProvincia = productoFactory.filtros.provincia !== -1 ? productoFactory.filtros.provincia.idProvincia : -1;
                    var idRubro = productoFactory.filtros.rubro !== -1 ? productoFactory.filtros.rubro.idRubro : -1;
                    var precioMin = productoFactory.filtros.ceil !== -1 ? productoFactory.filtros.precioMin : -1;
                    var precioMax = productoFactory.filtros.ceil !== -1 ? productoFactory.filtros.precioMax : -1;


                    buscar(productoFactory.textoBuscado, idEmpresa, idProvincia, idRubro, precioMin, precioMax);
                };

                $scope.cancelarFiltro = function() {
                    productoFactory.filtros.empresa = -1;
                    productoFactory.filtros.rubro = -1;
                    productoFactory.filtros.provincia = -1;
                    productoFactory.filtros.ceil = -1;
                    buscar(productoFactory.textoBuscado, -1, -1, -1, -1, -1);
                };

                $scope.calcularRangoPrecios = function() {
                    if (productoFactory.filtros.ceil === -1) {
                        var menor = Number.POSITIVE_INFINITY;
                        var mayor = Number.NEGATIVE_INFINITY;
                        var tmp;
                        for (var i = productoFactory.items.length - 1; i >= 0; i--) {
                            tmp = productoFactory.items[i].precio;
                            if (tmp < menor)
                                menor = tmp;
                            if (tmp > mayor)
                                mayor = tmp;
                        }
                        productoFactory.filtros.ceil = mayor;
                        productoFactory.filtros.floor = menor;
                        productoFactory.filtros.precioMin = productoFactory.filtros.floor;
                        productoFactory.filtros.precioMax = productoFactory.filtros.ceil;
                    }
                };

                $scope.sliderPrecioFiltro = {
                    minValue: productoFactory.filtros.precioMin,
                    maxValue: productoFactory.filtros.precioMax,
                    options: {
                        floor: productoFactory.filtros.floor,
                        ceil: productoFactory.filtros.ceil,
                        translate: function(value, sliderId, label) {
                            switch (label) {
                                case 'model':
                                    productoFactory.filtros.precioMin = value;
                                    return '<b>$' + value + '</b>';
                                case 'high':
                                    productoFactory.filtros.precioMax = value;
                                    return '<b>$' + value + '</b>';
                                default:
                                    return '$' + value
                            }
                        },
                        hideLimitLabels: false
                    }
                };

                $scope.getFiltros = function() {
                    return productoFactory.filtros;
                };

                $scope.getProductos = function() {
                    return productoFactory.items;
                };

                $scope.getImagenProducto = function(url, idEmpresa) {
                    var imgSrc = 'http://www.dalebraulio.com.ar/home/f/javax.faces.resource/loguito.png?ln=img';
                    if (url !== null) {
                        imgSrc = 'http://www.dalebraulio.com.ar/home/f/javax.faces.resource/' + url + '?ln=fotosProductos/' + idEmpresa;
                    }
                    return imgSrc;
                };

                $scope.getThumbnailProducto = function(url, idEmpresa) {
                    var imgSrc = 'http://www.dalebraulio.com.ar/home/f/javax.faces.resource/loguito.png?ln=img';
                    if (url !== null) {
                        imgSrc = 'http://www.dalebraulio.com.ar/home/f/javax.faces.resource/' + url + '?ln=fotosProductos/thumbnails/' + idEmpresa;
                    }
                    return imgSrc;
                };

                $scope.mostrarDetalle = function(index) {
                    productoFactory.seleccionado = productoFactory.items[index];
                    $state.go('menu.producto');
                };

                $scope.getProductoFactory = function() {
                    return productoFactory;
                };

                $scope.mostrarDescripcion = function() {
                    $state.go('menu.descripcion');
                };

                $scope.solicitarCantProd = function(index) {
                    if (index > -1) {
                        productoFactory.seleccionado = productoFactory.items[index];
                    }

                    var rdoClick = $ionicPopup.show({
                        title: productoFactory.seleccionado.nombre,
                        template: '<input type="text" ng-model="pedido.cant" ui-mask="?9?9?9"> ',
                        subTitle: productoFactory.seleccionado.idUnidadMedida.nombre,
                        scope: $scope,
                        buttons: [{text: 'Pedir',
                                type: 'button-positive',
                                onTap: function(e) {
                                    return true;
                                }
                            },
                            {text: 'Cancelar',
                                onTap: function(e) {
                                    return false;
                                }
                            }]

                    });
                    rdoClick.then(function(res) {
                        $ionicLoading.show({
                            template: '<ion-spinner icon=\"android\" class=\"spinner-energized\"></ion-spinner>'
                        });
                        if (res && $scope.pedido.cant > 0) {
                            $scope.pedido.idProducto = productoFactory.seleccionado.idProducto;
                            $scope.pedido.idSucOrigen = usuarioFactory.usuario.usuario.idSucursal.idSucursal;
                            $scope.pedido.idSucDestino = productoFactory.seleccionado.idEmpresa.sucursalCollection[0].idSucursal;
                            pedidoService.registrar($scope.pedido.idProducto, $scope.pedido.cant, $scope.pedido.idSucOrigen, $scope.pedido.idSucDestino)
                                    .then(function(data) {
                                        $ionicLoading.hide();
                                        var rta = data.respuesta;
                                        var contenido = data.contenido;

                                        $ionicPopup.alert({
                                            title: 'Info',
                                            template: contenido
                                        });
                                        $scope.pedido = {cant: 0,
                                            idProducto: -1,
                                            idSucOrigen: -1,
                                            idSucDestino: -1
                                        };

                                    })
                                    .catch(function(data, status) {

                                        $ionicLoading.hide();
                                        $ionicPopup.alert({
                                            title: 'Info',
                                            template: 'El pedido no pudo ser procesado.'
                                        });
                                        $scope.pedido = {cant: 0,
                                            idProducto: -1,
                                            idSucOrigen: -1,
                                            idSucDestino: -1
                                        };
                                    });


                        } else {
                            $ionicLoading.hide();
                        }

                    });
                };


                $scope.verTiposFiltroPedidos = function(tipoFiltro) {
                    pedidoFactory.filtros.opcion = tipoFiltro;
                    var esParaPedRealizados = true;
                    if (pedidoFactory.filtros.opcion === 'Recibidos') {
                        esParaPedRealizados = false;
                    }
                    pedidoFactory.filtros.sucursal = "";

                    $ionicLoading.show({
                        template: '<ion-spinner icon=\"android\" class=\"spinner-energized\"></ion-spinner>'
                    });
                    var idSuc = usuarioFactory.usuario.usuario.idSucursal.idSucursal;
                    pedidoService.sucursalesParaPedido(idSuc, esParaPedRealizados)
                            .then(function(data) {
                                $ionicLoading.hide();
                                var rta = data.respuesta;
                                pedidoFactory.filtros.itemsSucursales = data.contenido;

                                $state.go('menu.opcionFiltrosPedidos');

                            })
                            .catch(function(data, status) {

                                $ionicLoading.hide();
                            });
                };

                $scope.getPedidoFactory = function() {
                    return pedidoFactory;
                };

                $scope.openDPFechaDesdeFiltroPed = function() {
                    var opcionesFechaDesde = {
                        callback: function(val) {
                            pedidoFactory.filtros.fechaDesde = new Date(val);
                        },
                        disabledDates: []
                    };
                    ionicDatePicker.openDatePicker(opcionesFechaDesde);
                };

                $scope.openDPFechaHastaFiltroPed = function() {
                    var opcionesFechaDesde = {
                        callback: function(val) {
                            pedidoFactory.filtros.fechaHasta = new Date(val);
                        },
                        disabledDates: []
                    };
                    ionicDatePicker.openDatePicker(opcionesFechaDesde);
                };

                $ionicModal.fromTemplateUrl('modalSeleccionSucursal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.modalSeleccionSucursal = modal;
                });

                $scope.abrirModalSeleccionSucursal = function() {
                    $scope.modalSeleccionSucursal.show();
                };

                $scope.cerrarModalSeleccionSucursal = function() {
                    $scope.modalSeleccionSucursal.hide();
                };

                $scope.seleccionarSucursal = function(index) {
                    pedidoFactory.filtros.sucursal = pedidoFactory.filtros.itemsSucursales[index];
                    $scope.modalSeleccionSucursal.hide();
                };

                $scope.aplicarFiltroPedidos = function() {
                    if (pedidoFactory.filtros.sucursal !== '' && pedidoFactory.filtros.fechaDesde !== -1 && pedidoFactory.filtros.fechaHasta !== -1) {
                        $ionicLoading.show({
                            template: '<ion-spinner icon=\"android\" class=\"spinner-energized\"></ion-spinner>'
                        });

                        var idSucOri = usuarioFactory.usuario.usuario.idSucursal.idSucursal;
                        var idSucDes = pedidoFactory.filtros.sucursal.idSucursal;
                        var esParaPedRealizados = true;
                        var fechaDesde = $filter('date')(pedidoFactory.filtros.fechaDesde, "dd-MM-yyyy");
                        var fechaHasta = $filter('date')(pedidoFactory.filtros.fechaHasta, "dd-MM-yyyy");
                        if (pedidoFactory.filtros.opcion === 'Recibidos') {
                            esParaPedRealizados = false;
                        }
                        pedidoService.buscarPedidos(idSucOri, idSucDes, fechaDesde, fechaHasta, esParaPedRealizados)
                                .then(function(data) {
                                    $ionicLoading.hide();
                                    var rta = data.respuesta;
                                    var cont = data.contenido;
                                    if (rta === 'OK') {
                                        pedidoFactory.filtros.itemsPedidos = cont;
                                        $state.go('menu.pedidos');
                                    } else {
                                        $ionicPopup.alert({
                                            title: 'Info',
                                            template: '<strong style=\"color: #ff3333\">' + cont + '</strong>'
                                        });
                                    }
                                })
                                .catch(function(data, status) {
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: 'Info',
                                        template: 'Los pedidos no pudieron ser obtenidos.'
                                    });
                                });
                    } else {
                        $ionicPopup.alert({
                            title: 'Info',
                            template: '<strong style=\"color: #ff3333\">Debe seleccionar todas las opciones.</strong>'
                        });
                    }
                };

                $ionicModal.fromTemplateUrl('modalVerDetallePedido.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.modalVerDetallePedido = modal;
                });

                $scope.abrirModalVerDetallePedido = function(index) {
                    $scope.detallesPedido = pedidoFactory.filtros.itemsPedidos[index].detallePedidoCollection;
                    $scope.codIdPedidoSel = pedidoFactory.filtros.itemsPedidos[index].idPedido;
                    $scope.modalVerDetallePedido.show();
                };

                $scope.cerrarModalVerDetallePedido = function() {
                    $scope.modalVerDetallePedido.hide();
                };

                $scope.isLogueado = function() {
                    if (typeof (usuarioFactory.usuario.usuario) === "undefined")
                        return false;
                    if (usuarioFactory.usuario.usuario === "") {
                        return false;
                    }
                    return true;
                };

            }])

        .controller('ubicacionCtrl', ['$scope', '$stateParams', '$timeout', 'productoFactory', 'usuarioFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
            function($scope, $stateParams, $timeout, productoFactory, usuarioFactory) {

                $scope.map;

                //Inicializacion mapa
                $timeout(function() {
                    var latlng = new google.maps.LatLng(productoFactory.seleccionado.idEmpresa.sucursalCollection[0].latitud, productoFactory.seleccionado.idEmpresa.sucursalCollection[0].longitud);
                    var opciones = {
                        zoom: 8,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: true,
                        mapTypeControl: false,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.LEFT_CENTER
                        },
                        scaleControl: true,
                        streetViewControl: true,
                        streetViewControlOptions: {
                            position: google.maps.ControlPosition.LEFT_BOTTOM
                        }
                    };
                    $scope.map = new google.maps.Map(document.getElementById("map"), opciones);
                    $scope.overlay = new google.maps.OverlayView();
                    $scope.overlay.draw = function() {
                    }; // empty function required
                    $scope.overlay.setMap($scope.map);
                    $scope.element = document.getElementById('map_canvas');
//        $scope.hammertime = Hammer($scope.element).on("hold", function(event) {
//            $scope.addOnClick(event);
//        });

                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: $scope.map,
                        title: 'Ubicacion de ' + productoFactory.seleccionado.nombre
                    });

                    if ($scope.isLogueado()) {
                        var msjDistancia = 'Los datos de tu ubicación no están actualizados.';
//                        if (usuarioFactory.usuario.latitud !== null) {
                        var destino = new google.maps.LatLng(productoFactory.seleccionado.idEmpresa.sucursalCollection[0].latitud, productoFactory.seleccionado.idEmpresa.sucursalCollection[0].longitud);
                        var origen = new google.maps.LatLng(usuarioFactory.usuario.usuario.idSucursal.latitud, usuarioFactory.usuario.usuario.idSucursal.longitud);
                        var distancia = google.maps.geometry.spherical.computeDistanceBetween(origen, destino);
                        distancia = Math.floor(distancia / 1000);
                        msjDistancia = 'Este producto se encuentra a <b>' + distancia + ' Km</b> aprox.';
//                        }
//
                        var infoWindow = new google.maps.InfoWindow({
                            content: "<div>Bº " + productoFactory.seleccionado.idEmpresa.sucursalCollection[0].barrio + ". [" + productoFactory.seleccionado.idEmpresa.sucursalCollection[0].calle + " " + productoFactory.seleccionado.idEmpresa.sucursalCollection[0].numeroCalle + "] <br> " + msjDistancia + "</div>"
                        });
                        infoWindow.open($scope.map, marker);
                    }

                }, 100);

                $scope.getProductoFactory = function() {
                    return productoFactory.seleccionada;
                };

                $scope.isLogueado = function() {
                    if (typeof (usuarioFactory.usuario.usuario) === "undefined")
                        return false;
                    if (usuarioFactory.usuario.usuario === "") {
                        return false;
                    }
                    return true;
                };



            }])

        .controller('filtrosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
            function($scope, $stateParams) {


            }]);
 