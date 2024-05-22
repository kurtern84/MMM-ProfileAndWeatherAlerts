Module.register("MMM-ProfileAndWeatherAlerts", {
    defaults: {
        profileImage: "path/to/profile.jpg",
        name: "John Doe",
        metalertsUrl: "URL_TO_METALERTS_ENDPOINT",
        updateInterval: 10 * 60 * 1000, // Oppdater hvert 10. minutt
        scrollSpeed: 3000 // Hastigheten på rulling i millisekunder
    },

    start: function() {
        this.alertIndex = 0;
        this.alerts = [];
        this.getWeatherAlerts();
        setInterval(() => {
            this.getWeatherAlerts();
        }, this.config.updateInterval);
    },

    getStyles: function() {
        return ["MMM-ProfileAndWeatherAlerts.css"];
    },

    getDom: function() {
        var wrapper = document.createElement("div");

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

        var alertsWrapper = document.createElement("div");
        alertsWrapper.className = "alerts-wrapper";

        var alertDiv = document.createElement("div");
        alertDiv.className = "alert";
        alertDiv.innerHTML = this.alerts[this.alertIndex];
        alertsWrapper.appendChild(alertDiv);

        wrapper.appendChild(alertsWrapper);

        return wrapper;
    },

    getWeatherAlerts: function() {
        this.sendSocketNotification("GET_METALERTS", this.config.metalertsUrl);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "METALERTS_DATA") {
            this.alerts = payload;
            this.alertIndex = 0; // Start med det første varselet
            this.updateDom();
            this.rotateAlerts();
        }
    },

    rotateAlerts: function() {
        var self = this;
        setInterval(function() {
            self.alertIndex = (self.alertIndex + 1) % self.alerts.length;
            self.updateDom(self.config.scrollSpeed);
        }, self.config.scrollSpeed);
    }
});
