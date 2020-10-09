import { components } from '../views/index.js';
//  Funcion de cambios de rutas
export const changeView = (hash) => {
  window.location.hash = hash;
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
      container.appendChild(components.timeline());
      break;
    }
    case '#/Perfil': {
      container.appendChild(components.perfil());
      break;
    }
    default: {
      container.innerHTML = 'no encontrado';
      break;
    }
  }
};
