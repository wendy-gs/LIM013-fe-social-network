import { components } from '../views/index.js';
//  Funcion de cambios de rutas
export const changeView = (hash) => {
  const headerElem = document.querySelector('#nav');
  const aside = document.body.getElementsByTagName('aside')[0];
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (hash) {
    case '': {
      aside.classList.remove('hidden');
      container.appendChild(components.login());
      break;
    }
    case '#/Cerrar': {
      headerElem.classList.remove('mostrar');
      aside.classList.remove('hidden');
      container.appendChild(components.login());
      break;
    }
    case '#/Registro': {
      aside.classList.remove('hidden');
      container.appendChild(components.register());
      break;
    }
    case '#/Inicio': {
      headerElem.classList.add('mostrar');
      aside.classList.add('hidden');
      container.appendChild(components.timeline());
      break;
    }
    case '#/Perfil': {
      aside.classList.add('hidden');
      container.appendChild(components.perfil());
      break;
    }
    default: {
      container.innerHTML = 'no encontrado';
      break;
    }
  }
};
