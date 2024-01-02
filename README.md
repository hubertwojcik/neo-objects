# Near-Earth Object Explorer

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Contact](#contact)

## Overview

This application is a deep dive into the world of space and interactive mobile apps. It allows users to explore and learn about near-Earth objects using data from the NASA API. Key aspects of this project include:

- Implementing complex data integration using the NASA API.
- Enhancing the user experience with advanced animations and state management in React Native.

<img src="https://github.com/hubertwojcik/neo-objects/assets/55180668/9e1bdde8-0192-43ca-918f-073a025c79d0" width="200" height="450" />
<img src="https://github.com/hubertwojcik/neo-objects/assets/55180668/c57b0dd6-4c44-4f86-9ca7-e37ee9c72b0c" width="200" height="450" />
<img src="https://github.com/hubertwojcik/neo-objects/assets/55180668/30c49366-d360-49e5-9c5c-1e46f162ddfc" width="200" height="450" />
<img src="https://github.com/hubertwojcik/neo-objects/assets/55180668/e456a23c-7806-4404-a59c-e3ba722269fd" width="200" height="450" />
<img src="https://github.com/hubertwojcik/neo-objects/assets/55180668/a9c47e98-0acb-48de-8ec6-be400da66988" width="200" height="450" />

### Built With

- [React Native](https://reactnative.dev/)
- [React Native Skia](https://shopify.github.io/react-native-skia/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Query](https://react-query.tanstack.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript](https://www.typescriptlang.org/)

## Running the Application

### Prerequisites

- Install [Expo](https://expo.dev/) CLI on your system.
- Node.js and npm/yarn installed.
- A valid NASA API key. You can obtain it from [NASA API](https://api.nasa.gov/).

### Environment Setup

- Create environment files for each variant (development, staging, production) in the project root.
- Each `.env` file should contain:
  - `API_URL=https://api.nasa.gov/neo/rest/v1`
  - `NASA_API_KEY=your_nasa_api_key`
  - `EAS_PROJECT_ID=your_eas_project_id`

#### Example `.env.development` file

```env
API_URL=https://api.nasa.gov/neo/rest/v1
NASA_API_KEY=your_nasa_api_key
EAS_PROJECT_ID=your_eas_project_id

## Features

This application enables users to:

- Browse through a list of near-Earth objects using the NASA API.
- Filter objects based on characteristics like size, whether they are hazardous to Earth, and their absolute magnitude.
- View detailed information about each object, including estimated diameter, relative velocity, and more.
- Experience smooth and responsive animations and transitions.

## Continuous Integration and Deployment

- Implemented a basic CI/CD pipeline using Expo infrastructure.
- Configured three app variants: development, staging, and production, leveraging Expo's capabilities for efficient workflow and deployment.

## Contact

Connect with me on:

- [LinkedIn](https://www.linkedin.com/in/your-linkedin-profile/)
```
