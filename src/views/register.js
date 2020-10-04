import { register, logIn } from '../model/firebase-auth.js';

import { createUser } from '../model/firebase-user.js';

export const registerView = () => {
  const registerTmplt = `
  <section id='section-register'>
    <div class="imagen-login item-register">
      <img id="img-colegio" src="/img/imagen-login.png">
    </div> 
    <section class='section-form item-register'>
      <div class='cont-avatar item-form'>
        <img id="logo-register" src='/img/logo.png'>
        <h1>REGISTRATE AHORA</h1>
        <img id="avatar" src='/img/estudiante.JPG'>
      </div>
      <form id='form-register' class='item-form'>
        <div class="div-input">
          <i class="fas fa-user"></i>
          <input type='text' id='form-name' name='form-name' placeholder='Nombres' autocomplete='off' required>
        </div>
        <div class="div-input">
          <i class="fas fa-user"></i>
          <input type='text' id='form-lastname' name='form-lastname' placeholder='Apellidos' autocomplete='off' required>
        </div>
        <div class="div-input">
          <i class="fas fa-envelope"></i>
          <input type='text' id='form-email' name='form-email' placeholder='Email' autocomplete='off' required>
        </div>
        <div class="div-input">
          <i class="fas fa-lock"></i>
          <input type='password' id='form-pass' name='form-pass' placeholder='Contraseña' autocomplete='off' required>
        </div>
        <div class="div-input">
          <i class="fas fa-lock"></i>
          <input type='password' id='form-pass-check' name='form-pass-check' placeholder='Contraseña'required>
        </div>
          <p id='msg-error' class='error'></p>
          <a href='#/' id="btn-return">◀ ATRAS</a>
          <button  type="submit" id="btn-register">REGISTRAR</button>
      </form>
    </section>
</section> `;
  const div = document.createElement('div');
  div.innerHTML = registerTmplt;

  /* Crear nueva cuenta de usuario */
  const btnRegister = div.querySelector('#btn-register');
  btnRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = div.querySelector('#form-name').value;
    const lastName = div.querySelector('#form-lastname').value;
    const email = div.querySelector('#form-email').value;
    const pass = div.querySelector('#form-pass').value;
    const passCheck = div.querySelector('#form-pass-check').value;
    const message = div.querySelector('#msg-error');
    const fullName = name + lastName;
    if (pass !== passCheck) {
      message.innerHTML = '⚠️ Contraseñas no coinciden';
    } else {
      register(email, pass)
        .then((result) => {
          createUser(result.user.uid, fullName, 'img/perfil.png', 'grado', email, 'primaria/secundaria', 'sede')
            .then(() => {
              console.log('se creo el usuario');
            });
          logIn(email, pass)
            .then(() => {
              window.location.hash = '#/Inicio';
            });
        })
        .catch(() => {
          message.innerHTML = '⚠️ Usuario ya existe';
        });
    }
  });

  return div;
};
