import { logOut } from '../model/firebase-auth.js';

import { dataUser } from '../model/firebase-user.js';

export const timelineView = () => {
  //  Obtener el usuario que accedió
  const user = firebase.auth().currentUser;
  const timeline = `
    <!-- PERFIL CON OPCIÓN PARA POSTEAR -->
  <section id="timelineView">
    <section id="profile">
      <img id='photo-profile' alt="profile-picture">
      <ul class="profile-data">
        <li class="name"></li>
        <li class="grade"></li>
        <li class="description"></li>
      </ul>
    </section>

    <section class="all-post">
      <section class="post">
        <div class="post-options">
          <label for="privacy-post">Privacidad: </label>
          <select id="privacy-post">
            <option value="public">Público</option>
            <option value="private">Privado</option>
          </select>
          <button type="button" id="edit-post"><img src="" alt="edit-post"></button>      
        </div>

        <div class="text-container">
          <label for="post-text"></label>
          <textarea id="post-text" name="post-text" placeholder="¿Qué quieres compartir?"></textarea>
        </div>

        <div class="post-buttons">
          <button type="button" id="load-img"><img src="" alt="load-img"></button>
          <button id="share-post" class="button-post">Compartir</button>
        </div>
      </section>

      <!-- SECCIÓN CON LOS DEMÁS POSTS -->
      <section id="timeline" class="posted">
        <!-- ocultar íconos de borrar y editar -->
        <div class="post-author">
          <span>Publicado por ABCD EFGH</span>      
        </div>

        <div class="text-container">
          <label for="post-text-posted"></label>
          <textarea class="post-text-posted" name="post-text-posted" readonly></textarea>
        </div>

        <div class="post-buttons">
          <button type="button" id="like-post" class="button-post"><img src="" alt="like"></button>
          <button id="share-post" class="button-post">Comentar</button>
        </div>
      </section>
    </section>
  </section> `;
  const div = document.createElement('div');
  div.innerHTML = timeline;
  const userName = div.querySelector('.name');
  const userGrade = div.querySelector('.grade');
  const userDescription = div.querySelector('.description');
  const userPhoto = div.querySelector('#photo-profile');
  // Llenado con los datos del usuario
  dataUser(user.uid)
    .then((docUser) => {
      userName.innerHTML = docUser.data().name;
      userGrade.innerHTML = docUser.data().grade;
      userDescription.innerHTML = docUser.data().description;
      userPhoto.src = docUser.data().photo;
    });
  // DOM para el cerrar sesion
  const btnLogOut = document.querySelector('#btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        console.log('salio de logeo');
        window.location.hash = '#/';
        document.querySelector('#nav').classList.remove('mostrar');
      });
  });
  return div;
};
