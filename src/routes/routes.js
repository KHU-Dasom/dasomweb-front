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
import SearchBoard from "@/pages/SearchBoard.vue";

import Signin from "@/pages/Signin.vue";
import Signup from "@/pages/Signup.vue";
import Signout from "@/pages/Signout.vue";

import Admin from "@/pages/Admin/Admin.vue";
import AdminUsers from "@/pages/Admin/AdminUsers.vue";
import AdminBoards from "@/pages/Admin/AdminBoards.vue";
import AdminMainPage from "@/pages/Admin/AdminMainPage.vue";

// 로그인이 필요한 Route는 이 함수를 먼저(beforeEnter) 실행한다.
const requireAuth = () => (from, to, next) => {
  // 로그인이 되어있는 경우.
  if (
    store.state.accessToken !== null &&
    localStorage.getItem("accessToken") !== null
  ) {
    var refresh_token = store.getters.getRefreshToken;
    store.dispatch("REFRESH", { refresh_token });
    return next();
  }
  // 로그인이 되어있지 않은 경우.
  else {
    console.log("Unauthorized.");
    alert("로그인이 필요한 서비스입니다.");
    next("/signin");
  }
};

// 어드민만 접근 가능한 route에 적용.
const adminAuth = () => (from, to, next) => {
  // 로그인이 되어있는 경우.
  if (
    store.getters.getAccessToken !== null &&
    localStorage.getItem("accessToken") !== null
  ) {
    if (store.getters.getUserInfo.level == 999) {
      var refresh_token = store.getters.getRefreshToken;
      store.dispatch("REFRESH", { refresh_token });
      return next();
    } else {
      console.log("Unauthorized. (Only admins are authorized)");
      alert("관리자용 메뉴입니다.");
      next("/");
    }
  }
  // 로그인이 되어있지 않은 경우.
  else {
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
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      // 커뮤니티 홈
      {
        path: "/home",
        name: "Home",
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
      },
      {
        path: "/search",
        name: "Search",
        component: SearchBoard,
        beforeEnter: requireAuth()
      },
      /* 어드민 메뉴들 */
      {
        // 어드민 메인
        path: "/admin",
        name: "Admin",
        component: Admin,
        beforeEnter: adminAuth()
      },
      {
        // 어드민 유저 관리
        path: "/admin/users",
        name: "AdminUsers",
        component: AdminUsers,
        beforeEnter: adminAuth()
      },
      {
        // 어드민 게시판 관리
        path: "/admin/boards",
        name: "AdminBoards",
        component: AdminBoards,
        beforeEnter: adminAuth()
      },
      {
        // 어드민 메인 페이지 데이터 관리
        path: "/admin/main-page",
        name: "AdminMainPage",
        component: AdminMainPage,
        beforeEnter: adminAuth()
      }
    ]
  }
];

export default routes;
