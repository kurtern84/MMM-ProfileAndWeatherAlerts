Module.register("MMM-ProfileAndWeatherAlerts", {
    defaults: {
        profileImage: "path/to/profile.jpg",
        name: "John Doe",
        metalertsUrl: "URL_TO_METALERTS_ENDPOINT",
        showProfileImage: true,
        showName: true,
        hideWhenNoAlerts: false,
        alertDisplayInterval: 5000
    },

    start: function() {
        this.alerts = [];
        this.currentAlertIndex = 0;
        this.alertInterval = null;
        this.getWeatherAlerts();
        this.updateDom(1000);
        setInterval(() => {
            this.getWeatherAlerts();
        }, 10 * 60 * 1000);
    },

    getStyles: function() {
        return ["MMM-ProfileAndWeatherAlerts.css"];
    },

    getScripts: function () {
        return ["https://unpkg.com/dayjs@1.11.10/dayjs.min.js", "https://unpkg.com/dayjs/locale/nb.js"];
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        if (this.config.hideWhenNoAlerts && this.alerts.length === 0) {
            wrapper.style.display = "none";
            return wrapper;
        }

        wrapper.style.display = "block";

        var alertsWrapper = document.createElement("div");
        alertsWrapper.className = "pwa-alerts-wrapper";

        if (this.alerts.length > 0) {
            var alertDiv = document.createElement("div");
            alertDiv.className = "pwa-alert";
            alertDiv.innerHTML = this.alerts[this.currentAlertIndex];
            alertsWrapper.appendChild(alertDiv);

            if (this.alerts.length > 1) {
                if (this.alertInterval) {
                    clearInterval(this.alertInterval);
                }
                this.alertInterval = setInterval(() => {
                    this.currentAlertIndex = (this.currentAlertIndex + 1) % this.alerts.length;
                    this.updateDom();
                }, this.config.alertDisplayInterval);
            }
        } else {
            alertsWrapper.innerHTML = "<div class='pwa-no-alerts'>Du har ingen varsler</div>";
        }

        wrapper.appendChild(alertsWrapper);
        return wrapper;
    },

    getWeatherAlerts: function() {
        this.sendSocketNotification("GET_METALERTS", this.config.metalertsUrl);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "METALERTS_DATA") {
            this.alerts = this.processAlerts(payload);
            this.currentAlertIndex = 0;
            this.updateDom(1000);
        }
    },

    processAlerts: function(data) {
        if (typeof dayjs !== "undefined") {
            dayjs.locale("nb");
        }

        if (data && data.features && data.features.length > 0) {
            return data.features.map(feature => {
                let title = feature.properties.title || "Ukjent varsel";
                let description = feature.properties.description || "";
                let onset = null;
                let ends = null;

                const dateRegex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2})/g;
                const dates = title.match(dateRegex);

                if (dates && typeof dayjs !== "undefined") {
                    if (dates[0]) onset = dayjs(dates[0]).format("dddd D. MMMM kl. HH:mm");
                    if (dates[1]) ends = dayjs(dates[1]).format("dddd D. MMMM kl. HH:mm");
                    title = title.replace(dateRegex, "").trim();
                }

                let timeBlock = "";
                if (onset || ends) {
                    timeBlock = "<div class='pwa-alert-time'>Fra: " + (onset || "ukjent") + " - Til: " + (ends || "ukjent") + "</div>";
                }

                let descriptionBlock = description ? "<div class='pwa-alert-description'>" + description + "</div>" : "";

                return "<div class='pwa-alert-title'>" + title + "</div>" + descriptionBlock + timeBlock;
            });
        }
        return [];
    }
});
