import { loginPrincipal } from './login.js';
import { profileView } from './perfil.js';
import { timelineView } from './timeline.js';
import { registerView } from './register.js';

const components = {
  login: loginPrincipal,
  perfil: profileView,
  register: registerView,
  timeline: timelineView,

};
export { components };
