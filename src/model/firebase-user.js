//  Crea un nuevo usuario
export const createUser = (user, fullname) => {
  let userPhoto = '/img/perfil.png';
  if (`${user.photoURL}` !== 'null') userPhoto = `${user.photoURL}`;
  return firebase.firestore().collection('users').doc(`${user.uid}`).set({
    name: fullname,
    level: 'Primaria',
    grade: '1°',
    photo: userPhoto,
    email: `${user.email}`,
    campus: 'Lima',
  });
};
// PRUEBA LOTE
export const updateLote = (id, nameUser, levelUser, gradeUser, photoUser, campUser, arrayPost) => {
  const batch = firebase.firestore().batch();
  const userRef = firebase.firestore().collection('users').doc(id);
  batch.update(userRef, {
    name: nameUser,
    level: levelUser,
    grade: gradeUser,
    photo: photoUser,
    campus: campUser,
  });

  arrayPost.forEach((post) => {
    if (post.userId === id) {
      const postRef = firebase.firestore().collection('posts').doc(post.id);
      batch.update(postRef, {
        name: nameUser,
        photo: photoUser,
      });
    }
  });
  batch.commit()
    .then(() => {
      console.log('lote');
    });
};

// Actualiza datos del usuario
/*
export const updateUser = (id,name ,photo , grade, level, campus) =>firebase.firestore()
.collection('users').doc(id).update({
  name: name,
  level: level,
  grade: grade,
  photo: photo,
  campus: campus,
});
*/
// Lee los datos de un usuario
export const dataUser = usuario => firebase.firestore().collection('users').doc(usuario).get();

// Usuario loggeado
export const user = () => firebase.auth().currentUser;

// Verificamos que haya un usuario logeado y tenga acceso reciena la app
export const validationUser = callback => firebase.auth().onAuthStateChanged((userLoad) => {
  let route = '#/';
  if (window.location.hash === '#/Registro') route = '#/Registro';
  if (userLoad) {
    route = window.location.hash;
  }
  return callback(route);
});
export const dataUserConecting = (iduser, callback) => firebase.firestore().collection('users').doc(iduser)
  .onSnapshot((querySnapshot) => {
    callback(querySnapshot);
  });
