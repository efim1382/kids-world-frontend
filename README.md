# brandbot FE
set API_PATH = http://104.236.193.245/api/v1

## env
* NODE_ENV (default 'development') - node env (maybe test, production or development) affects to build configuration
* API_PATH (default 'http://localhost:8000/api/v1') - path to api
* PORT (default 3000) - local server port
* FACEBOOK_APP_ID (default 284585555286548) - Facebook application id
* AVIARY_API_KEY (default 1cc3043ce2e049b097bdb63c7d4a6fab) - Aviary Image Edtitor app key

## Development

We have two available options to launch.

### Start without prebuilt DLLs

* Run the command

```
npm run start-remote
```

### Start with prebuilt DLLs

* Prebuild development DLLs with cli command:

```
npm run dev-dll
```

* Run development server

```
npm run start-remove-dll
```
