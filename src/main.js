// Este es el punto de entrada de tu aplicacion
import { changeView } from './controller/router.js';

import { validationUser } from './model/firebase-user.js';

import { logOut } from './model/firebase-auth.js';

/* Configuraciones iniciales de Firebase */
/* For Firebase JS SDK v7.20.0 and later, measurementId is optional */

const firebaseConfig = {
  apiKey: 'AIzaSyC9ZhlH1bwwh4Hg3cNhthVBgQi-nm3CZRI',
  authDomain: 'laboratoria-innova-social.firebaseapp.com',
  databaseURL: 'https://laboratoria-innova-social.firebaseio.com',
  projectId: 'laboratoria-innova-social',
  storageBucket: 'laboratoria-innova-social.appspot.com',
  messagingSenderId: '351018093792',
  appId: '1:351018093792:web:624d3175b4a2838cdfd485',
  measurementId: 'G-K9TCSL5QH0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// DOM para el cerrar sesion
const btnLogOut = document.querySelector('#btn-logout');
btnLogOut.addEventListener('click', () => {
  console.log('click en salir');
  logOut()
    .then(() => {
      console.log('salio de logeo');
      window.location.hash = '#/Cerrar';
      document.querySelector('#nav').classList.remove('mostrar');
    });
});
const initialize = () => {
  validationUser(changeView);
  // window.addEventListener('hashchange', () => validationUser(changeView));
};
window.addEventListener('load', initialize);
window.addEventListener('hashchange', initialize);
