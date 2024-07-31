# Screenshots desktop application

![alt text]([https://github.com/Chamesss/screenshots-eletron-app/blob/master/image.jpg](https://github.com/Chamesss/screenshots-eletron-app/blob/master/screenshots/screen1.PNG?raw=true)

![alt text]([https://github.com/Chamesss/screenshots-eletron-app/blob/master/image.jpg](https://github.com/Chamesss/screenshots-eletron-app/blob/master/screenshots/screen2.PNG?raw=true)

![alt text]([https://github.com/Chamesss/screenshots-eletron-app/blob/master/image.jpg](https://github.com/Chamesss/screenshots-eletron-app/blob/master/screenshots/screen3.PNG?raw=true)

![alt text]([https://github.com/Chamesss/screenshots-eletron-app/blob/master/image.jpg](https://github.com/Chamesss/screenshots-eletron-app/blob/master/screenshots/screen4.PNG?raw=true)

Created by: Chamsedin Azouz

### **Overview**

**Project Name:** Screenshots desktop application

**Description:**

The Screenshot Desktop Application is a desktop application designed to capture and manage desktop screenshots. The application supports multiple user profiles, allowing each user to create a profile and access a personalized dashboard. Screenshots are captured directly from the desktop and saved into a MongoDB database. The application leverages modern technologies such as MongoDB, Node.js, React.js, Electron.js.

**Technologies Used:**

• Node.js

• MongoDB

• Electron.js

• React.js

### **Setup**

### **Prerequisites**

Node.js **v20.9.0** or higher

npm 10.2.2 or higher

### **Installation**

1. Clone the repository:

```bash
git clone [https://github.com/Chamesss/screenshots-eletron-app](https://github.com/Chamesss/screenshots-eletron-app)
cd screenshots-electron-app
```

1. Install dependencies:
    
    server:
    
    ```bash
    cd server
    npm install
    ```
    
    client: 
    
    ```bash
    cd client
    npm install
    ```
    

1. Set up environment variables:
    
    • Create an `.env` file in `/server` directory.
    
    • Add the following variables:
    
    ```bash
    MONGODB_ATLAS_SRV= # MongoDB Atlas connection string
    PORT="8000"
    ```
    

1. Run the application:
    
    server:
    
    ```bash
    cd server
    npm run dev
    ```
    
    client:
    
    ```bash
    cd client
    npm run dev
    ```
    

## Application Features

### User Profiles

- **Create Profile**: Users can create a new profile with a unique name.
- **Multiple Profiles**: The application supports multiple profiles, allowing different users to use the application on the same device.
- **Profile Management**: Users can update or delete their profiles as needed.

### Dashboard

- **Screenshot Capture**: Users can capture screenshots of their desktop.
- **Screenshot Management**: Users can view, manage, and delete their screenshots from the dashboard.
- **Data Storage**: All screenshots are saved in a MongoDB database, linked to the user's profile.

## Server Folder Structure:

The server-side code is organized in the `server` folder, which contains a `src` folder structured as follows:

- **index.ts**: The main entry point of the server application.
- **controllers**: Contains the following controllers:
    - **User controllers**: Handles user-related operations such as creating and managing profiles.
    - **Screenshot controllers**: Handles screenshot-related operations such as saving and retrieving screenshots.
- **models**: Contains the user model:
    - **user model** : Defines the user schema, including the user's name and an array of images to link screenshots to profiles.
- **routes**: Contains the following routes:
    - **userRoutes.ts**: Defines the API endpoints for user-related operations.
    - **screenshotRoutes.ts**: Defines the API endpoints for screenshot-related operations.

## Client Folder Structure:

The client-side code is organized in the `client` folder, which contains a `src` folder structured as follows:

- **main**: Contains the main Electron process where the screenshot function runs.
- **preload**: Defines and uses APIs to bridge the main process and renderer process.
- **renderer**: Contains the React application.
    - **components**: Contains UI components built using Shadcn UI.
    - **App.tsx**: The main entry point of the React application.
    - **Main.tsx**: The main component rendering the core application structure.
    - **pages**: Contains the main application pages:
        - **user-selection.tsx**: Page for selecting or creating a user profile.
        - **screenshot-dashboard.tsx**: Dashboard for capturing and managing screenshots.
        - **components**: Folder for additional components used within pages.
