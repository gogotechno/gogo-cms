// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'gogo-cms',
    appId: '1:725199808903:web:becce00698461804f90b22',
    storageBucket: 'gogo-cms.appspot.com',
    locationId: 'asia-southeast1',
    apiKey: 'AIzaSyAQbmNegtFkrDdKgh-zeDynI3OhcNA2jRg',
    authDomain: 'gogo-cms.firebaseapp.com',
    messagingSenderId: '725199808903',
    measurementId: 'G-HV244CX08S',
  },
  swsErp: {
    ApiUrl: 'https://uat.erp.swstechno.com/api',
    publicUrl: ['/login']
  },
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
