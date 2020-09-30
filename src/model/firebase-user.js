//  Crea un nuevo usuario
export const createUser = (id, userName, userPhoto, userGrade, userEmail, userLevel, userCampus) => firebase.firestore().collection('users').doc(id).set({
  name: userName,
  level: userLevel,
  grade: userGrade,
  photo: userPhoto,
  email: userEmail,
  campus: userCampus,
});
  // Lee los datos de un usuario
export const dataUser = usuario => firebase.firestore().collection('users').doc(usuario).get();
