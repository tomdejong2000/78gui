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

        $(".stat1").text(jsonD["sensordata"]["avgwindspeed"])
        $(".stat2").text(jsonD["sensordata"]["avgwinddirection"])
        $(".stat3").text(jsonD["sensordata"]["sensordata"])
        $(".sensor1").text(jsonD["sensordata"]["sensor1"])
        $(".sensor2").text(jsonD["sensordata"]["sensor2"])
        $(".sensor3").text(jsonD["sensordata"]["sensor3"])
    
        
      });
  }

  setInterval(function() {fetchdata();},1000)
});
