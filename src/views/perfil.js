import { updateLote } from '../model/firebase-user.js';

import { allPost } from './postPublished.js';

import { uploadImgUser } from '../model/storage.js';


import { getAllPost } from '../model/firebase-posts.js';

export const profileView = (resultUser, arrayPost) => {
  const profile = document.createElement('div');
  profile.innerHTML = `
    <section id="view-perfil">
    <div class="portada">
      <div id="contendor-imagen">
       <img id="portada-mensaje" src="/img/portada.png">
     </div>
     <img id='photo-viewprofile' src='${resultUser.data().photo}' alt="profile-picture">
     <label for="selectphoto">
       <input type="file" id="selectphoto" class="upload" accept="image/jpeg, image/png, image/gif">
      <span id="new-photo" class='hide'> <i class="fas fa-camera"></i></span>
      </label>
     <h1 class="name">${resultUser.data().name}</h1>
    </div>
    <div class="form-update">
      <div class='card'>
        <div>
        <label for ="levelUser"><i class="fas fa-user-graduate"></i>  Nivel</label>
        <select id="levelUser" disabled="true">
          <option value="Primaria" ${(resultUser.data().level === 'Primaria') ? 'selected' : ''}>Primaria</option>
          <option value="Secundaria" ${(resultUser.data().level === 'Secundaria') ? 'selected' : ''}>Secundaria</option>
        </select> 
        </div>
        <div>
        <label for ="gradeUser"><i class="fas fa-graduation-cap"></i>  Grado</label>
        <select id="gradeUser" disabled="true">
          <option value="1°" ${(resultUser.data().grade === '1°') ? 'selected' : ''}>1°</option>
          <option value="2°" ${(resultUser.data().grade === '2°') ? 'selected' : ''}>2°</option>
          <option value="3°" ${(resultUser.data().grade === '3°') ? 'selected' : ''}>3°</option>
          <option value="4°" ${(resultUser.data().grade === '4°') ? 'selected' : ''}>4°</option>
          <option value="5°" ${(resultUser.data().grade === '5°') ? 'selected' : ''}>5°</option>
          <option value="6°" ${(resultUser.data().grade === '6°') ? 'selected' : ''}>6°</option>
        </select>
        </div>
        <div>
        <label for ="campusUser"><i class="fas fa-map-marker-alt"></i>  Sede</label>
        <select id="campusUser" disabled="true">
          <option value="Arequipa" ${(resultUser.data().campus === 'Arequipa') ? 'selected' : ''}>Arequipa</option>
          <option value="Chiclayo" ${(resultUser.data().campus === 'Chiclayo') ? 'selected' : ''}>Chiclayo</option>
          <option value="Lima" ${(resultUser.data().campus === 'Lima') ? 'selected' : ''}>Lima</option>
          <option value="Trujillo" ${(resultUser.data().campus === 'Trujillo') ? 'selected' : ''}>Trujillo</option>
        </select>
        </div>
        <div class='container-btn'>
        <button class="btn-save-post btn-post hide" id="btnSave">Guardar</button>
        <button class="btn-cancel-post btn-post hide" id="btnCancel">Cancelar</button>
        <button class='btn-update btn-post'>Actualizar Datos</button> 
        </div>
      </div>
      <section class='my-post all-post'>
      </section>

    </div>
  </section> `;
  // Editar los datos del usuario
  const selectphoto = profile.querySelector('#selectphoto');
  const btnphotouser = profile.querySelector('#new-photo');
  const photoProfile = profile.querySelector('#photo-viewprofile');
  const nameuser = profile.querySelector('.name');
  const selectGrade = profile.querySelector('#gradeUser');
  const selectLevel = profile.querySelector('#levelUser');
  const selectCampus = profile.querySelector('#campusUser');
  const btnupdate = profile.querySelector('.btn-update');
  const btnCancel = profile.querySelector('.btn-cancel-post');
  const btnSave = profile.querySelector('.btn-save-post');

  btnupdate.addEventListener('click', (e) => {
    e.preventDefault();
    selectGrade.disabled = false;
    selectLevel.disabled = false;
    selectCampus.disabled = false;
    nameuser.contentEditable = 'true';
    nameuser.focus();
    btnphotouser.classList.remove('hide');
    btnCancel.classList.remove('hide');
    btnSave.classList.remove('hide');
    btnupdate.classList.add('hide');
  });
  const editrofile = () => {
    selectGrade.disabled = true;
    selectLevel.disabled = true;
    selectCampus.disabled = true;
    btnphotouser.classList.add('hide');
    nameuser.contentEditable = 'false';
    btnCancel.classList.add('hide');
    btnSave.classList.add('hide');
    btnupdate.classList.remove('hide');
  };
  let file = '';
  btnCancel.addEventListener('click', (e) => {
    e.preventDefault();
    selectGrade.value = `${resultUser.data().grade}`;
    selectLevel.value = `${resultUser.data().level}`;
    selectCampus.value = `${resultUser.data().campus}`;
    nameuser.textContent = `${resultUser.data().name}`;
    photoProfile.src = `${resultUser.data().photo}`;
    file = '';
    editrofile();
  });
  // editando foto de usuario
  selectphoto.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      photoProfile.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    file = e.target.files[0];
  });
  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    editrofile();
    if (file === '') {
      updateLote(resultUser.id, nameuser.textContent, selectLevel.value, selectGrade.value, `${resultUser.data().photo}`, selectCampus.value, arrayPost);
    } else {
      uploadImgUser(file, resultUser.id)
        .then((url) => {
          updateLote(resultUser.id, nameuser.textContent, selectLevel.value, selectGrade.value,
            url, selectCampus.value, arrayPost);
        });
    }
    file = '';
  });
  // Mostrando solo los post del usuario
  const myPost = profile.querySelector('.my-post');
  getAllPost((array) => {
    myPost.innerHTML = '';
    array.forEach((post) => {
      if (post.userId === resultUser.id) {
        myPost.appendChild(allPost(post, resultUser));
      }
    });
  });
  return profile;
};
