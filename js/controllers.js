angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http, $ionicModal) {
  $scope.quiela_visible=false;
  $scope.vs_solicitar_quiniela=true;
  $scope.form_pagar = false;
  $scope.form_loto = true;
  $scope.btn_pagar = false;

  loading(true);

//https://serverloto.000webhostapp.com/webservise/quiniela.php
  $http.get('https://serverloto.000webhostapp.com/webservise/quiniela.php').success(function(data) {

    if(!localStorage.getItem("fecha")){
      localStorage.setItem("fecha", data[0].fecha);
      localStorage.setItem("quiniela", data[0].quiniela);
      localStorage.setItem("quiniela_solicitada", false);
      $scope.quiniela = localStorage.getItem("quiniela");
      $scope.quiela_visible=false;
      $scope.vs_solicitar_quiniela=true;
    }else{
      if(data[0].fecha!=localStorage.getItem("fecha")){
        localStorage.setItem("quiniela", data[0].quiniela);
        localStorage.setItem("fecha", data[0].fecha);
        localStorage.removeItem("quiniela_solicitada");
        localStorage.setItem("quiniela_solicitada", false);
        $scope.quiniela = localStorage.getItem("quiniela");
        $scope.quiela_visible=false;
        $scope.vs_solicitar_quiniela=true;
      }
        else if(data[0].fecha==localStorage.getItem("fecha") && Boolean(localStorage.getItem("quiniela_solicitada"))==true){
          $scope.quiniela = localStorage.getItem("quiniela");
          $scope.quiela_visible=true;
          $scope.vs_solicitar_quiniela=false;
          $scope.btn_pagar = true;
      }
    }

  }).error(function(){
    alert("Error de Conexión");
    $scope.quiniela = localStorage.getItem("quiniela");
    $scope.quiela_visible=true;
    $scope.vs_solicitar_quiniela=false;
    $scope.btn_pagar = true;
    loading(false);
});

//------------------------------------------------------------------------------

$scope.parle_visible=false;
$scope.vs_solicitar_parle=true;
//https://serverloto.000webhostapp.com/webservise/parle.php
$http.get('https://serverloto.000webhostapp.com/webservise/parle.php').success(function(data) {
  
      if(!localStorage.getItem("fecha_parle")){
        localStorage.setItem("fecha_parle", data[0].fecha);
        localStorage.setItem("parle", data[0].parle);
        localStorage.setItem("parle_solicitado", false);
        $scope.parle = localStorage.getItem("parle");
        $scope.parle_visible=false;
        $scope.vs_solicitar_parle=true;
      }else{
        if(data[0].fecha!=localStorage.getItem("fecha_parle")){
          localStorage.setItem("parle", data[0].parle);
          localStorage.setItem("fecha_parle", data[0].fecha);
          localStorage.removeItem("parle_solicitado");
          localStorage.setItem("parle_solicitado", false);
          $scope.parle = localStorage.getItem("parle");
          $scope.parle_visible=false;
          $scope.vs_solicitar_parle=true;
        }
          else if(data[0].fecha==localStorage.getItem("fecha_parle") && Boolean(localStorage.getItem("parle_solicitado"))==true){
            $scope.parle = localStorage.getItem("parle");
            $scope.parle_visible=true;
            $scope.vs_solicitar_parle=false;
            $scope.btn_pagar = true;
        }
      }
    }).error(function(){
      loading(false);
      $scope.parle = localStorage.getItem("parle");
      $scope.parle_visible=true;
      $scope.vs_solicitar_parle=false;
  });

  //------------------------------------------------------------------------------

$scope.tripleta_visible=false;
$scope.vs_solicitar_tripleta=true;
//https://serverloto.000webhostapp.com/webservise/parle.php
$http.get('https://serverloto.000webhostapp.com/webservise/tripleta.php').success(function(data) {
  
      if(!localStorage.getItem("fecha_tripleta")){
        localStorage.setItem("fecha_tripleta", data[0].fecha);
        localStorage.setItem("tripleta", data[0].tripleta);
        localStorage.setItem("tripleta_solicitado", false);
        $scope.tripleta = localStorage.getItem("tripleta");
        $scope.tripleta_visible=false;
        $scope.vs_solicitar_tripleta=true;
      }else{
        if(data[0].fecha!=localStorage.getItem("fecha_tripleta")){
          localStorage.setItem("tripleta", data[0].tripleta);
          localStorage.setItem("fecha_tripleta", data[0].fecha);
          localStorage.removeItem("tripleta_solicitado");
          localStorage.setItem("tripleta_solicitado", false);
          $scope.tripleta = localStorage.getItem("tripleta");
          $scope.tripleta_visible=false;
          $scope.vs_solicitar_tripleta=true;
        }
          else if(data[0].fecha==localStorage.getItem("fecha_tripleta") && Boolean(localStorage.getItem("tripleta_solicitado"))==true){
            $scope.tripleta = localStorage.getItem("tripleta");
            $scope.tripleta_visible=true;
            $scope.vs_solicitar_tripleta=false;
            $scope.btn_pagar = true;
        }
      }  
      loading(false);
    }).error(function(){
      loading(false);
      $scope.tripleta = localStorage.getItem("tripleta");
      $scope.tripleta_visible=true;
      $scope.vs_solicitar_tripleta=false;
  });


    //------------------------------------------------------------------------------

$scope.pega_cuatro_visible=false;
$scope.vs_solicitar_pega_cuatro=true;

$http.get('https://serverloto.000webhostapp.com/webservise/pega_cuatro.php').success(function(data) {
  
      if(!localStorage.getItem("fecha_pega_cuatro")){
        localStorage.setItem("fecha_pega_cuatro", data[0].fecha);
        localStorage.setItem("pega_cuatro", data[0].pega_cuatro);
        localStorage.setItem("pega_cuatro_solicitado", false);
        $scope.pega_cuatro = localStorage.getItem("pega_cuatro");
        $scope.pega_cuatro_visible=false;
        $scope.vs_solicitar_pega_cuatro=true;
      }else{
        if(data[0].fecha!=localStorage.getItem("fecha_pega_cuatro")){
          localStorage.setItem("pega_cuatro", data[0].pega_cuatro);
          localStorage.setItem("fecha_pega_cuatro", data[0].fecha);
          localStorage.removeItem("pega_cuatro_solicitado");
          localStorage.setItem("pega_cuatro_solicitado", false);
          $scope.pega_cuatro = localStorage.getItem("pega_cuatro");
          $scope.pega_cuatro_visible=false;
          $scope.vs_solicitar_pega_cuatro=true;
        }
          else if(data[0].fecha==localStorage.getItem("fecha_pega_cuatro") && Boolean(localStorage.getItem("pega_cuatro_solicitado"))==true){
            $scope.pega_cuatro = localStorage.getItem("pega_cuatro");
            $scope.pega_cuatro_visible=true;
            $scope.vs_solicitar_pega_cuatro=false;
            $scope.btn_pagar = true;
        }
      }  
      loading(false);
    }).error(function(){
      loading(false);
      $scope.pega_cuatro = localStorage.getItem("pega_cuatro");
      $scope.pega_cuatro_visible=true;
      $scope.vs_solicitar_pega_cuatro=false;
  });



      //------------------------------------------------------------------------------

$scope.loto_visible=false;
$scope.vs_solicitar_loto=true;

$http.get('https://serverloto.000webhostapp.com/webservise/loto.php').success(function(data) {
  
      if(!localStorage.getItem("fecha_loto")){
        localStorage.setItem("fecha_loto", data[0].fecha);
        localStorage.setItem("loto", data[0].loto);
        localStorage.setItem("loto_solicitado", false);
        $scope.loto = localStorage.getItem("loto");
        $scope.loto_visible=false;
        $scope.vs_solicitar_loto=true;
      }else{
        if(data[0].fecha!=localStorage.getItem("fecha_loto")){
          localStorage.setItem("loto", data[0].loto);
          localStorage.setItem("fecha_loto", data[0].fecha);
          localStorage.removeItem("loto_solicitado");
          localStorage.setItem("loto_solicitado", false);
          $scope.loto = localStorage.getItem("loto");
          $scope.loto_visible=false;
          $scope.vs_solicitar_loto=true;
        }
          else if(data[0].fecha==localStorage.getItem("fecha_loto") && Boolean(localStorage.getItem("loto_solicitado"))==true){
            $scope.loto = localStorage.getItem("loto");
            $scope.loto_visible=true;
            $scope.vs_solicitar_loto=false;
            $scope.btn_pagar = true;
        }
      }  
      loading(false);
    }).error(function(){
      loading(false);
      $scope.loto = localStorage.getItem("loto");
      $scope.loto_visible=true;
      $scope.vs_solicitar_loto=false;
  });

/*  $scope.guardar_correo = function(){
    
    console.log($scope.correo)
    if($scope.correo != '' && $scope.correo != undefined){
    localStorage.setItem("correo_paypal", $scope.correo);
    $scope.correo_guardo = false;
    $scope.btn_pagar = false;
    } 
  }*/

 $scope.pagar = function(){
  interstitial();
    localStorage.setItem("quiniela_solicitada", true);
    $scope.quiela_visible=true;
    $scope.vs_solicitar_quiniela=false;
    localStorage.setItem("parle_solicitado", true);
    $scope.parle_visible=true;
    $scope.vs_solicitar_parle=false;
    localStorage.setItem("tripleta_solicitado", true);
    $scope.tripleta_visible=true;
    $scope.vs_solicitar_tripleta=false;
    localStorage.setItem("pega_cuatro_solicitado", true);
    $scope.pega_cuatro_visible=true;
    $scope.vs_solicitar_pega_cuatro=false;
    localStorage.setItem("loto_solicitado", true);
    $scope.loto_visible=true;
    $scope.vs_solicitar_loto=false;
    $scope.btn_pagar = true;
  }

/*  $scope.mostrar_pagar = function(){
    $scope.form_pagar = true;
    $scope.form_loto = false;
  }

  $scope.mostrar_quiniela = function(){
    $scope.form_pagar = false;
    $scope.form_loto = true;
  }*/

 /* document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    $scope.codigo = device.uuid;
    alert($scope.codigo);

    $http.post('https://serverloto.000webhostapp.com/webservise/paypal/verificar_pago.php',
    {invoice: $scope.codigo})
    .success(function(){
      $http.get('https://serverloto.000webhostapp.com/webservise/paypal/verificar_pago.php').success(function(data) {
        console.log(data[0].invoice);
        if(data[0].invoice){
          localStorage.setItem("quiniela_solicitada", true);
          $scope.quiela_visible=true;
          $scope.vs_solicitar_quiniela=false;
          localStorage.setItem("parle_solicitado", true);
          $scope.parle_visible=true;
          $scope.vs_solicitar_parle=false;
          localStorage.setItem("tripleta_solicitado", true);
          $scope.tripleta_visible=true;
          $scope.vs_solicitar_tripleta=false;
          localStorage.setItem("pega_cuatro_solicitado", true);
          $scope.pega_cuatro_visible=true;
          $scope.vs_solicitar_pega_cuatro=false;
          localStorage.setItem("loto_solicitado", true);
          $scope.loto_visible=true;
          $scope.vs_solicitar_loto=false;
          $scope.btn_pagar = true;
        }
      })
    })
  }


  Stripe.setPublishableKey('pk_test_AXyWHRZf5jOiAOMnpRZdZmCD');
  $scope.saveCustomer = function(status, response) {
    if(response.id != undefined){
      loading(true);
    $http.post('https://serverloto.000webhostapp.com/webservise/stripe/stripe_pay_demo.php',
    {stripeToken: response.id})
    .success(function(){
			$scope.form_pagar = false;
      $scope.form_loto = true;
      $scope.pagar();
      loading(false);
    })
  }else {
    $scope.sms_error = response.error.message;
  }
  };*/

})
.controller('PlaylistCtrl', function($scope, $stateParams) {
  
});
