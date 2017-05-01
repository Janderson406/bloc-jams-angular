 (function() {
   function seekBar($document) {  // $document must be injected as a dependency for us to use it

     // Calculates the horizontal percent along the seek bar where the event (passed in from the view as  $event) occurred.
     var calculatePercent = function(seekBar, event) {
       var offsetX = event.pageX - seekBar.offset().left;
       var seekBarWidth = seekBar.width();
       var offsetXPercent = offsetX / seekBarWidth;
       offsetXPercent = Math.max(0, offsetXPercent);
       offsetXPercent = Math.min(1, offsetXPercent);
       return offsetXPercent;
     };

     return {
       templateUrl: '/templates/directives/seek_bar.html',
       replace: true,
       //If true, the template replaces the directive's element. If false, the template replaces the contents of the directive's element
       restrict: 'E',
       // instructs Angular to treat this directive as an element. For example, Angular will run the code if it finds <seek-bar> in the HTML,
       // but *not* if it finds  <div seek-bar>
       scope: {},
       link: function(scope, element, attributes) {
         // scope	Specifies that a new scope be created for the directive. ensures that a new isolate scope will exist solely for the directive
         // link Responsible for registering DOM listeners and updating the DOM. This is where we put most of the directive logic.
         scope.value = 0; //Holds the value of the seek bar, such as the currently playing song time or the current volume.
         scope.max = 100; //Holds the maximum value of the song and volume seek bars. Default value is 100.

         var seekBar = $(element); //Holds the element that matches the directive (<seek-bar>) as a jQuery object so we can call jQuery methods on it

         var percentString = function() { // calculates a percent based on the value and maximum value of a seek bar
           var value = scope.value;
           var max = scope.max;
           var percent = value / max * 100;
           return percent + "%";
         };

         scope.fillStyle = function() { //	Returns the width of the seek bar fill element based on the calculated percent
           return {
             width: percentString()
           };
         };

         scope.thumbStyle = function() { // change position of the seek bar thumb.
           return {
             left: percentString()
           };
         };

         // Update the seek bar value based on the seek bar's width and the location of the user's click on the seek bar
         scope.onClickSeekBar = function(event) {
           var percent = calculatePercent(seekBar, event);
           scope.value = percent * scope.max;
         };

         //Update the Seek Bar from a Mousedown Event
         scope.trackThumb = function() { //Similar to scope.onClickSeekBar, but uses $apply to constantly apply the change in value of  scope.value as the user drags the seek bar thumb
           $document.bind('mousemove.thumb', function(event) {
             var percent = calculatePercent(seekBar, event);
             scope.$apply(function() {
               scope.value = percent * scope.max;
             });
           });

           $document.bind('mouseup.thumb', function() {
             $document.unbind('mousemove.thumb');
             $document.unbind('mouseup.thumb');
           });
         };

       }
     };
   }

   angular
     .module('blocJams')
     .directive('seekBar', ['$document', seekBar]);
 })();
