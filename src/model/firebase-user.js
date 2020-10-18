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

// Usuario loggeado
export const user = () => firebase.auth().currentUser;

// Verificamos que haya un usuario logeado y tenga acceso reciena la app
export const validationUser = callback => firebase.auth().onAuthStateChanged((user) => {
  let route = '#/';
  if (window.location.hash === '#/Registro') route = '#/Registro';
  if (user) {
    route = window.location.hash;
  }
  return callback(route);
});
export const dataUserConecting= (iduser,callback )=> firebase.firestore().collection('users').doc(iduser).get()
.then((docuser) => {
  callback(docuser);
});
