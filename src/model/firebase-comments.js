export const createCommnets = (idPost, date, name, photoUser,text,idUser) => firebase.firestore().collection(`posts/${idPost}/comments`).add({
    dateComment: date,
    nameComment: name,
    photoUser: photoUser,
    idUserComment: idUser,
    textComment: text,
});
export const getAllComments = (idPost, callback) => firebase.firestore().collection('posts').doc(idPost).collection('comments')
  .orderBy('dateComment')
  .onSnapshot((querySnapshot) =>{
    const arrayComment = [];
    querySnapshot.forEach((comment) =>{
      arrayComment.push({
        id: comment.id,
        name: comment.data().nameComment,
        photo: comment.data().photoUser,
        date: comment.data().dateComment,
        textComment: comment.data().textComment,
        iduser: comment.data().idUserComment,
      });
    });
    callback(arrayComment);
  });
