export const logIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logInFb = () => {
  const providerFb = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(providerFb);
};

export const logInGm = () => {
  const providerGm = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(providerGm);
};

export const register = (email, pass) => {
  return firebase.auth().createUserWithEmailAndPassword(email, pass);
};
export const logOut = () => firebase.auth().signOut();
