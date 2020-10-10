
export const allPost = (post) => {
  const viewpostpublish = document.createElement('article');
  viewpostpublish.innerHTML = `
     <div class='post'>
       <div class="header-post">
         <div class='header-post-data'>
           <img class="photo-user" src="${post.photo}" alt="">
           <p>${post.name}</p>
         </div>
        </div>
      
        <textarea id="textarea-${post.id}" class='post-text-area' disabled="true">${post.content}</textarea>
        <div ><img class='cont-img-post' src='${post.img}'></div>
     </div>
  `;

  return viewpostpublish;
};
