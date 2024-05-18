Module.register("MMM-ProfileAndWeatherAlerts", {
    defaults: {
        profileImage: "path/to/profile.jpg",
        name: "John Doe",
        metalertsUrl: "URL_TO_METALERTS_ENDPOINT"
    },

    start: function() {
        this.alerts = [];
        this.getWeatherAlerts();
        setInterval(() => {
            this.getWeatherAlerts();
        }, 10 * 60 * 1000); // Update every 10 minutes
    },

    getStyles: function() {
        return ["MMM-ProfileAndWeatherAlerts.css"];
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        // Profile section
        var profileWrapper = document.createElement("div");
        profileWrapper.className = "profile-wrapper";

        var img = document.createElement("img");
        img.src = this.config.profileImage;
        img.className = "profile-image";
        profileWrapper.appendChild(img);

        var name = document.createElement("div");
        name.innerHTML = this.config.name;
        name.className = "profile-name";
        profileWrapper.appendChild(name);

        wrapper.appendChild(profileWrapper);

        // Alerts section
        var alertsWrapper = document.createElement("div");
        alertsWrapper.className = "alerts-wrapper";

        if (this.alerts.length > 0) {
            this.alerts.forEach(alert => {
                var alertDiv = document.createElement("div");
                alertDiv.className = "alert";
                alertDiv.innerHTML = `
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-description">${alert.description}</div>
                    <div class="alert-instructions">${alert.instructions}</div>
                `;
                alertsWrapper.appendChild(alertDiv);
            });
        } else {
            alertsWrapper.innerHTML = "Du har ingen varsler";
        }

        wrapper.appendChild(alertsWrapper);

        return wrapper;
    },

    getWeatherAlerts: function() {
        this.sendSocketNotification("GET_METALERTS", this.config.metalertsUrl);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "METALERTS_DATA") {
            this.alerts = payload.map(alert => {
                return {
                    title: alert.title,
                    description: alert.description,
                    severity: alert.severity,
                    area: alert.area,
                    instructions: alert.instructions,
                    interval: alert.interval,
                    contact: alert.contact
                };
            });
            this.updateDom();
        }
    }
});
