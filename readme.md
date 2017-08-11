# blink(1) Azure Functions / Logic App / IoT Hub Demo # 

![Blink Aniamtion](_static/light-ani.gif)

## Requirements ##

1. [Azure Subscription](https://azure.microsoft.com)
2. [Visual Studio Code](https://code.visualstudio.com/)
3. [Node.js](https://nodejs.org/en/)
4. [Azure Functions Core Tools](https://www.npmjs.com/package/azure-functions-core-tools) (optional)
5. [blink(1) USB device](https://blink1.thingm.com/)
6. Active [Twitter](https://www.twitter.com) Account

## Setup Instructions (in progress) ## 

Create a new Azure Resource Group

![Create a new Azure Resource Group](_static/001-resource-group.png)

Create Azure IoT Hub (New -> Internet of Things -> IoT Hub)

![Create a new Azure Resource Group](_static/002-iot-hub.png)

Name your hub and make sure to choose the **FREE** pricing tier and the resource group that you created earlier. Leave all the other settings as is. 

![IoT Hub Settings](_static/003-iot-hub-settings.png)

Navigate to the Resource Group you created and you should see your IoT Hub listed. 

![Navigate to Resource Group](_static/004-nav-resource-group.png)

Click on your IoT Hub and take note of your *Hostname*. Copy it to a text file as we will be using it later. 

![IoT Hub Host](_static/005-iot-hub-host.png)

Select "Device Explorer" from the left column and then click "Add"

![Device Explorer](_static/006-device-explorer.png)

Create a unique id for your device. For this demo we will use "blinksim". Leave all the rest of the settings and hit "Save". 

![Add Device](_static/007-add-device.png)

The device will now show on on the previous blade. Select the device.

![Select Device](_static/008-select-device.png)

Copy the device's primary key and save it to a text file. We will be using it later. 

![Select Device](_static/009-device-key.png)

## Workshop ## 

For a step by step workshop version of this demo please visit the following link: coming soon. 

### 1. Install required applications ###

Coming soon... 

### 2. Create IoT Hub & Setup Device ###

Coming soon... 

### 3. Create Function App & Publish to Azure ###

Coming soon... 

### 4. Create Logic App & Send to Function ### 

Coming soon... 

### 5. Add additional logic apps ###

Coming soon... 

## Resources ##

 - Coming soon... 
