import { components } from '../views/index.js';
//  Funcion de cambios de rutas
export const changeView = (hash) => {
  const headerElem = document.querySelector('#nav');
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (hash) {
    case '':
    case '#/': {
      headerElem.classList.remove('mostrar');
      container.appendChild(components.login());
      break;
    }
    case '#/Registro': {
      container.appendChild(components.register());
      break;
    }
    case '#/Inicio': {
      console.log('inicio');
      headerElem.classList.add('mostrar');
      container.appendChild(components.timeline());
      break;
    }
    case '#/Perfil': {
      console.log('perfil');
      container.appendChild(components.perfil());
      break;
    }
    default: {
      container.innerHTML = 'no encontrado';
      break;
    }
  }
};
