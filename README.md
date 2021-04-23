# weather-app-journal
Weather App Journal Project for Udacity FWD Nanodegree

## Specification
Create an asynchronous web app that uses Web API and user data to dynamically update the UI in a Weather Journal application.

## Result

While the requirements focus on the US, as in the user needs to be able to enter a zip code, this implementation also works by entering a city name and country code. 

## Coding Approach

Liberal use has been made of Guard Clauses to handle user input validation and clean coding principles have
been applied.

## Testing the App

Local testing has been carried out entering several city names and using UK, FR and IT as country codes.

Validation has also been tested by entering incorrect entries.

## Deployment

The project has been deployed to the Heroku Platform here https://weather-journal-project.herokuapp.com/

There were some difficulties with deploying to Heroku

- missing package.json file - resolved by running npm init
- installing heroku cli and running - heroku logs --tail --app weather-journal-project
