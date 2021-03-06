// =========================================================
// * Vue Material Dashboard - v1.3.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// vuex setup
import store from "./store";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import axios from "axios";

// Moment
import moment from "moment";
import VueMomentJS from "vue-momentjs";

// 반응형 미디어쿼리
import VueMq from "vue-mq";

// Highlight.js
import VueHighlightJS from "vue-highlightjs";

Vue.use(VueMq, {
  breakpoints: {
    mobile: 480,
    tablet: 991,
    desktop: Infinity
  }
});

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;
Vue.prototype.$http = axios;

Vue.use(store);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(VueMomentJS, moment);
Vue.use(VueHighlightJS);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  store,
  router,
  data: {
    Chartist: Chartist
  }
});
