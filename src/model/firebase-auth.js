export const newUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
};
export const logIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
export const fbLogin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
export const logOut = () => firebase.auth().signOut();
