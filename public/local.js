

$(document).ready(function(){
  $(".hamburger-lines").click(function() {
      $(".line1").toggleClass("animated1");
      $(".line2").toggleClass("animated2");
      $(".line3").toggleClass("animated3");

      $(".nav").toggleClass("opened");
      $("body").toggleClass("stopscroll")

    });


  //fetch de data uit json object uit /data en stop dat in h2
  let fetchdata = function(){
    fetch('/sensordata').then(response => response.json()).then (jsonD => {

        $(".stat1").text(parseInt(jsonD["sensor1"] + jsonD["sensor2"] + jsonD["sensor3"] /3))
        $(".stat2").text(jsonD["avgwinddirection"])
        $(".stat3").text(jsonD["sensordata"])
        $(".sensor1").text(jsonD["sensor1"])
        $(".sensor2").text(jsonD["sensor2"])
        $(".sensor3").text(jsonD["sensor3"])
    
        
      });
  }

  darktheme = false;




   	

  $( ".darktoggle" ).click(function() {
    console.log("kaas");
    console.log(darktheme);
   darktheme = !darktheme;
    if(darktheme){
      $("body").addClass("dark");
      $(".basicstats").addClass("dark");
      $(".icon1").addClass("fa-sun");
      $(".icon1").removeClass("fa-moon");
      $(".icon1").addClass("sun");
      $(".line").addClass("lightline");
      
    }else{
      $("body").removeClass("dark");
      $(".basicstats").removeClass("dark");
      console.log("awfawf");
      $(".icon1").addClass("fa-moon");
      $(".icon1").removeClass("fa-sun");
      $(".icon1").removeClass("sun");
      $(".line").removeClass("lightline");
    }

  });
  





    setInterval(function() {fetchdata();},100)
    

});




  
