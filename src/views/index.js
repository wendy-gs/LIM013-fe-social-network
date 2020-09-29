import { loginPrincipal } from './login.js';
import { Perfil } from './perfil.js';
import { timelineView } from './timeline.js';
import { registerView } from './register.js';

const components = {
  login: loginPrincipal,
  perfil: Perfil,
  register: registerView,
  timeline: timelineView,

};
export { components };
