

$(document).ready(function(){

  let measurementUnit = 3.6
  var picotime1

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

        picotime1 = jsonD["sensor1Time"]
        $(".sensor1").text(jsonD["sensor1"])
        $(".sensor2").text(jsonD["sensor2"])
        $(".sensor3").text(jsonD["sensor3"])
    
        
      });
  }

  

  let makedark = function(){
    $("body").addClass("dark");
    $(".basicstats").addClass("dark");
    $(".icon1").addClass("fa-sun");
    $(".icon1").removeClass("fa-moon");
    $(".icon1").addClass("sun");
    $(".line").addClass("lightline");
  }

  let makelight = function(){
    $("body").removeClass("dark");
    $(".basicstats").removeClass("dark");
    console.log("awfawf");
    $(".icon1").addClass("fa-moon");
    $(".icon1").removeClass("fa-sun");
    $(".icon1").removeClass("sun");
    $(".line").removeClass("lightline");
  }



   	



  if(sessionStorage.getItem("toggleValue")) {
    $("#session-value").text("Session Value: " + sessionStorage.getItem("toggleValue"));
    
  }
  else {
    $("#session-value").text("Session Value: OFF");
  }
  


  $( ".darktoggle" ).click(function() {
    if(sessionStorage.getItem("toggleValue")) {
      sessionStorage.removeItem("toggleValue");
      $("#session-value").text("Session Value: OFF");
      console.log(sessionStorage.getItem("toggleValue"));
      makelight();
    }
    else {
      sessionStorage.setItem("toggleValue", "ON");
      $("#session-value").text("Session Value: ON");
      console.log(sessionStorage.getItem("toggleValue"));
      makedark();

    } 

  });



  if(sessionStorage.getItem("toggleValue") == "ON"){
    makedark();
  }else{
    makelight();
  }


    
  // Define your variables
  var prevValue = picotime1
  var timer;

  // Function to check sensor timeouts
  function checkTimeout() {
    if (picotime1 == prevValue) {
      $(".sensor1box").addClass("disconnected");
    } else {
      prevValue = picotime1;
      $(".sensor1box").removeClass("disconnected");
    }
    
    // Reset the timer
    clearTimeout(timer);
    timer = setTimeout(checkTimeout, 3000); // Use checkTimeout instead of checkVariable
  }

  // Call the function to start checking the sensor timeouts
  checkTimeout();








    setInterval(function() {fetchdata();},100)
    

});




  
