# FISH

FISH - Free Intergration for Smart Home by Marclab Software

## How to set environment variables

You can use your shell or you can use a "local.env" file inside the "envs" folder. Please note that
this file does not exist when you first clone your repo, so you should create one if needed. All
useful variables with their default values are stored inside the "envs/dev.env" file.

If a variable is set in more than one place, the priority is:

```
shell > local.env > dev.env
```

Also please note that it is advisable that in the shell or the "local.env" file you set only
the variables which are actually different from the "dev.env" file.

## How to expose local functions emulator to outer world for development

You will need to expose the emulated function to allow Google to connect to your service while
developing. To do so, we are using [localtunnel](https://github.com/localtunnel/localtunnel) via
the npm script `tunnel`. Your functions will be exposed to on URL with this format:

```
https://${FISH_FUNC_TUNNEL_SUBDOM}.loca.lt
```

Note that you should set the `FISH_FUNC_TUNNEL_SUBDOM` env var to something unique (
`fish-[some random alphanumeric chars]` is a good choice), otherwise localtunnel could not be
able to function properly.

Also note that this is needed only for local development.
