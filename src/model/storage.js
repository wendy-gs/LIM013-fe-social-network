export const uploadImgPost = (file, uid) => {
  const refImgPost = firebase.storage().ref(`imagePost/${uid}/${file.name}`);
  return refImgPost.put(file).then(snapshot => (snapshot.ref.getDownloadURL()));
};
