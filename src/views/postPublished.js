import { user } from "../model/firebase-user.js";

import{ deleteDoc, updatePost, updateLike } from "../model/firebase-posts.js";

import{ createCommnets, getAllComments } from "../model/firebase-comments.js";

import { allComments } from './postComments.js';

export const allPost = (post,resultUser) => {
  const userId = user().uid;
  const viewpostpublish = document.createElement('article');
  viewpostpublish.innerHTML = `
     <div class='post'>
       <div class="header-post">
          <div class='header-post-data'>
           <img class="photo-user" src="${post.photo}" alt="">
           <div>
            <p>${post.name}</p>
            <div class='post-date-state'>
              <p>${post.date}</p>
              <select id="post-new-privacy" disabled="true">
                <option value="public" ${(post.state==='public')? 'selected':''}>🌎 Público</option>
                <option value="private" ${(post.state==='public')? '':'selected'}>🔒 Privado</option>
              </select>
            </div>
           </div> 
          </div>
           <div class="container-menu-post" id="containerMenu">
              <button id='menu-${post.id}' class='${(userId !== post.userId)? 'hide' : 'photo-user btn-menu-post'}'><i class="fas fa-ellipsis-h"></i></button>
              <nav class="nav-post hide" id="nav-${post.id}">
                <ul class="menu-post">
                  <li class="btn-post-edit" id="edit-${post.id}">Editar</li>
                  <li class="btn-post-delete" id="delete-${post.id}">Eliminar</li>
                </ul>
              </nav>
            </div>
        </div>
        <textarea class='hide post-text-area' id='inputPost-${post.id}'>${post.content}</textarea>
        <div id="div-post-${post.id}" class='post-publised'>${post.content}</div>
        <div class="hide buttons-post">
          <button class="btn-save-post" id="btnSave">Guardar</button>
          <button class="btn-cancel-post" id="btnCancel">Cancelar</button>
        </div>
        <div ><img class='cont-img-post' src='${post.img}'></div>
        <div class="footer-postpublised">
          <p class="counter-like">${post.likes.length}</p>
          <button type="button" class="btn-like ${(post.likes.indexOf(userId)===-1)?'like-ligth': 'like-dark'}"><i class="far fa-thumbs-up"></i> Me gusta</button>
          <button type="button" class="btn-comments"><i class="far fa-comment-alt"></i> Comentarios</button>
        </div>
        <section class="comments hide">
          <div class="new-comment">
            <img class="photo-user" src="${resultUser.data().photo}" alt="">
            <textarea id="txtNewComm-${post.id}" class='text-comment' placeholder="Escriba un comentario"></textarea>
            <i class="fas fa-paper-plane btn-new-comment"></i>
          </div>
          <section class="all-comments"></section>
        </section>
     </div>
  `;
  const optionPrivaty = viewpostpublish.querySelector('#post-new-privacy');
  // Menu de post editar y eliminar
  const menuPost = viewpostpublish.querySelector(`#menu-${post.id}`);
  const navPost = viewpostpublish.querySelector(`#nav-${post.id}`);
  menuPost.addEventListener('click', () => {
    navPost.classList.toggle('hide');
  });

  // Editar post
  const postdivText = viewpostpublish.querySelector(`#div-post-${post.id}`);
  const inputPost = viewpostpublish.querySelector(`#inputPost-${post.id}`);
  const btnSave = viewpostpublish.querySelector('#btnSave');
  const btnCancel = viewpostpublish.querySelector('#btnCancel');
  const btnpost = viewpostpublish.querySelector('.buttons-post');
  const btnEdit = viewpostpublish.querySelector(`#edit-${post.id}`);
  btnEdit.addEventListener('click', () => {
    postdivText.classList.add('hide');
    inputPost.classList.remove('hide');
    inputPost.focus();
    navPost.classList.add('hide');
    btnpost.classList.remove('hide');
    optionPrivaty.disabled =false;
    btnSave.disabled =true;  
  });
  const editPost = () =>{
    postdivText.classList.remove('hide');
    inputPost.classList.add('hide');
    btnpost.classList.add('hide');
    optionPrivaty.disabled = true;

  };
  btnCancel.addEventListener('click', () => {
    inputPost.value = postdivText.textContent;
    editPost();
  });
  inputPost.addEventListener('input', ()=>{
    if(inputPost.value.trim() === ''){
      btnSave.disabled =true;    
    } else{
      btnSave.disabled=false;
    }
  });
  btnSave.addEventListener('click',() =>{
    editPost();
    updatePost(post.id, inputPost.value, optionPrivaty.value);

  });
  // Eliminar post
  const btnDelete = viewpostpublish.querySelector(`#delete-${post.id}`);
  btnDelete.addEventListener('click', () => {
    deleteDoc('posts',post.id)
  });
  //Contabilizador de like
  const btnLike = viewpostpublish.querySelector('.btn-like');
  btnLike.addEventListener('click', ()=>{
    const resultLike = post.likes.indexOf(userId);
    if(resultLike === -1){
      post.likes.push(userId);
      updateLike(post.id, post.likes)
    }else {
      post.likes.splice(resultLike,1);
      updateLike(post.id, post.likes);
    }
  });
  // Creando Comentarios
  const comment = viewpostpublish.querySelector('.comments');
  const btnComment = viewpostpublish.querySelector('.btn-comments');
  btnComment.addEventListener('click', () => {
    comment.classList.toggle('hide');
  })
  const btnNewComment =viewpostpublish.querySelector('.btn-new-comment');
  btnNewComment.addEventListener('click', () => {
    const textcomment = viewpostpublish.querySelector(`#txtNewComm-${post.id}`).value;
    if(textcomment !== ''){
      const date = new Date().toLocaleString();
       createCommnets(post.id,date,resultUser.data().name,resultUser.data().photo,textcomment,resultUser.id);
    }
    viewpostpublish.querySelector(`#txtNewComm-${post.id}`).value='';
  });
// Mostrando comentarios
const commentSection = viewpostpublish.querySelector('.all-comments')
getAllComments(post.id, (arrayComment) => {
  commentSection.innerHTML = '';
  arrayComment.forEach((comment) =>{
    commentSection.appendChild(allComments(comment,resultUser));
  });
});

  return viewpostpublish;
};

/** <textarea id="textarea-${post.id}" class='post-publised' disabled="true">${post.content}</textarea> */