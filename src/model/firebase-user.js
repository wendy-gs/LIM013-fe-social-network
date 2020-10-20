//  Crea un nuevo usuario
export const createUser = (id, userName, userPhoto, userEmail) => firebase.firestore().collection('users').doc(id).set({
  name: userName,
  level: 'Primaria',
  grade: '1°',
  photo: userPhoto,
  email: userEmail,
  campus: 'Lima',
});
// Actualiza datos del usuario
export const updateUser = (id,name ,photo , grade, level, campus) =>firebase.firestore().collection('users').doc(id).update({
  name: name,
  level: level,
  grade: grade,
  photo: photo,
  campus: campus,
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
export const dataUserConecting= (iduser,callback )=> firebase.firestore().collection('users').doc(iduser)
.onSnapshot((querySnapshot) => {
  callback(querySnapshot);
});
