export const createUser = (id, userName, userPhoto, userGrade, userDescription) => firebase.firestore().collection('users').doc(id).set({
  name: userName,
  grade: userGrade,
  photo: userPhoto,
  description: userDescription,
});
