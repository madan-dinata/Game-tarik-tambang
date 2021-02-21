// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAwr-pfEyNirh4UYZRms190Aoy_szHpU_8",
    authDomain: "tambang-2e010.firebaseapp.com",
    databaseURL: "https://tambang-2e010.firebaseio.com",
    projectId: "tambang-2e010",
    storageBucket: "",
    messagingSenderId: "953446804846"
  };
  firebase.initializeApp(config);

  // Get a ref to database
  var database = firebase.database()


  // write data
  function marginTambah(imageMargin) {
    database.ref('image').set({
      margin: imageMargin
    })
  }

  // reset pbar position
  function resetMargin(imageMargin) {
    database.ref('image').set({
      margin: imageMargin
    })
  }
  
  function playGround(){
    $('.winner').empty().append('Playground Siap!!!')
  }
  
  function onFire(n){
    $('.winner').empty().append('Ayoo!!! Tarik!!!')
    
    // var persen = Math.floor(n/295*100)
    //     $('.winner').append(`<div class="progress progress-striped active"><div class="progress-bar" style="width:${persen}%"></div></div>`)
    if (n.match(/^-\d+$/)) {
        var persenKiri = Math.floor((n*-1)/295*100)
        $('.winner').append(`<h4>Tim Kiri Lagi Kuat Men!!!</h4><div class="progress progress-striped active"><div class="progress-bar" style="width:${persenKiri}%"></div></div>`)
    } else {
        var persenKanan = Math.floor(n/295*100)
        $('.winner').append(`<h4>Tim Kanan Lagi Kuat Men!!!</h4><div class="progress progress-striped active"><div class="progress-bar" style="width:${persenKanan}%"></div></div>`)
    }
    
    
  }

  // reset button
  $('#newButton').on('click', function(){
      
    $('#tambang').css('margin-left', '0%')
    var reset = $('#tambang').css('margin-left')
    resetMargin(reset)
    // playGround()
    // $('.winner').empty().append('Playground Ready!!!')
  })



  //left button
  $("#left").on('click', function() {
    $('#tambang').css('margin-left', '-=5')
    var mgLeft = $('#tambang').css('margin-left')
    marginTambah(mgLeft)
  });

  // right button
  $("#right").on('click', function() {
    $('#tambang').css('margin-left', '+=5')
    var mgLeft = $('#tambang').css('margin-left')
    marginTambah(mgLeft)
  });

    database.ref('image').on('value', function (snapshot) {
        $('.mp3').empty().append('<audio autoplay><source src="http://cruzbol.com/media/Ballermann_Hits_FUSSBALL_-_The_Fans_-_Ole_Ole_Ole_Soccer_Song_.mp3" type="audio/mpeg"></audio>')
      console.log(snapshot.val().margin);
      $('#tambang').css('margin-left', snapshot.val().margin)
      var lastPos = snapshot.val().margin
      $('.marginValue').empty().append(lastPos.split('px')[0])
      if(lastPos == '295px'){
        $('#right').attr('disabled','disabled');
        $('#left').attr('disabled','disabled');
        $('.winner').empty().append('Tim Kanan Menang!!!')
        $('#tambang').css('margin-left', '0%')
        // var reset = $('#tambang').css('margin-left')
        // resetMargin(reset)
        $('#newButton').removeAttr('disabled');
      } else if(lastPos == '-295px'){
        $('#right').attr('disabled','disabled');
        $('#left').attr('disabled','disabled');
        $('.winner').empty().append('Tim Kiri Menang!!!')
        $('#tambang').css('margin-left', '0%')
        // var reset = $('#tambang').css('margin-left')
        // resetMargin(reset)
        $('#newButton').removeAttr('disabled');
      } else if(lastPos == '0px'){
        $('#newButton').attr('disabled','disabled');
        $('#right').removeAttr('disabled');
        $('#left').removeAttr('disabled');
        playGround()
        // $('.winner').empty().append('Playground Ready!!!')
      } else {
        $('#newButton').attr('disabled','disabled');
        var getVal = lastPos.split('px')
        onFire(getVal[0])
        // $('.winner').empty().append('Playground Ready!!!')
      }
  })
