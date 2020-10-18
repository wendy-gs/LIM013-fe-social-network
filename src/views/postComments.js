export const allComments = (comment,resultUser) =>{
	const viewComments = document.createElement('article');
	viewComments.innerHTML = `
		<div class="comment-user">
			<img class="photo-user" src="${comment.photo}" alt="">
			<div class= 'hide edit-comment'>
			<textarea class='post-text-area' id='inputPost-${comment.id}'>${comment.textComment}</textarea>
				<button class="btn-save-post" id="btnSave">Guardar</button>
				<button class="btn-cancel-post" id="btnCancel">Cancelar</button>
			</div>
			<div id="div-post-${comment.id}" class='post-publised-comment'>${comment.name} ${comment.date}<br> ${comment.textComment}</div>
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

	return viewComments;
}