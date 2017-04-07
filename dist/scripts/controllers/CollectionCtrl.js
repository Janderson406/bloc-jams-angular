 (function() {
     function CollectionCtrl() {
        this.albums = [];
        for (var i=0; i < 12; i++) {
            this.albums.push(angular.copy(albumPicasso)); //angular.copy creates a deep copy of source, which should be an object or an array.
        }                                                 //we use angular.copy to make copies of albumPicasso and push them to the array.
     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', CollectionCtrl);
 })();