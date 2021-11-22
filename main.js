function ss(){
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
  console.log(JSON.stringify(data, null, 2));
});
  /*
  var platform = navigator.platform;
  var browser = navigator.appName;
  var loc = navigator.language;
  var ua = navigator.userAgent;
  var cljs = new ClientJS();
  var cbrowser = cljs.getBrowser();
  var os = cljs.getOS();
  
  $.ajax({
    type: "GET",
    url: "",
    success: function(){
      console.log("ok");
    }
  
})
*/
}