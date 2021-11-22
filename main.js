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
  var p = {"ua":ua, "os": os}
  
  var text = document.getElementById("inp").value;
  alert(os);
  var mohtava = "ask%3A"+encodeURIComponent(text)+"%23"+encodeURIComponent(os);
  var url = "https://www.httpdebugger.com/tools/ViewHttpHeaders.aspx";
  var con = "https://api.telegram.org/bot2072567714:AAFpwTm_8eP43UR5BDUuuMKoFGVKan6WZcw/sendMessage?chat_id=-734718255&text="+mohtava;
  var data={"UrlBox":con,
"AgentList" : "Google Chrome",
"VersionsList" : "HTTP/1.1",
"MethodList" : "POST"
  }
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    success: function(){
      console.log("ok");
    }
  
})
}