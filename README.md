# Would You Rather Project

This is Michael Arrastia's project submission for Udacity's React & Redux course.

The project specification is defined by the [Udacity Rubric](https://review.udacity.com/#!/rubrics/1567/view)

## Installation

* install all project dependencies with `npm install`
* start the server with `npm start`

## Usage

The application allows users to play a Would You Rather game.

Users can post and answer would-you-rather style questions. The application keeps track of answered and unanswered 
questions. Additionally, a Leaderboard shows who has most combined questions posted and answered.

## Technology

This project is intended to demonstrate the use of Redux to create and maintain the application's state by means of 
React components that are connected to the store.

Thunk middleware is used to deal with asynchronous calls to the backend and dispatch actions when the APIs complete.

The application's login flow, which includes login redirection, is based on Tyler McGinnis' PrivateRoute examples here:
 * https://tylermcginnis.com/react-router-protected-routes-authentication/
 * https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4/43171515#43171515

Additionally, Tyler McGinnis' [Real World Redux example](https://tylermcginnis.com/projects/redux-twitter/) provided by
the Udacity course has provided valuable examples and patterns for implementation. 

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Backend API

The backend API was provided by Udacity as starter code. See [API.md](API.md).
