import Vue from "vue";
import VueLocalStorage from 'vue-localstorage';
import VueResource from 'vue-resource';
import UserService from './core/services/UserService'
import GithubService from "./core/services/GithubService";
import RepositoryService from "./core/services/RepositoryService";
import VerificationFormUtil from './core/utils/VerificationFormUtil'
import App from "./components/vues/App.vue";
import routes from "./core/router/route.js";
import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueLocalStorage);

// TODO Remplacer vue-resource par axios
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;
    next();
});

Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
Vue.http.options.crossOrigin = true;
Vue.http.headers.common['Access-Control-Allow-Origin'] = 'localhost:3000';
Vue.config.productionTip = false;

Vue.utils = {};
Vue.utils.verificationForm = new VerificationFormUtil();
Vue.services = {};
Vue.services.user = new UserService(Vue.http, 'http://localhost:3000');
Vue.services.github = new GithubService(Vue.http, 'http://localhost:3000');
Vue.services.repository = new RepositoryService(Vue.http, 'http://localhost:3000');

new Vue({
  el: "#app",
  router: new VueRouter({
      mode: "history",
      routes
  }),
  localStorage: {
      userLogin: {
          type: String,
          default: ''
      },
      userOrganization: {
          type: String,
          default: ''
      },
      userId: {
          type: String,
          default: ''
      },
      userToken: {
          type: String,
          default: ''
      }
  },
  render: h => h(App)
}).$mount("#app");
