<!-- 
Created by Freckie.
for table test
-->

<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">{{ boardData.title }}</h4>
          </md-card-header>
          <md-card-content>
            <FreeBoardTable></FreeBoardTable>
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
      boardData: {}
    };
  },
  methods: {
    getBoardData() {
      var vm = this;
      var token = localStorage.getItem("accessToken");
      let config = {
        headers: {
          Authorization: token
        }
      };
      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get("http://api.dasom.io/boards", config)
        .then(res => {
          console.log(res);
          var boards = res.data.data.boards;
          boards.forEach(function(element) {
            if (element.id == 7) {
              vm.boardData = element;
            }
          });
        })
        .catch(error => {
          if (error.response.status == 403) {
            alert("해당 게시판의 읽기 권한이 부족합니다.");
            this.$router.push("/");
          } else if (error.response.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            this.$router.push("/signin");
          }
        });
    }
  },
  created() {
    this.getBoardData();
  }
};
</script>
