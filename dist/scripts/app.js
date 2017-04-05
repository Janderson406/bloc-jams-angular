 (function() {
     function config($stateProvider, $locationProvider) {
         $locationProvider
             .html5Mode({
                 enabled: true,     // setting the html5Mode method's enabled property to true, the hashbang URLs are disabled
                 requireBase: false // avoid a common $location error.
             }); 

         $stateProvider
             .state('landing', {
                 url: '/',
                 templateUrl: '/templates/landing.html'
             })
         // $stateProvider.state(stateName ,<- unique string that identifies a state , stateConfig <- object that defines specific properties of the state)
         // <ui-view> directive in the global file (index.html) will load the template associated with the landing state.
             .state('album', {
                 url: '/album',
                 templateUrl: '/templates/album.html'
             })     
            .state('collection', {
                 url: '/collection',
                 templateUrl: '/templates/collection.html'
             });     
     
     
     }
 
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();

//array = list of external modules that blocJams depends on, known as dependency injection
//To make sure the providers are accessible throughout the application, inject them using the config block on the application's root module.