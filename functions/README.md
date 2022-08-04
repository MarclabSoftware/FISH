# :fish:FISH - Google Cloud Functions

FISH - Free Integration for Smart Homes by Marclab Software

## Guide / How to

### Prerequisites

- Install GCloud CLI
- Install GCloud Datastore emulator ([link](https://cloud.google.com/datastore/docs/tools/datastore-emulator))
- Useful tool to browse Datastore emulator [here](https://github.com/sanshirookazaki/datastore-gui)

### Set environment variables

You can use your shell or you can use a `local.env` file inside the `envs` folder.

Please note that this file does not exist when you first clone your repo, so you should create one
if needed.

Every useful variable with its default value is stored inside the `envs/dev.env` file.

If a variable is set in more than one place, the priority is:

> shell > local.env > dev.env

:exclamation:Please note: it's advisable that in the shell or the `local.env` file you only set
the variables which are actually different from the `dev.env` file.

### Expose local functions emulator to the outer world for development

:information_source:Only needed for local development

You will need to expose the emulated function to allow Google to connect to your service while
developing.

To do so, we are using [localtunnel](https://github.com/localtunnel/localtunnel) via the npm
script `tunnel`.

Your functions will be exposed to an URL with this format:
`https://${FISH_FUNCTIONS_TUNNEL_SUBDOM}.loca.lt`

:exclamation:Please note: you should set the `FISH_FUNCTIONS_TUNNEL_SUBDOM` env var to something
unique (`fish-[some random alphanumeric chars]` is a good choice), otherwise localtunnel could not
be able to function properly.

### How to configure Auth0 for social login

- Create Auth0 account - go to [Auth0](https://auth0.com/).
- Create Auth0 tenant.
- Inside tenant, create an API named "FISH-API". In the "identifier" field put the URL at which
  Google functions will be accessible, e.g. `https://europe-west1-fish-marcuson.cloudfunctions.net`.
- Enable "Allow Offline Access" for the above API.
- Inside tenant, create a machine-to-machine application named "FISH-app".
  - In the "Allowed Callback URLs" field, put this value:
    `https://oauth-redirect.googleusercontent.com/r/<GCP_PROJ_ID>,https://oauth-redirect-sandbox.googleusercontent.com/r/<GCP_PROJ_ID>`.
  - In the "Advanced Settings > Grant Types", check "Authorization Code" and "Refresh Token" only.
- In your Auth0 tenant, under "Authentication > Social", enable Google.
- In your Actions on Google project, go to "Develop > Account linking" section and set
  "OAuth Client Information" according to your Auth0 configuration.
  