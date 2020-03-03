<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link
        v-for="board in boards"
        v-bind:to="board.path"
        v-bind:key="board.id"
      >
        <md-icon>{{ board.icon }}</md-icon>
        <p>{{ board.title }}</p>
      </sidebar-link>

      <sidebar-link to="/extralinks">
        <md-icon>dashboard</md-icon>
        <p>추가 기능</p>
      </sidebar-link>

      <!-- <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      <sidebar-link to="/boards/7">
        <md-icon>content_paste</md-icon>
        <p>자유 게시판 (임시)</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data() {
    return {
      boards: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var vm = this;
      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get("http://api.dasom.io/boards")
        .then(res => {
          res.data.data.boards.forEach(element => {

            var path = "/boards/" + String(element.id);
            var title = element.title;
            var icon = element.icon_class;

            vm.boards.push({
              id: element.id,
              path: path,
              title: title,
              icon: icon
            });
          });
        })
        .catch(error => {
          console.log("게시판 리스트 로딩 에러 :", error);
          alert("게시판 로딩에 실패하였습니다.");
        });
    }
  }
};
</script>
