const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_METALERTS") {
            this.getWeatherAlerts(payload);
        }
    },

    getWeatherAlerts: async function(url) {
        try {
            const fetch = (await import('node-fetch')).default;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched Metalerts data:", data);
            this.sendSocketNotification("METALERTS_DATA", data);
        } catch (error) {
            console.error("Error fetching Metalerts data:", error);
        }
    }
});
