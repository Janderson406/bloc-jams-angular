 (function() {
      function SongPlayer(Fixtures) {
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
               currentBuzzObject.stop();
               SongPlayer.currentSong.playing = null;
           }
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
             });

             SongPlayer.currentSong = song;
         };

         var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
         };

         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };


         SongPlayer.currentSong = null;  //turn 'var currentSong' into a public attribute so that we can use it within PlayerBarCtrl

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
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             } else {
               var song = currentAlbum.songs[currentSongIndex];
               setSong(song);
               playSong(song);
           }
         };

         return SongPlayer;
      }

      angular
          .module('blocJams')
          .factory('SongPlayer', ['Fixtures', SongPlayer]);
  })();

 //The play method takes an argument, song, which we'll get from the Album view when
 //a user clicks the play button; the ngRepeat directive used in the Album view template will
 //dictate which song to pass into the function. The play method creates a new Buzz object
 //using the song's audioUrl property and then calls Buzz's own  play method on the object.
