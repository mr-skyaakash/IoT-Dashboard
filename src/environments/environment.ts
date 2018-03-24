// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCRUb4xi0NGsTalZAveNlXZKMs4pGU1rBI',
    authDomain: 'what-we-do-55cf9.firebaseapp.com',
    databaseURL: 'https://what-we-do-55cf9.firebaseio.com',
    projectId: 'what-we-do-55cf9',
    storageBucket: 'what-we-do-55cf9.appspot.com',
    messagingSenderId: '6226061394'
  },
  server: 'https://cdi-iot-server.herokuapp.com/'
  // server: 'http://0.0.0.0:5000/'
};
