function ss(){
  $.getJSON('https://jsonip.com/', function(data) {
  alert(data.ip);
});
  var platform = navigator.platform;
  var browser = navigator.appName;
  var loc = navigator.language;
  var ua = navigator.userAgent;
  var cljs = new ClientJS();
  var cbrowser = cljs.getBrowser();
  var os = cljs.getOS();
  
  var ur = "";
  
  $.ajax({
    type: "GET",
    url: ur,
    success: function(){
      console.log("ok");
    }
  
})
*/
}