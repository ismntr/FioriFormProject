
# SAPUI5 Form Management Application

## Overview

This project is a SAPUI5-based web application designed to manage material and service contract forms. It allows users to fill out and submit forms that are sent to an OData backend. The application is built using SAP Fiori UI components and follows the MVC architecture.

### Key Features
- **Material Form Submission:** Users can submit material-related forms including details like Material No, Supplier, and Invoice No.
- **Service Form Submission:** Service contracts can also be managed through a dedicated service form interface.
- **OData Integration:** The application communicates with an OData backend to submit and retrieve data.
- **Responsive Design:** The UI is built to work seamlessly across different devices.

## Project Structure

```
FioriFormProject/
│
├── webapp/
│   ├── controller/         # Application logic and event handlers
│   ├── view/               # XML views
│   ├── model/              # OData models
│   ├── appconfig/          # Configuration files
│   ├── i18n/               # Internationalization (i18n) files
│   └── Component.js        # Component configuration and bootstrapping
│
├── test/                   # Unit tests and integration tests
└── index.html              # Main entry point for the application
```

## Setup and Installation

To set up the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ismntr/FioriFormProject.git
    ```
2. Navigate to the project folder:
    ```bash
    cd FioriFormProject
    ```
3. Install necessary dependencies using npm (if applicable):
    ```bash
    npm install
    ```

4. Run the application:
    - Open the `index.html` file in a supported browser.
    - Alternatively, use a local server to serve the application:
        ```bash
        ui5 serve
        ```

## Configuration

Make sure the `fioriSandboxConfig.json` file is correctly configured in the `/webapp/appconfig/` directory. This file helps initialize the Fiori sandbox environment for local development.

Example `fioriSandboxConfig.json`:

```json
{
  "services": {
    "ShellNavigation": {
      "config": {
        "enable": true
      }
    }
  }
}
```

### Internationalization (i18n)

Language support is provided through the `i18n` folder. Modify the translation files as needed:
- `i18n_en.properties`
- `i18n.properties` (default language)

### OData Configuration

Ensure your OData service is properly configured in the `manifest.json` file. Adjust the service URL and model details accordingly:
```json
{
  "dataSources": {
    "mainService": {
      "uri": "/path_to_your_odata_service/",
      "type": "OData",
      "settings": {
        "odataVersion": "2.0"
      }
    }
  }
}
```

## Troubleshooting

1. **404 Errors for i18n or JSON Files:**
   Ensure that the `i18n` and `fioriSandboxConfig.json` files are in the correct paths (`/webapp/test/i18n/` and `/webapp/appconfig/` respectively).

2. **Component-preload.js Not Loading:**
   Check if an ad-blocker or browser extension is interfering with the request. Disable it or whitelist the domain.

3. **Event Listener 'init' Return Value Error:**
   Ensure there is no return statement in your `onInit` method of the controller. It should only initialize logic without returning any value.

## Future Improvements
- Implement full test coverage using QUnit.
- Add additional form validation for client-side error handling.
- Provide enhanced error logging for OData service calls.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
