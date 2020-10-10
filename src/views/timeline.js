import { logOut } from '../model/firebase-auth.js';

import { dataUser, loadingInfo } from '../model/firebase-user.js';

import { createPost, getAllPost } from '../model/firebase-posts.js';

import { uploadImgPost } from '../model/storage.js';

import { allPost } from './postPublished.js';

export const timelineView = (arrayPost) => {
  //  Obtener el usuario que accedió
  const user = firebase.auth().currentUser;
  loadingInfo();
  const userName =  localStorage.getItem('name');
  const userLevel = localStorage.getItem('level');
  const userGrade = localStorage.getItem('grade');
  const userCampus = localStorage.getItem('campus');
  const userPhoto = localStorage.getItem('userphoto');
  
  const timeline = `
    <!-- PERFIL CON OPCIÓN PARA POSTEAR -->
  <section id="timelineView">
    <section id="profile" class ='card'>
      <div class="header-profile">
      <img id='photo-profile' src='${userPhoto}' alt="profile-picture">
      <p class="name">${userName}</p>
      </div>
      <p><i class="fas fa-user-graduate"></i>Nivel <span  class="level">${userLevel}</span></p>
      <p><i class="fas fa-graduation-cap"></i>Grado <span  class="grade">${userGrade}</span></p>
      <p><i class="fas fa-map-marker-alt"></i>Sede <span class="campus">${userCampus}</span></p>
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
        <button id="btnNewPost" class="post-btn">Publicar</button>
        </div>
      </section>

      <!-- SECCIÓN CON LOS DEMÁS POSTS -->
      <section id="post-published" class="posted">
      </section>
    </section>
  </section> `;
  const div = document.createElement('div');
  div.innerHTML = timeline;/*
  const userName = div.querySelector('.name');
  const userLevel = div.querySelector('.level');
  const userGrade = div.querySelector('.grade');
  const userCampus = div.querySelector('.campus');
  const userPhoto = div.querySelector('#photo-profile');
  const userPost = div.querySelector('#photo-user-post');
  const userNamePost = div.querySelector('#name-user-post');
  // Llenado con los datos del usuario
  dataUser(user.uid)
    .then((docUser) => {
      userName.innerHTML = docUser.data().name;
      userLevel.innerHTML = docUser.data().level;
      userGrade.innerHTML = docUser.data().grade;
      userCampus.innerHTML = docUser.data().campus;
      userPhoto.src = docUser.data().photo;
      userPost.src = docUser.data().photo;
      userNamePost.innerHTML = docUser.data().name;
    });*/
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
    const date = new Date().toLocaleString();
    btnCancelImg.classList.add('hide');
    if (file === '') {
      createPost(user.uid, contentPost, '', status, date, userName, userPhoto);
    }else{
      uploadImgPost(file, user.uid)
      .then((url)=>{
        createPost(user.uid, contentPost, url, status, date, userName, userPhoto);
      });
    }
    div.querySelector('#post-text').value = '';
    showPicture.src = '';
    file = '';       
  });
  
  // Se muestran todos los post
 const postSeccion = div.querySelector('#post-published');
 getAllPost( (arrayPost) =>{
  postSeccion.innerHTML='';
  arrayPost.forEach((post) => {
    postSeccion.appendChild(allPost(post));
  });
 });
 
  // DOM para el cerrar sesion
  const btnLogOut = document.querySelector('#btn-logout');
  btnLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        console.log('salio de logeo');
        window.location.hash = '#/Cerrar';
        document.querySelector('#nav').classList.remove('mostrar');
      });
  });
  return div;
};
