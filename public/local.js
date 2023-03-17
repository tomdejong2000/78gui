console.log("kaas");

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

  

  



    setInterval(function() {fetchdata();},100)
    

});




  
