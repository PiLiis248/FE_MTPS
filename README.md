## Installation

1. Navigate to the project directory
2. Open a terminal and run the following command to create a new Vite project:
   ```
   yarn create vite
   ```
   Enter a project name when prompted.
3. Change into the project directory:
   ```
   cd <projectname>
   ```
4. Replace the `public`, `src`, and `index.html` files in the new project with the corresponding files from your old project. Also, create a new `.env` file in the project root.
   ```
   VITE_BASE_URL = "http://localhost:1050/api"
   VITE_ENV = "development"
   ```
5. Install the required dependencies:
   ```
   yarn add react-router-dom
   yarn add antd
   yarn add js-cookie
   yarn add axios
   yarn add react-hook-form
   ```
   Install each package one by one.
6. Start the development server:
   ```
   yarn dev
   ```
