# James Wells Sensat Angular Test

James Wells' submission to Sensat for Angular Programming Exercise (including unit tests)
- The two bonus exercises that were chosen were the graph of sensors readings and the table filtering


## How to set up / start up

- Have node (this was done with the latest version) installed on your machine https://nodejs.org/en/download/
- Install the angular CLI on your machine https://cli.angular.io/
- Under the "UI-James-Wells-Sensat-Exercise" folder run "npm i" in the cmd / terminal
- Under the "UI-James-Wells-Sensat-Exercise" folder run "ng build" in the cmd / terminal
- Under the "UI-James-Wells-Sensat-Exercise" folder run "ng serve" (or npm start) in the cmd / terminal
- If you want to run the unit tests, under the "UI-James-Wells-Sensat-Exercise" folder run "ng test" in the cmd / terminal
- Go to http://localhost:4200/ on any of Google Chrome, Firefox, Edge or IE to access the app
- The json readings which this app is using from can be found in the assets folder if needed

## How to use
- There are two tabs, 'Table of Sensor Readings' and 'Graph of Sensor Readings' you can click on these to navigate between the table and graph view of sensor readings

### Table of Sensor Readings
- The table readings will show a list the JSON readings from sensor_readings.json in the order that they were read in
- YOU WONT SEE ALL THE TABLE VALUES AT ONCE BECAUSE PAGINATION HAS BEEN IMPLEMENTED TO MAKE EVERYTHING SIMPLER TO READ AND EASIER TO PROCESS. Pagination options will appear on the bottom of the table, allowing you to navigate between pages and enabling you to pick the page size of either 5, 10 or 100
- You can sort the table by 'Reading Timestamp' and 'Sensor Type' by clicking on their column headers (hover over them for an arrow to appear). An arrow will appear indicating if they are being sorted by ascending or descending order. Keep clicking to toggle between ascending / descending and no sort.  
- There is a filter input box on top of the table. It will filter both the Sensor Type and Name to see if any of those two columns contain rows with values that contain the filter text.

### Graph of Sensor Readings
- When selecting this option you will be greeted with both a line graph and a selection list of sensor ID's.
- The line graph will show the selected sensor readings over time
- To change the sensor you want to see readings for, simply click the selection box above the graph and then select the new sensor you wish to see readings for. The graph will the automatically generate for the new sensor.
- To get a specific reading at a point on the graph, just hover over one of the dots on the graph and it will display the reading for that point.

## Key Considerations
- Please talk to me in the interview about this i feel there is too much to say for the README.md
### Libraries
- I used material UI for a overall component theme because I was most familiar with it, it looked professional and in the future, if this ever were to be worked on again material UI is very extendable.
- PrimeNG was used for the graph as i was familiar with it and it did the job in a easy to use way.

### Design / Code Decisions
- I has required to convert the .json file into text and then parse it back into json because it did not contain a top level parent object to directly parse so therefore i could not directly feed the contents of the file into a JSON parser due to invalid syntax.
- I only allowed one sensor to be displayed on the graph at a time. This is because i found multiple displayed at once was too hard on the eyes and was also harder to make sense of (however this is incredibly easy to implement and can do it in front of you if needed) 
- I am sorting the date / time by string because the Date time is in a format that it is in enables it to be sorted by string. If it were in a non numeric format i would have used Moment.js to compare date / times with its comparison functionality
- I am only using one filter input for two columns. This is because I realised that the name / sensor type were always the same. Having two types of filters on two columns that always had matching values would have made one of the filters always redundant. I also would have made the text filter work across all columns but this was not stated in the requirements
- Colours I picked gave a professional vibe
- The pagination numbers I used gave the user either a small chunk to view at a time or a large chunk to view, but not to the point where the UI's performance is affected.
- I provided unit tests to validate my core functionality.

## Key Future Considerations
- Please talk to me in the interview about this i feel there is too much to say for the README.md
- It would be ideal to obtain sensor readings though an API and also run pagination through the api becuase the UI will not be able to handle a number of sensor readings far greater than this
- Token caching if this UI were to integrate with a backend
- Manual test pack
- Automated testing if there was time
- Supply sensor readings though websockets so you can see how they change in realtime
