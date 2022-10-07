## Chat App (Fullstack)

Chat app is a fullstack application that allows users to send and view messages in the real time.

## Project status

This project is currently under development.
The main project is completed\*, test suites are under way.

## Demonstration

Due to the nature of `PassportJs'` Google-Oauth2 Strategy, and because I do not have access to a hosting service that allows both Express and React
hosting on the same domain, there is no page to visit for this project.

Please view this demonstration of the app being used on localhost through two different google accounts.

![Chat app demo](https://www.youtube.com/watch?v=5FtekUkGkUc)

## Installation and Setup

Clone or download this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

- You will need to run `npm install` in each directory individually

To start the Node server:

- `cd backend` if you havent already
- run `nodemon dist/server.js` or `node dist/server.js`
- connect to the server through `http://localhost:4000`

- run `tsc --w` if you wish to make changes in the src file

To start the React page

- `cd frontend`
- run `npm start`
- visit the page at `http://localhost:3000`

## Reflection

This was a project built with the goal of using technologies learned up to this point and to familiarize myself
with new technologies like Websockets.

I wanted to build a real-time React chat application that allows users to sign in using their google accounts and chat in a few different rooms.
The project was designed with scaling in mind, and new rooms can be created and used in the application easily.

One of the main challenges I ran into was implementing `Socket.io`. I spent some time going through various resources to find the optimal way to
both add to the `MongoDb` database AND sync the server without overlapping data. Creating a way to disconnect users from a room when they leave
took a bit of tinkering and a few trials with different methods but ultimately a simple system was used.

At the end of the day the technologies implemented in this project are:

Frontend: React, Bootstrap, Typescript, and React-Router v6.
Backend: Node, MongoDb, Express, Passport-Google-Oauth2, Socket.io, Typescipt and Express-session.

I used `create-react-app --template typescript` boilerplate to minimize setup time so I could spend more time focusing on building the backend.
Bootstrap with a Bootswatch theme was used for simplicity.
