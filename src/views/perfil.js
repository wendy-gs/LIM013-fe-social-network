import { getAllPost } from '../model/firebase-posts.js';

import { updateUser } from '../model/firebase-user.js';

import { allPost } from './postPublished.js';

import { updatePostUser } from '../model/firebase-posts.js';

import { uploadImgUser } from '../model/storage.js';

export const profileView = (resultUser) => {
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
      <form class='card'>
        <fieldset>
        <label for ="levelUser"><i class="fas fa-user-graduate"></i>  Nivel</label>
        <select id="levelUser" disabled="true">
          <option value="Primaria" ${(resultUser.data().level === "Primaria" )? 'selected' : ''}>Primaria</option>
          <option value="Secundaria" ${(resultUser.data().level === "Secundaria" )? 'selected' : ''}>Secundaria</option>
        </select> <br>
        <label for ="gradeUser"><i class="fas fa-graduation-cap"></i>  Grado</label>
        <select id="gradeUser" disabled="true">
          <option value="1°" ${(resultUser.data().grade === "1°" )? 'selected' : ''}>1°</option>
          <option value="2°" ${(resultUser.data().grade === "2°" )? 'selected' : ''}>2°</option>
          <option value="3°" ${(resultUser.data().grade === "3°" )? 'selected' : ''}>3°</option>
          <option value="4°" ${(resultUser.data().grade === "4°" )? 'selected' : ''}>4°</option>
          <option value="5°" ${(resultUser.data().grade === "5°" )? 'selected' : ''}>5°</option>
          <option value="6°" ${(resultUser.data().grade === "6°" )? 'selected' : ''}>6°</option>
        </select><br>
        <label for ="campusUser"><i class="fas fa-map-marker-alt"></i>  Sede</label>
        <select id="campusUser" disabled="true">
          <option value="Arequipa" ${(resultUser.data().campus === "Arequipa" )? 'selected' : ''}>Arequipa</option>
          <option value="Chiclayo" ${(resultUser.data().campus === "Chiclayo" )? 'selected' : ''}>Chiclayo</option>
          <option value="Lima" ${(resultUser.data().campus === "Lima" )? 'selected' : ''}>Lima</option>
          <option value="Trujillo" ${(resultUser.data().campus === "Trujillo" )? 'selected' : ''}>Trujillo</option>
        </select>
        </fieldset>
        <button class="btn-save-post" id="btnSave">Guardar</button>
        <button class="btn-cancel-post" id="btnCancel">Cancelar</button>
        <button class='btn-update'>Actualizar Datos</button> 
      </form>
      <section class='my-post all-post'>
      </section>

    </div>
  </section> `;
 
  //Editar los datos del usuario
  const selectphoto = profile.querySelector('#selectphoto');
  const btnphotouser = profile.querySelector('#new-photo');
  const photoProfile = profile.querySelector('#photo-viewprofile');
  const nameuser = profile.querySelector('.name');
  const selectGrade = profile.querySelector('#gradeUser');
  const selectLevel = profile.querySelector('#levelUser');
  const selectCampus = profile.querySelector('#campusUser');
  const btnupdate = profile.querySelector('.btn-update');

  btnupdate.addEventListener('click', () => {
    selectGrade.disabled =false;
    selectLevel.disabled =false;
    selectCampus.disabled =false;
    nameuser.contentEditable="true";
    nameuser.focus();
    btnphotouser.classList.remove('hide');
  });
  let file='';
  const btnCancel = profile.querySelector('.btn-cancel-post');
  btnCancel.addEventListener('click', ()=>{
    selectGrade.value=`${resultUser.data().grade}`;
    selectLevel.value=`${resultUser.data().level}`;
    selectCampus.value= `${resultUser.data().campus}`;
    nameuser.textContent=`${resultUser.data().name}`;
    btnphotouser.classList.add('hide');
    photoProfile.src=`${resultUser.data().photo}`;
    file='';
    selectGrade.disabled =true;
    selectLevel.disabled =true;
    selectCampus.disabled =true;
  })
  //editando foto de usuario
  
  selectphoto.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      photoProfile.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    file = e.target.files[0];
  });
  const btnSave = profile.querySelector('.btn-save-post');
  btnSave.addEventListener('click', () =>{
    if(file===''){
      updateUser(resultUser.id,nameuser.textContent,`${resultUser.data().photo}`,selectGrade.value,selectLevel.value,selectCampus.value);
      getAllPost((arrayPost)=>{
        arrayPost.forEach((post)=>{
          if(post.userId === resultUser.id){
           updatePostUser(post.id, nameuser.textContent,`${resultUser.data().photo}`);
          }
        });
      });
    }else{
      uploadImgUser(file, resultUser.id)
      .then((url) =>{
        updateUser(resultUser.id,nameuser.textContent,url,selectGrade.value,selectLevel.value,selectCampus.value);
        getAllPost((arrayPost)=>{
          arrayPost.forEach((post)=>{
            if(post.userId === resultUser.id){
             updatePostUser(post.id, nameuser.textContent,url);
            }
          });
        });
      });
    }

  })
  //Mostrando solo los post del usuario
  const myPost =profile.querySelector('.my-post');
  getAllPost((arrayPost)=>{
    myPost.innerHTML='';
    arrayPost.forEach((post)=>{
      console.log(resultUser.id);
      if(post.userId === resultUser.id){
        myPost.appendChild(allPost(post,resultUser));
      }
    });
  });
  return profile;
};
