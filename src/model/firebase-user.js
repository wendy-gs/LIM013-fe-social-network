//  Crea un nuevo usuario
export const createUser = (id, userName, userPhoto, userGrade, userEmail, userDescription) => firebase.firestore().collection('usersPrueba').doc(id).set({
  name: userName,
  grade: userGrade,
  photo: userPhoto,
  email: userEmail,
  description: userDescription,
});
// Lee los datos de un usuario
export const dataUser = usuario => firebase.firestore().collection('usersPrueba').doc(usuario).get();
