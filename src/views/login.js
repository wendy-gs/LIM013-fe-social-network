import { logIn, googleLogin, fbLogin } from '../model/firebase-auth.js';

import { createUser } from '../model/firebase-user.js';

export const loginPrincipal = () => {
  const viewLogin = ` 
  <section id="view-login-desktop">
    <div class="imagen-login item-login">
      <img id="img-colegio" src="/img/imagen-login.png">
    </div> 
    <div class="formulario-login item-login">
      <div class="saludo">
        <h1>¡Bienvenido a InnovaSocial!</h1>
        <p>En este lugar podras comunicarte y compartir recursos</p>
      </div>
      <div class="imagen-celular"> 
        <img id="img-celular" src="/img/fondo-celular.png">
      </div>
      <div id="formulario-principal">
        <form id="form-login">
          <i class="fas fa-envelope-square"></i>
          <input type="email" id="correo" name="correo" placeholder="Correo Electrónico" class="input-form" required/><br>
          <i class="fas fa-lock"></i>
          <input type="password" id="clave" name="clave" placeholder="Contraseña"class="input-form" required/><br>
          <p id="messages-error" class="messages"></p>
          <button  type="submit" id="btn-ingresar">INGRESAR</button>
          <p>O ingresa con</p>
          <button type="button" id="btn-fb" class="redes"><i class="fab fa-facebook-f"></i></button>
          <button type="button" id="btn-gmail" class="redes"><i class="fab fa-google"></i></button>
          <p>¿Todavia no eres miembro?</p>
          <a id="nueva-cuenta" href='#/Registro'>Únete Ahora</a>
          </form>
      </div>
    </div>
  </section> `;
  const div = document.createElement('div');
  div.innerHTML = viewLogin;

  // Inicio de usuario nuevo
  const btnRegistrar = div.querySelector('#nueva-cuenta');
  btnRegistrar.addEventListener('click', () => {

  });

  // Inicio de sesión con Gmail
  const btnGmail = div.querySelector('#btn-gmail');
  btnGmail.addEventListener('click', (e) => {
    e.preventDefault();
    googleLogin()
      .then((result) => {
        console.log(result.user);
        console.log(result.user.uid);
        createUser(result.user.uid, result.user.displayName, result.user.photoURL, 'primaria/secundaria', result.user.email, 'Conpartiendo conocimiento')
          .then(() => {
            console.log('se creo usuario');
          });
        window.location.hash = '#/Inicio';
      }).catch((error) => {
        console.log('error de login', error);
      });
  });

  // Inicio de sesión con FB
  const btnFb = div.querySelector('#btn-fb');
  btnFb.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
    fbLogin()
      .then((result) => {
        console.log(result.user.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //  Creamos funcion para ingresar con una cuenta ya creada
  const btnIngresar = div.querySelector('#form-login');
  btnIngresar.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = div.querySelector('#correo').value;
    const password = div.querySelector('#clave').value;
    // validacion de datos
    logIn(email, password)
      .then(() => {
        div.querySelector('#messages-error').innerHTML = '';
        window.location.hash = '#/Inicio';
      })
      .catch(() => {
        div.querySelector('#messages-error').innerHTML = '⚠️ Correo o clave no son correctos.';
        console.log('credenciales incorrectos');
      });
  });
  return div;
}