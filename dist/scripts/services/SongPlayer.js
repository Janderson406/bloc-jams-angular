 (function() {
      function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();

  /**
  * @desc Buzz object audio file
  * @type {Object}
  */

         var currentBuzzObject = null;

  /**
  * @function setSong
  * @desc Stops currently playing song and loads new audio file as currentBuzzObject
  * @param {Object} song
  */

         var setSong = function(song) {
           if (currentBuzzObject) {
               stopSong(song);
           }
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
             });

             currentBuzzObject.bind('timeupdate', function() {   //creates a custom event that other parts of the Angular application can "listen" to.
                 $rootScope.$apply(function() {                 // To update the song's playback progress from anywhere - timeupdate is one of a number of HTML5 audio events we can use with Buzz's bind() method
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
             });

             SongPlayer.currentSong = song;
         };

         var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
         };

         var stopSong = function(song) {
               currentBuzzObject.stop();
               SongPlayer.currentSong.playing = null;
          };

         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };


         SongPlayer.currentSong = null;  //turn 'var currentSong' into a public attribute so that we can use it within PlayerBarCtrl

          /**
           * @desc Current playback time (in seconds) of currently playing song
           * @type {Number}
           */
        SongPlayer.currentTime = null;

         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             //song occurs when we call the methods from the Album view's song rows, and SongPlayer.currentSong occurs when we call the methods from the player bar
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                //  currentBuzzObject.play();
                //  song.playing = true;
                 playSong(song);
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                    //  currentBuzzObject.play();
                    playSong(song);
                     }
                 }
             };

         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 stopSong(song);
             } else {
               var song = currentAlbum.songs[currentSongIndex];
               setSong(song);
               playSong(song);
           }
         };

          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length - 1) {
                //set songs array back to index 0 if on last song
                var song = currentAlbum.songs[0];
                setSong(song);
                playSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };

         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };

         return SongPlayer;
      }

      angular
          .module('blocJams')
          .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
  })();

 //The play method takes an argument, song, which we'll get from the Album view when
 //a user clicks the play button; the ngRepeat directive used in the Album view template will
 //dictate which song to pass into the function. The play method creates a new Buzz object
 //using the song's audioUrl property and then calls Buzz's own  play method on the object.
