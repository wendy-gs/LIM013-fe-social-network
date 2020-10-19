import{ deleteDoc } from "../model/firebase-posts.js";

import{ updateComments } from "../model/firebase-comments.js";

export const allComments = (comment,resultUser) =>{
	const viewComments = document.createElement('article');
	viewComments.innerHTML = `
		<div class="comment-user">
			<img class="photo-user" src="${comment.photo}" alt="">
			<div class= 'hide edit-comment'>
			<textarea class='post-text-area' id='inputComment-${comment.id}'>${comment.textComment}</textarea>
				<button class="btn-save-post" id="btnSave">Guardar</button>
				<button class="btn-cancel-post" id="btnCancel">Cancelar</button>
			</div>
			<div id="div-comment-${comment.id}" class='post-publised-comment'>${comment.name} ${comment.date}<br> ${comment.textComment}</div>
			<div class="container-menu-post">
        <button id= 'menu-${comment.id}' class='${(resultUser.id === comment.iduser) ? 'photo-user btn-menu-post' : 'hide'}'><i class="fas fa-ellipsis-h"></i></button>
          <nav class="nav-post hide" id='nav-${comment.id}'>
            <ul class="menu-post">
              <li class="btn-post-edit">Editar</li>
              <li class="btn-post-delete">Eliminar</li>
            </ul>
          </nav>
      </div>
		</div>
	`;
	// Menu de editar y eliminar post
	const navComment = viewComments.querySelector(`#nav-${comment.id}`);
	const menuComment = viewComments.querySelector(`#menu-${comment.id}`);
	menuComment.addEventListener('click', () => {
		navComment.classList.toggle('hide');
	});
	//Editar comentario
	const btnComment = viewComments.querySelector('.edit-comment');
	const divComment = viewComments.querySelector(`#div-comment-${comment.id}`);
	const textComment = viewComments.querySelector(`#inputComment-${comment.id}`);
	const btnEdit = viewComments.querySelector('.btn-post-edit');
	const btnSave = viewComments.querySelector('.btn-save-post');
	const btnCancel = viewComments.querySelector('.btn-cancel-post');
	btnEdit.addEventListener('click', () =>{
		divComment.classList.add('hide');
		btnComment.classList.remove('hide');
		navComment.classList.add('hide');
		textComment.focus();
		btnSave.disabled = true;
	})
	const editComment = () =>{
		divComment.classList.remove('hide');
		btnComment.classList.add('hide');
	};
	btnCancel.addEventListener('click', () =>{
		textComment.value = divComment.textContent;
		editComment();
	});
	textComment.addEventListener('input', ()=>{
		if(textComment.value.trim() === ''){
			btnSave.disabled = true;
		}else{
			btnSave.disabled = false;
		}
	})
	btnSave.addEventListener('click', ()=>{
		updateComments(textComment.value,comment.idPost,comment.id);
		editComment();
	})


	
	//Eliminar comentario
	const btnDelete = viewComments.querySelector('.btn-post-delete');
	btnDelete.addEventListener('click', ()=>{
		deleteDoc(`posts/${comment.idPost}/comments`,comment.id);
	});
return viewComments;
}