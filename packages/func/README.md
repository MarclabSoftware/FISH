# :fish:FISH

## Free Integration for Smart Homes by Marclab Software

## Guide / How to

### Set environment variables

You can use your shell or you can use a `local.env` file inside the `envs` folder.

Please note that this file does not exist when you first clone your repo, so you should create one if needed.

Every useful variable with its default value is stored inside the `envs/dev.env` file.

If a variable is set in more than one place, the priority is:

> shell > local.env > dev.env

:exclamation:Please note: it's advisable that in the shell or the `local.env` file you only set
the variables which are actually different from the `dev.env` file.

### Expose local functions emulator to the outer world for development

:information_source:Only needed for local development

You will need to expose the emulated function to allow Google to connect to your service while
developing.

To do so, we are using [localtunnel](https://github.com/localtunnel/localtunnel) via the npm script `tunnel`.

Your functions will be exposed to an URL with this format: `https://${FISH_FUNC_TUNNEL_SUBDOM}.loca.lt`

:exclamation:Please note: you should set the `FISH_FUNC_TUNNEL_SUBDOM` env var to something unique (`fish-[some random alphanumeric chars]` is a good choice), otherwise localtunnel could not be able to function properly.
