//import Vue from 'vue'
import store from "../store";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";

import Albums from "@/pages/Albums.vue";
import AlbumView from "@/pages/AlbumView.vue";
import AlbumCreation from "@/pages/AlbumCreation.vue";
import FreeBoard from "@/pages/FreeBoard.vue";
import ArticleShow from "@/pages/ArticleShow.vue";
import ArticleCreation from "@/pages/ArticleCreation.vue";
import Chat from "@/pages/Chat.vue";

import Signin from "@/pages/Signin.vue";
import Signup from "@/pages/Signup.vue";
import Signout from "@/pages/Signout.vue";

// 로그인이 필요한 Route는 이 함수를 먼저(beforeEnter) 실행한다.
const requireAuth = () => (from, to, next) => {
  if (
    store.state.accessToken !== null &&
    localStorage.getItem("accessToken") !== null
  ) {
    return next();
  } else {
    console.log("Unauthorized.");
    alert("로그인이 필요한 서비스입니다.");
    next("/signin");
  }
};

const routes = [
  /* 사이드바가 없는 route들 */
  {
    // 로그인
    path: "/signin",
    name: "Signin",
    component: Signin
  },
  {
    // 회원가입
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    // 로그아웃
    path: "/signout",
    name: "Signout",
    component: Signout
  },
  /* 사이드바가 있는 route들 (커뮤니티) */
  {
    path: "/community",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        // 앨범 갤러리
        path: "/albums",
        name: "Albums",
        component: Albums,
        beforeEnter: requireAuth()
      },
      {
        // 앨범 갤러리
        path: "/albums/:album_id",
        name: "AlbumView",
        component: AlbumView,
        beforeEnter: requireAuth()
      },
      {
        // 앨범 생성
        path: "/newalbum",
        name: "AlbumCreation",
        component: AlbumCreation,
        beforeEnter: requireAuth()
      },
      {
        // 게시판 출력
        path: "/boards/:board_id",
        name: "FreeBoard",
        component: FreeBoard,
        beforeEnter: requireAuth()
      },
      {
        // 게시글 출력
        path: "/boards/:board_id/articles/:article_id",
        name: "ArticleShow",
        component: ArticleShow,
        beforeEnter: requireAuth()
      },
      {
        // 게시글 생성
        path: "/newarticle",
        name: "ArticleCreation",
        component: ArticleCreation,
        beforeEnter: requireAuth()
      },
      {
        // 게시글 수정
        path: "/modifyarticle",
        name: "ArticleModify",
        component: ArticleCreation,
        beforeEnter: requireAuth()
      },
      {
        // 채팅
        path: "/chat",
        name: "Chat",
        component: Chat,
        beforeEnter: requireAuth()
      }
    ]
  }
];

export default routes;
