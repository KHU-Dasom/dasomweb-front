<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">갤러리</h4>
          </md-card-header>
          <md-card-content :key="$route.fullPath">
            <album-list-table></album-list-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { AlbumListTable } from "@/components";

export default {
  components: {
    AlbumListTable
  },
  data() {
    return {
      albums: []
    };
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    console.log(this.$route);
    this.fetchData();
  },
  methods: {
    fetchData() {
      let vm = this; // 화살표 함수 안 에서는 this가 정의되지 않음.
      var token = this.$store.getters.getAccessToken;
      let config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };

      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get("http://api.dasom.io/albums", config)
        .then(res => {
          var vm = this;
          var data = res.data.data;

          // 앨범 데이터 가져오기
          if (data.album_counts > 0) {
            data.albums.forEach(element => {
              vm.albums.push(element);
            });
          }
        })
        .catch(error => {
          console.log("여기 error", error);
          if (error.response.request.status == 403) {
            alert("앨범의 읽기 권한이 부족합니다.");
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
