import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
   return new Vuex.Store({

     state: {
       loadedPosts: []
     },
     mutations: {
       setPosts(state, posts) {
         state.loadedPosts = posts;
       },
       addPost(state, postData) {
         state.loadedPosts.push(postData);
       },
       editPost(state, editedPost) {
         const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
         state.loadedPosts[postIndex] = editedPost;
       }
     },
     actions: {
       nuxtServerInit(vueContext, context) {
          return axios.get(process.env.baseUrl + '/posts.json')
            .then(res => {
              const postsArray = [];
              for (const key in res.data) {
                postsArray.push({ ...res.data[key], id: key });
              }
              vueContext.commit('setPosts', postsArray)
            })
            .catch(e => context.error(e));
       },
       addPost(vuexContext, postData) {
         const createdPost = {...postData, updatedDate: new Date()};
         return axios.post('https://maron-nuxt-blog.firebaseio.com/posts.json', createdPost)
           .then(result => {
             vuexContext.commit('addPost', {...createdPost, id: result.data.name});
           })
           .catch(e => console.log(e));
       },
       editPost(vuexContext, editedPost) {
         return axios.put('https://maron-nuxt-blog.firebaseio.com/posts/' + editedPost.id + '.json',
           {
             ...editedPost,
             updatedDate: new Date()
           }
         )
           .then(result => {
              vuexContext.commit('editPost', editedPost)
           })
           .catch(e => console.log(e));
       },
       setPosts(vuexContext, posts) {
         vuexContext.commit('setPosts', posts);
       }
     },
     getters: {
        loadedPosts(state) {
          return state.loadedPosts
        }
     }

   });
}

export default createStore;
