export const createPost = (id, content, imgPost, privacy, time, userName, userPhoto) => firebase.firestore().collection('posts').add({
  userId: id,
  name: userName,
  photo: userPhoto,
  contentPost: content,
  img: imgPost,
  state: privacy,
  date: time,
  likes: [],
});

export const getAllPost = callback => firebase.firestore().collection('posts')
.orderBy('date','desc')  
.onSnapshot((querySnapshot) => {
    const arrayPost = [];
    querySnapshot.forEach((doc) => {
      arrayPost.push({
        id: doc.id,
        name: doc.data().name,
        photo: doc.data().photo,
        userId: doc.data().userId,
        content: doc.data().contentPost,
        img: doc.data().img,
        state: doc.data().state,
        date: doc.data().date,
        likes: doc.data().likes,
      });
    });
    callback(arrayPost);
  });
