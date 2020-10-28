import MockFirebase from 'mock-cloud-firestore';

import {
  createPost, getAllPost, deleteDoc, updatePost, updateLike,
} from '../src/model/firebase-posts';

import { createComments, getAllComments, updateComments } from '../src/model/firebase-comments';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post_001: {
          userId: '01',
          name: 'Usuario 1',
          photo: '',
          contentPost: 'Post uno',
          img: '',
          state: '',
          date: '',
          likes: [],
          __collection__: {
            comments: {
              __doc__: {
                comment_001: {
                  dateComment: '',
                  idPost: 'post0001',
                  nameComment: 'Usuario 1',
                  photoUser: '',
                  idUserComment: '01',
                  textComment: 'Comentario en el post 1',
                },
              },
            },
          },
        },
        post_002: {
          userId: '02',
          name: 'Usuario 2',
          photo: '',
          contentPost: 'Post dos',
          img: '',
          state: '',
          date: '',
          likes: [],
          __collection__: {
            comments: {
              __doc__: {
                comment_001: {
                  dateComment: '',
                  idPost: 'post0002',
                  nameComment: 'Usuario 2',
                  photoUser: '',
                  idUserComment: '02',
                  textComment: 'Comentario en el post 2',
                },
              },
            },
          },
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('createPost', () => {
  it('Debería crear un post', done => createPost('03', 'Post 3', '', '', '', 'Usuario 3', '')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.content === 'Post 3');
        expect(result.content).toBe('Post 3');
        done();
      };
      getAllPost(callback);
    }));
});

describe('deleteDoc', () => {
  it('Debería eliminar un post', done => deleteDoc('posts', 'post_002')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.id === 'post_002');
        expect(result).toBe(undefined);
        done();
      };
      getAllPost(callback);
    }));
});

describe('updatePost', () => {
  it('Debería modificar un post', done => updatePost('post_001', 'Post uno modificado', 'privado')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.id === 'post_001');
        expect(result.content).toBe('Post uno modificado');
        done();
      };
      getAllPost(callback);
    }));
});

describe('updateLike', () => {
  it('Debería modificar el like del post', done => updateLike('post_001', 'Usuario 1')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.id === 'post_001');
        expect(result.likes).toBe('Usuario 1');
        done();
      };
      getAllPost(callback);
    }));
});

describe('createComments', () => {
  it('Debería crear un comentario dentro de un post', done => createComments('post_001', '', 'Usuario 1', '', 'Comentario nuevo', '01')
    .then(() => {
      const callback = (comment) => {
        const result = comment.find(element => element.textComment === 'Comentario nuevo');
        expect(result.textComment).toBe('Comentario nuevo');
        done();
      };
      getAllComments('post_001', callback);
    }));
});

describe('updateComments', () => {
  it('Debería modificar el comentario deun post', done => updateComments('Comentario post 1 modificado', 'post_001', 'comment_001')
    .then(() => {
      const callback = (comment) => {
        const result = comment.find(element => element.id === 'comment_001');
        expect(result.textComment).toBe('Comentario post 1 modificado');
        done();
      };
      getAllComments('post_001', callback);
    }));
});
