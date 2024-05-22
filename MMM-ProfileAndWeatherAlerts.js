Module.register("MMM-ProfileAndWeatherAlerts", {
    defaults: {
        profileImage: "path/to/profile.jpg",
        name: "John Doe",
        metalertsUrl: "URL_TO_METALERTS_ENDPOINT",
        showProfileImage: true,
        showName: true,
        hideWhenNoAlerts: false,
        alertDisplayInterval: 5000 // Time to display each alert (in milliseconds)
    },

    start: function() {
        this.alerts = [];
        this.currentAlertIndex = 0;
        this.alertInterval = null;
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

        if (this.config.hideWhenNoAlerts && this.alerts.length === 0) {
            wrapper.style.display = "none";
            return wrapper;
        }

        wrapper.style.display = "block";

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

        var alertsWrapper = document.createElement("div");
        alertsWrapper.className = "alerts-wrapper";

        if (this.alerts.length > 0) {
            var alertDiv = document.createElement("div");
            alertDiv.className = "alert";
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
            console.log("METALERTS_DATA received:", payload);
            this.alerts = this.processAlerts(payload);
            this.currentAlertIndex = 0;
            this.updateDom();
        }
    },

    processAlerts: function(data) {
        if (data && data.features && data.features.length > 0) {
            return data.features.map(feature => feature.properties.title);
        }
        return [];
    }
});
