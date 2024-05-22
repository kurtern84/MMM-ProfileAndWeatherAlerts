# MMM-ProfileAndWeather
MMM-ProfileAndWeatherAlerts is a MagicMirror module that displays a user's profile image, name, and weather alerts from the Metalerts API. The module can be configured to hide the profile image, name, or the entire module when there are no alerts.
```
Features
 - Display a profile image and name
 - Fetch and display weather alerts from the Metalerts API
 - Optionally hide the profile image and name
 - Optionally hide the module when there are no alerts
 - Scroll through multiple alerts one by one

```

### Screenshot


<img style="flat: left; width: 50%;" src="screenshot.png">

### Installation

1. Clone the repository
 - Navigate to your MagicMirror modules directory and clone the repository:

```
cd ~/MagicMirror/modules
git clone https://github.com/kurtern84/MMM-ProfileAndWeatherAlerts.git

```
2. Install dependencies
- Navigate to the module directory and install the required dependencies:
Install necessary dependencies:

```
cd MMM-ProfileAndWeatherAlerts
npm install
```

### Configuration
To configure the module, add it to the config.js file in your MagicMirror's config directory:

```javascript
{
    module: "MMM-ProfileAndWeatherAlerts",
    position: "top_right", // Choose your preferred position
    config: {
        profileImage: "path/to/profile.jpg", // Path to your profile image
        name: "John Doe", // Your name
        metalertsUrl: "URL_TO_METALERTS_ENDPOINT", // URL to the Metalerts endpoint
        hideProfile: false, // Set to true to hide the profile image and name
        hideWhenNoAlerts: true // Set to true to hide the module when there are no alerts
    }
},

```
### Example Configuration
```javascript
{
    module: "MMM-ProfileAndWeatherAlerts",
    position: "top_right",
    config: {
        profileImage: "modules/MMM-ProfileAndWeatherAlerts/profile.jpg",
        name: "John Doe",
        metalertsUrl: "https://api.met.no/weatherapi/metalerts/2.0/current.json?lat=60.67659&lon=10.81997",
        hideProfile: false,
        hideWhenNoAlerts: true
    }
},
```
### Customization
You can customize the appearance by editing the MMM-ProfileAndWeatherAlerts.css file located in the module's directory.

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
Common Issues
 1. Module not appearing
    - Ensure the module is correctly added to the config.js file.
    - Check the browser console for errors.
 2. No alerts found
    - Verify that the metalertsUrl is correct and accessible.
    - Check the console logs for any error messages.

### Logs
Check the logs for detailed error messages:
```
pm2 logs mm
```
      
### License
This project is licensed under the MIT License - see the LICENSE file for details.

