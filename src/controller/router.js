import { components } from '../views/index.js';

import { dataUserConecting } from '../model/firebase-user.js';

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
      dataUserConecting(user.uid, (resultUser) =>{
      container.appendChild(components.timeline(resultUser));
    });
    break;
    }
    case '#/Perfil': {
      headerElem.classList.add('show');
      dataUserConecting(user.uid, (resultUser) =>{
      container.innerHTML='';
      container.appendChild(components.perfil(resultUser));
      });
      break;
    }
    default: {
      container.innerHTML = 'no encontrado';
      break;
    }
  }
};
