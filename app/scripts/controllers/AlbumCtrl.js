 (function() {
     function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum(); //AlbumCtrl uses Fixtures's getAlbum() method to get the albumPicasso object
        this.songPlayer = SongPlayer; //property holds the S.P. service and makes the service accessible within the Album view
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]); //add Fixtures and SongPlayer to AlbumCtrl's array of dependencies
 })();

//To use the SongPlayer service, we need to decide where to inject it as a dependency.
//Since we'll play music from the Album view, inject the service into AlbumCtrl:
