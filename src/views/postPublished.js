
export const allPost = (post, author) => {
  const viewpostpublish = document.createElement('article');
  const nameUser = author.name;
  const photoUser = author.photo;
  const imgPost = post.img;
  viewpostpublish.innerHTML = `
     <div class='post'>
       <div class="header-post">
         <div class='header-post-data'>
           <img class="photo-user" src="${photoUser}" alt="">
           <p>${nameUser}</p>
         </div>
        </div>
      
        <textarea id="textarea-${post.id}" class='post-text-area' disabled="true">${post.content}</textarea>
        <div ><img class='cont-img-post' src='${imgPost}'></div>
     </div>
  `;

  return viewpostpublish;
};
