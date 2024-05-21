# MMM-ProfileAndWeather
The MMM-ProfileAndWeatherAlerts is a module for MagicMirror that displays a user profile (profile picture and name) along with weather alerts from the Norwegian Meteorological Institute. The module can be configured to hide when there are no weather alerts.

### Screenshot


<img style="flat: left; width: 50%;" src="screenshot.png">

### Installation

In your terminal, go to your MagicMirror's Module folder:

```
cd ~/MagicMirror/modules
```

Clone this repository:

```
git clone https://github.com/kurtern84/MMM-ProfileAndWeatherAlerts.git
```

Install necessary dependencies:

```
cd ~/MagicMirror/modules/MMM-ProfileAndWeatherAlerts/
npm install
```

Add some [config entries](#configuration) in your config.js file. 

### Configuration
To configure the MMM-ProfileAndWeatherAlerts module, add it to the modules array in your config/config.js file. Here is an example configuration:

```javascript
{
    module: "MMM-ProfileAndWeatherAlerts",
    position: "top_right", // This can be any region
    config: {
        profileImage: "path/to/profile.jpg", // Path to your profile image
        name: "John Doe", // Your name
        metalertsUrl: "https://api.met.no/weatherapi/metalerts/2.0/current.json?lat=60.67659&lon=10.81997)", // URL to the Metalerts endpoint
        showProfileImage: true, // Set to false if you want to hide the profile image
        showName: true, // Set to false if you want to hide the name
        hideWhenNoAlerts: false // Set to true to hide the module when there are no alerts
    }
},

```
### Configuration Options
|Option|Description|Type|Default|
|------|-----------|----|-------|
|profileImage|Path to your profile image.|String|"path/to/profile.jpg"|
|name|Your name.|String|"John Doe"|
|metalertsUrl|URL to the Metalerts endpoint.|String|"URL_TO_METALERTS_ENDPOINT"|
|showProfileImage|Set to false if you want to hide the profile image.|Boolean|true|
|showName|Set to false if you want to hide the name.|Boolean| true|
|hideWhenNoAlerts|Set to true to hide the module when there are no alerts.|Boolean|false|

### Usage
Once you have configured the module, restart your MagicMirror to see it in action. The module will display your profile picture and name, along with any weather alerts fetched from the Metalerts API.

### Troubleshooting
```
cd ~/MagicMirror/modules/MMM-ProfileAndWeatherAlerts/
npm install request

```
### License
This project is licensed under the MIT License - see the LICENSE file for details.

