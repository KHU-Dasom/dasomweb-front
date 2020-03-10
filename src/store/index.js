// store/index.js

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// JWT
import VueJwtDecode from "vue-jwt-decode";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const resourceHost = "http://api.dasom.io";

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  // data for holding
  state: {
    // tokens
    accessToken: null,
    refreshToken: null,
    userID: null,
    userName: null,
    userBirth: null,
    userEmail: null,
    userLevel: null,
    userEnrollYear: null,
    msgDatas: []
  },
  getters: {},
  mutations: {
    LOGIN(
      state,
      {
        accessToken,
        refreshToken,
        userID,
        userName,
        userBirth,
        userEmail,
        userLevel,
        userEnrollYear,
        accessTokenExpiry
      }
    ) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userID = userID;
      state.userName = userName;
      state.userBirth = userBirth;
      state.userEmail = userEmail;
      state.userLevel = userLevel;
      state.userEnrollYear = userEnrollYear;
      state.accessTokenExpiry = accessTokenExpiry;

      // localStorage에 token 저장.
      localStorage.accessToken = accessToken;
      localStorage.refreshToken = refreshToken;
      localStorage.userID = userID;
      localStorage.userName = userName;
      localStorage.userBirth = userBirth;
      localStorage.userEmail = userEmail;
      localStorage.userLevel = userLevel;
      localStorage.userEnrollYear = userEnrollYear;
      localStorage.accessTokenExpiry = accessTokenExpiry;
    },
    LOGOUT(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userID = null;
      state.userName = null;
      state.userBirth = null;
      state.userEmail = null;
      state.userLevel = null;
      state.userEnrollYear = null;
      state.accessTokenExpiry = null;

      // localStorage에 들어있는 token들 모두 제거.
      localStorage.clear();
    },
    PushMsgData(state, {message, from}) {
      state.msgDatas.push({"message": message, "from": from});
    }
  },
  actions: {
    LOGIN({ commit }, { id, password }) {
      return axios
        .post(
          `${resourceHost}/signin`,
          {
            id: Number(id),
            password: password
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          var parsedData = res.data.data;
          var atoken = VueJwtDecode.decode(parsedData.access_token);
          var user_name = decodeURIComponent(escape(atoken.user_name));
          console.log("Signin succeed. Welcome, %s.", user_name);

          // commit LOGIN Action
          commit("LOGIN", {
            accessToken: parsedData.access_token,
            refreshToken: parsedData.refresh_token,
            userID: atoken.user_id,
            userName: user_name,
            userBirth: atoken.user_birth,
            userEmail: atoken.user_email,
            userLevel: atoken.user_level,
            userEnrollYear: atoken.user_enroll_year,
            accessTokenExpiry: atoken.exp
          });
          axios.defaults.headers.common[
            "Authorization"
          ] = `${parsedData.accessToken}`;
        });
    },
    LOGOUT({ commit }) {
      commit("LOGOUT");
    }
  }
});
