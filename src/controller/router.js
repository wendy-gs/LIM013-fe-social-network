import { components } from '../views/index.js';

import { dataUserConecting } from '../model/firebase-user.js';

import { getPost } from '../model/firebase-posts.js';

//  Funcion de cambios de rutas
export const changeView = (hash) => {
  window.location.hash = hash;
  const user = firebase.auth().currentUser;
  const headerElem = document.querySelector('#nav');
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (hash) {
    case '':
    case '#/': {
      headerElem.classList.remove('show');
      container.appendChild(components.login());
      break;
    }
    case '#/Registro': {
      container.appendChild(components.register());
      break;
    }
    case '#/Inicio': {
      headerElem.classList.add('show');
      console.log('entro por usuario');
      dataUserConecting(user.uid, (resultUser) => {
        console.log('entro por correo');
        // getAllPost((arrayPost) => {
        //  container.innerHTML = '';
        container.appendChild(components.timeline(resultUser));
      //  });
      });
      break;
    }
    case '#/Perfil': {
      headerElem.classList.add('show');
      dataUserConecting(user.uid, (resultUser) => {
        getPost((arrayPost) => {
          container.innerHTML = '';
          container.appendChild(components.perfil(resultUser, arrayPost));
        });
      });
      break;
    }
    default: {
      container.innerHTML = 'no encontrado';
      break;
    }
  }
};
