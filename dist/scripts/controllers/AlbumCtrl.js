 (function() {
     function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum(); //AlbumCtrl uses Fixtures's getAlbum() method to get the albumPicasso object
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]); //add Fixtures to AlbumCtrl's array of dependencies
 })();
