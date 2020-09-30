import { register, logIn } from '../model/firebase-auth.js';

import { createUser } from '../model/firebase-user.js';

/* const newUser = (name, lastName, email, pass) => {
  register(email, pass)
    .then
}; */

export const registerView = () => {
  const registerUser = (name, email, pass) => {
    register(email, pass)
      .then((result) => {
        console.log(result);
        createUser(result.user.uid, name, 'img/perfil.png', 'grado', email, 'primaria/secundaria', 'sede')
          .then(() => {
            console.log('se creo el usuario');
          });
        logIn(email, pass)
          .then(() => {
            window.location.hash = '#/Inicio';
          });
      })
      .catch(() => {
        console.log('cuenta ya existe');
      });
  };
  const registerTmplt = `
  <section id='section-register'>
    <div>
      LOGO
    </div>
    <form id='form-register'> <!-- action='/action_page.php' -->
      <ul class='form-flex'>
        <li>
          <label for='form-name'></label>
          <input type='text' id='form-name' name='form-name' placeholder='Escribe tu nombre'>
        </li>
        <li>
          <label for='form-lastname'></label>
          <input type='text' id='form-lastname' name='form-lastname' placeholder='Escribe tus apellidos'>
        </li>
        <li>
          <label for='form-email'></label>
          <input type='text' id='form-email' name='form-email' placeholder='Escribe tu correo'> 
        </li>
        <li>
          <label for='form-pass'></label>
          <input type='text' id='form-pass' name='form-pass' placeholder='Escribe una contraseña segura'>
        </li>
        <li>
          <label for='form-pass-check'></label>
          <input type='text' id='form-pass-check' name='form-pass-check' placeholder='Vuelve a escribir la contraseña'>
        </li>
        <li>
          <button  type="submit" id="btn-register">REGISTRARTE</button>
        </li>  
      </ul> 
    </form>
</section> `;
  const div = document.createElement('div');
  div.innerHTML = registerTmplt;

  /* Crear nueva cuenta de usuario */
  const btnRegister = div.querySelector('#form-register');
  btnRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = div.querySelector('#form-name').value;
    const lastName = div.querySelector('#form-lastname').value;
    const email = div.querySelector('#form-email').value;
    const pass = div.querySelector('#form-pass').value;
    const passCheck = div.querySelector('#form-pass-check').value;
    if (name === '') {
      alert('name');
    } else if (lastName === '') {
      alert('lastName');
    } else if (email === '') {
      alert('email');
    } else if (pass === '') {
      alert('falta pass');
    } else if (pass !== passCheck) {
      alert('pass diferente');
    } else {
      registerUser(name, email, pass);
    }
  });

  return div;
};


/* <li>
          <label for='form-grade'></label>
     <input type='text' id='form-grade' name='form-grade' placeholder='Indica en qué grado estás'>
        </li>
         */

