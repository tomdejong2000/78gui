console.log("kaas");


$(".hamburger-lines").click(function() {
    $(".line1").toggleClass("animated1");
    $(".line2").toggleClass("animated2");
    $(".line3").toggleClass("animated3");

    $(".nav").toggleClass("opened");
    $("body").toggleClass("stopscroll")

  });

  intrval = setInterval(function () {refreshPage();},10); //refresh every sec
  function refreshPage(){
    setTimeout(fetchdata,1000);
  } 

  let fetchdata = function(){ 

    fetch('/test').then(response => response.json()).then (jsonD => {
        $(".stats1").text(jsonD["message"])

      
    });
  }

