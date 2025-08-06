# Interactive Polygon Map

Welcome!  
This is a simple and interactive map application built with **React** and **Leaflet**. It allows you to draw polygons on the map, move around freely, and still keep those shapes visible — super useful for geospatial tasks, visual planning, or just exploring how maps work.
---

## How to Set Up and Run the Project

Follow these quick steps to get it running on your device.

### 1. Clone the project
Download a copy of this project to your machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
### 2. Install all the Dependencies.
This command installs all the libraries the project needs:

```bash
npm install
```

### 3. Start the App.

This will launch the app in your default web browser.

```bash
npm start
```
That’s it! The app will be available at http://localhost:3000

Whenever you make changes, the page will reload automatically.

### Libraries used.
Here are the main tools and libraries that power this project:

| Library              | Why it's used                                          |
|----------------------|--------------------------------------------------------|
| **React**            | To build the user interface using components           |
| **React Leaflet**    | To integrate Leaflet maps smoothly into the React app  |
| **Leaflet**          | To render interactive maps                             |
| **Leaflet Draw**     | To allow drawing/editing polygons on the map           |
| **Create React App** | To set up the project easily with zero config          |

All of these work together to give you a rich, interactive map experience inside a modern web app.

### A Simple Design & Developement Notes.

* This project is kept simple and clean, focusing only on essential features.

* The map is designed to keep polygons visible, even when the user pans or moves the view.

* Zoom controls are disabled by default for a focused experience (you can enable them if needed).

* The layout is minimal so users can focus on the map without distractions.

* Built with Create React App, making it easy to extend, maintain, and deploy later.

* Due to API access being unavailable during development, this version doesn’t include live API calls.
  But the code is ready to integrate them in the future when they are again available.

##  Screenshots

###  Main View






You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
