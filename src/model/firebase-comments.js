export const createComments = (idPost, date, name, photo, text, idUser) => firebase.firestore().collection(`posts/${idPost}/comments`).add({
  dateComment: date,
  nameComment: name,
  photoUser: photo,
  idUserComment: idUser,
  textComment: text,
});

export const updateComments = (text, idPost, idcoment) => firebase.firestore().collection(`posts/${idPost}/comments`).doc(idcoment).update({
  textComment: text,
});
export const getAllComments = (id, callback) => firebase.firestore().collection('posts').doc(id).collection('comments')
  .orderBy('dateComment', 'desc')
  .onSnapshot((querySnapshot) => {
    const arrayComment = [];
    querySnapshot.forEach((comment) => {
      arrayComment.push({
        id: comment.id,
        name: comment.data().nameComment,
        photo: comment.data().photoUser,
        date: comment.data().dateComment,
        textComment: comment.data().textComment,
        idPost: id,
        iduser: comment.data().idUserComment,
      });
    });
    callback(arrayComment);
  });
