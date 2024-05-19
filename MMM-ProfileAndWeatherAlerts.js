Module.register("MMM-ProfileAndWeatherAlerts", {
    defaults: {
        profileImage: "path/to/profile.jpg",
        name: "John Doe",
        metalertsUrl: "URL_TO_METALERTS_ENDPOINT",
        showProfileImage: true,
        showName: true,
        hideWhenNoAlerts: false
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
        if (this.config.showProfileImage || this.config.showName) {
            var profileWrapper = document.createElement("div");
            profileWrapper.className = "profile-wrapper";

            if (this.config.showProfileImage) {
                var img = document.createElement("img");
                img.src = this.config.profileImage;
                img.className = "profile-image";
                profileWrapper.appendChild(img);
            }

            if (this.config.showName) {
                var name = document.createElement("div");
                name.innerHTML = this.config.name;
                name.className = "profile-name";
                profileWrapper.appendChild(name);
            }

            wrapper.appendChild(profileWrapper);
        }

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
                    <div class="alert-severity">Severity: ${alert.severity}</div>
                    <div class="alert-area">Area: ${alert.area}</div>
                    <div class="alert-instructions">${alert.instructions}</div>
                    <div class="alert-interval">From: ${alert.interval[0]} To: ${alert.interval[1]}</div>
                    <div class="alert-contact"><a href="${alert.contact}" target="_blank">More info</a></div>
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

            if (this.alerts.length > 0) {
                this.show(); // Show module if there are alerts
            } else if (this.config.hideWhenNoAlerts) {
                this.hide(); // Hide module if there are no alerts and hideWhenNoAlerts is true
            }

            this.updateDom();
        }
    }
});
