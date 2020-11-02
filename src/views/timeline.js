
import { createPost, getAllPost } from '../model/firebase-posts.js';

import { uploadImgPost } from '../model/storage.js';

import { allPost } from './postPublished.js';


export const timelineView = (resultUser) => {
  //  Obtener el usuario que accedió
  const userName = resultUser.data().name;
  const userLevel = resultUser.data().level;
  const userGrade = resultUser.data().grade;
  const userCampus = resultUser.data().campus;
  const userPhoto = resultUser.data().photo;
  const user = firebase.auth().currentUser;

  const timeline = `
    <!-- PERFIL CON OPCIÓN PARA POSTEAR -->
  <section id="timelineView">
    <section id="profile" class ='card'>
      <div class="header-profile">
      <img id='photo-profile' src='${userPhoto}' alt="profile-picture">
      <p class="name">${userName}</p>
      </div>
      <p><i class="fas fa-user-graduate"></i> Nivel: <span  class="level">${userLevel}</span></p>
      <p><i class="fas fa-graduation-cap"></i> Grado: <span  class="grade">${userGrade}</span></p>
      <p><i class="fas fa-map-marker-alt"></i> Sede: <span class="campus">${userCampus}</span></p>
    </section>
    <section class="all-post">
      <section class="post">
        <div class="header-post">
          <div class='header-post-data'>
            <img id="photo-user-post" class="photo-user" src='${userPhoto}'>
            <p id="name-user-post">${userName}</p>
          </div>
          <select id="post-new-privacy">
            <option value="public">🌎 Público</option>
            <option value="private">🔒 Privado</option>
          </select>  
        </div>
        <div class="text-container">
          <textarea id="post-text" class='post-text-area' name="post-text" placeholder="¿Qué quieres compartir?"></textarea>
          <button id="btnCancelImg" class="hide"><i class="fas fa-times-circle"></i></button>
          <img id="showPicture" class="post-new-image">
        </div>
        <div class="footer-new-post">
          <label for="selectImage">
            <input type="file" id="selectImage" class="upload" accept="image/jpeg, image/png, image/gif">
            <i id="img-post" class="fas fa-file-image"></i>
          </label>
        <button id="btnNewPost" class="btn-post">Publicar</button>
        </div>
      </section>

      <!-- SECCIÓN CON LOS DEMÁS POSTS -->
      <section id="post-published" class="posted">
      </section>
    </section>
  </section> `;

  const div = document.createElement('div');
  div.innerHTML = timeline;
  let file = '';
  let dataURL = '';
  // La previsualizacion de la imagen a subir en el posts
  const selectImage = div.querySelector('#selectImage');
  const showPicture = div.querySelector('#showPicture');
  const btnCancelImg = div.querySelector('#btnCancelImg');
  selectImage.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      dataURL = reader.result;
      showPicture.src = dataURL;
    };
    reader.readAsDataURL(e.target.files[0]);
    file = e.target.files[0];
    btnCancelImg.classList.remove('hide');
  });
  // Cancenlar la imagen antes de subir
  btnCancelImg.addEventListener('click', () => {
    showPicture.src = '';
    file = '';
    btnCancelImg.classList.add('hide');
  });

  // Se crea el post
  const btnNewPost = div.querySelector('#btnNewPost');
  btnNewPost.addEventListener('click', () => {
    const contentPost = div.querySelector('#post-text').value;
    const status = div.querySelector('#post-new-privacy').value;
    const date = new Date();
    // const date = firebase.firestore.FieldValue.serverTimestamp();

    btnCancelImg.classList.add('hide');
    if (file === '') {
      createPost(user.uid, contentPost, '', status, date, resultUser.data().name, resultUser.data().photo);
    } else {
      uploadImgPost(file, user.uid)
        .then((url) => {
          createPost(user.uid, contentPost, url, status, date,
            resultUser.data().name, resultUser.data().photo);
        });
    }
    div.querySelector('#post-text').value = '';
    showPicture.src = '';
    file = '';
  });
  // Se muestran todos los post
  const postSeccion = div.querySelector('#post-published');
  getAllPost((arrayPost) => {
    postSeccion.innerHTML = '';
    arrayPost.forEach((post) => {
      if ((post.state === 'private' && post.userId === user.uid) || post.state === 'public') {
        postSeccion.appendChild(allPost(post, resultUser));
      }
    });
  });
  return div;
};
