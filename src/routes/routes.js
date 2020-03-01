//import Vue from 'vue'
import store from "../store";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
//import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";

import FreeBoard from "@/pages/FreeBoard.vue";
import Signin from "@/pages/Signin.vue";
import Signup from "@/pages/Signup.vue";
import Signout from "@/pages/Signout.vue";

// 로그인이 필요한 Route는 이 함수를 먼저(beforeEnter) 실행한다.
const requireAuth = () => (from, to, next) => {
  if (store.state.accessToken !== null) {
    return next();
  } else {
    console.log("Unauthorized.");
    alert("로그인이 필요한 서비스입니다.");
    next("/signin");
  }
};

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        // (임시) 7번 자유게시판 출력
        path: "/boards/7",
        name: "FreeBoard",
        component: FreeBoard,
        beforeEnter: requireAuth()
      }
    ]
  },
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
  }
];

export default routes;