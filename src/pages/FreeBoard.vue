<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">{{ boardData.title }}</h4>
          </md-card-header>
          <md-card-content :key="$route.fullPath">
            <FreeBoardTable v-bind:writeLevel="boardData.write_level"></FreeBoardTable>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { FreeBoardTable } from "@/components";

export default {
  components: {
    FreeBoardTable
  },
  data() {
    return {
      boardID: "",
      boardData: {}
    };
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let vm = this; // 화살표 함수 안 에서는 this가 정의되지 않음.
      this.boardID = this.$route.params.board_id;
      var token = this.$store.getters.getAccessToken;
      let config = {
        headers: {
          Authorization: token
        }
      };
      var userInfo = this.$store.getters.getUserInfo;

      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get("http://api.dasom.io/boards", config)
        .then(res => {
          var boards = res.data.data.boards;

          boards.forEach(function(element) {
            // 일치하는 Board 조회
            if (String(element.id) == vm.boardID) {
              // 권한 체크
              if (userInfo.level >= element.read_level) {
                vm.boardData = element;
              } else {
                alert("해당 게시판의 읽기 권한이 부족합니다.");
                vm.$router.push("/");
              }
            }
          });
        })
        .catch(error => {
          console.log("여기 error", error);
          if (error.response.request.status == 403) {
            alert("해당 게시판의 읽기 권한이 부족합니다.");
            vm.$router.push("/");
          } else if (error.response.request.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            vm.$router.push({
              path: "/signin",
              query: {
                redirectPath: encodeURI(vm.$route.path)
              }
            });
          }
        });
    }
  }
};
</script>
