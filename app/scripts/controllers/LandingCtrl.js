 (function() {
     function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";         
     }
 
     angular
         .module('blocJams') //2nd module arg [dependencies] already defined in app.js
         .controller('LandingCtrl', LandingCtrl); //named the controller LandingCtrl – the first argument, capitalized bc it is a constructor
                                                  //second arg is the callback function that executes when the controller is initialized.
                                                  // ^ (like config in app.js)
     
     
 })();