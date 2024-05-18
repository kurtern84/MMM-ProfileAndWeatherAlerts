var NodeHelper = require("node_helper");
var request = require("request");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_METALERTS") {
            this.getMetalertsData(payload);
        }
    },

    getMetalertsData: function(url) {
        var self = this;
        request(url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                try {
                    var data = JSON.parse(body);
                    var alerts = self.extractAlerts(data);
                    self.sendSocketNotification("METALERTS_DATA", alerts);
                } catch (e) {
                    console.error("Error parsing response: ", e);
                }
            } else {
                console.error("Request failed: ", error);
            }
        });
    },

    extractAlerts: function(data) {
        var alerts = [];
        // Validate if data.features is an array
        if (Array.isArray(data.features)) {
            data.features.forEach(function(feature) {
                // Extract relevant details from each feature's properties
                var properties = feature.properties;
                if (properties && properties.event && properties.description && properties.severity && properties.area) {
                    alerts.push({
                        event: properties.event,
                        description: properties.description,
                        severity: properties.severity,
                        area: properties.area,
                        title: properties.title,
                        instructions: properties.instruction,
                        contact: properties.contact,
                        web: properties.web,
                        status: properties.status,
                        interval: feature.when ? feature.when.interval : []
                    });
                } else {
                    console.warn("Incomplete alert found: ", properties);
                }
            });
        } else {
            console.warn("Unexpected data structure: ", data);
        }
        return alerts;
    }
});
