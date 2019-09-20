# Gallereddit

An app that shows subreddits in a gallery

## Features

- Type the name of a subreddit, select it. The app shows all the pictures and gifs from it in a gallery
- Infinite scroll (more content is loaded when the user touches the bottom of the gallery)
- Responsive grid
- OAuth authentication, the user of the app does not need a reddit account
  - Each time a request is made, the validity of the token is checked. If it doesn't exist or is not valid, the app first authenticate to get a new token.

![gallery](https://i.imgur.com/NsxvLt1.jpg =250x) ![one_image](https://i.imgur.com/Wugeca4.jpg =250x)


## How to use it ?

- Download the repo

- Recreate the src/environments folders with this 2 files:

  ```js
  // environments/environments.prod.ts
  
  export const environment = {
    production: true,
  };
  
  export const reddit = {
      client_id: '<your_client_id>',
      secret: '<your_secret>',
  };
  
  ```

  ```js
  // environments/environments.ts
  
  // This file can be replaced during build by using the `fileReplacements` array.
  // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
  // The list of file replacements can be found in `angular.json`.
  
  export const environment = {
    production: false
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  ```

- To know what to put in `<your_client_id>` and `<your_secret>`,  see [this link (Getting Started)](https://github.com/reddit-archive/reddit/wiki/oauth2). `<client_id>` is the string displayed just under `personal use script` (in the screen shot available at the link) 

## Compatibility

`ionic cordova run android` for example

- Android
- iOS

The app uses cordova features such as `HTTP` because `HttpClient` was causing CORS error

## Authorizations

- The app asks to make calls. In fact it uses `UniqueDeviceID` from `'@ionic-native/unique-device-id/ngx'` to get the Uniqe Device ID. This allow to make the first post request to authentcate end receive an OAuth token from reddit.

## TODO's

- [x] Setting to enable/disable NSFW subreddits

- [x] Setting to choose the size of the gallery

- [ ] Zoom feature in the gallery

- [ ] Enhance the way one picture is shown

  - [ ] Add the link to access the post

  - [ ] Show comments

- [ ] Connect with an account and show a list of subreddits accordingly

- [ ] Comment code functions
