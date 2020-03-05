<template>
  <div>
    <!-- 테이블 -->
    <md-table
      v-model="articles"
      @md-selected="onSelect"
      :table-header-color="tableHeaderColor"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="single"
        :key="item.id"
      >
        <!--
        <md-table-cell md-label="ID" @click="onclickArticle()">{{
          item.id
        }}</md-table-cell>-->
        <md-table-cell md-label="제목">{{ item.short_title }}</md-table-cell>
        <md-table-cell md-label="작성 시간">{{
          item.published_at_kor
        }}</md-table-cell>
        <md-table-cell md-label="작성자">{{ item.author_name }}</md-table-cell>
        <md-table-cell md-label="조회수">{{ item.views }}</md-table-cell>
      </md-table-row>
    </md-table>

    <!-- 글쓰기 -->
    <div class="buttons-wrapper">
      <md-button class="md-dense md-provence" @click="newArticle">새로운 글</md-button>
    </div>

    <!-- 페이지네이션 -->
    <md-divider></md-divider>
    <div class="pagination-wrapper" :key="pagination.current">
      <md-button
        class="md-dense md-provence pagination-button"
        @click="prevPage"
        >이전</md-button
      >
      <span class="pagination-span"
        >{{ pagination.current + 1 }} / {{ pagination.count }}</span
      >
      <md-button
        class="md-dense md-provence pagination-button"
        @click="nextPage"
        >다음</md-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "freeboard-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "pantone-provence"
    }
  },
  watch: {
    "pagination.current": {
      handler: function() {
        this.$router
          .push({
            path: "/boards/" + this.boardID,
            query: {
              page: this.pagination.current
            }
          })
          .catch(error => {
            if (error.name != "NavigationDuplicated") {
              throw error;
            }
          });
      }
    }
  },
  data() {
    return {
      boardID: null,
      selected: [],
      articles: [],
      pagination: {
        current: 0,
        count: 1
      }
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    newArticle() {
      this.$router.push({
        path: "/newarticle",
        query: {
          board_id: this.boardID
        }
      });
    },
    nextPage() {
      if (this.pagination.current < this.pagination.count - 1) {
        this.pagination.current += 1;
      }
    },
    prevPage() {
      if (this.pagination.current > 0) {
        this.pagination.current -= 1;
      }
    },
    fetchData() {
      var vm = this;

      // Router Parameters
      this.boardID = this.$route.params.board_id;
      this.pagination.current = this.$route.query.page;

      var url =
        "http://api.dasom.io/boards/" +
        this.boardID +
        "/articles?page=" +
        this.pagination.current;

      var token = localStorage.getItem("accessToken");
      let config = {
        headers: {
          Authorization: token
        }
      };
      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get(url, config)
        .then(res => {
          vm.articles = res.data.data.articles;
          vm.pagination.count = res.data.data.page_counts;
          vm.pagination.current = res.data.data.page;
        })
        .catch(error => {
          if (error.response.request.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            vm.$router.push({
              path: "/signin",
              query: {
                redirectPath: encodeURI(vm.$route.path)
              }
            });
          }
        });
    },
    onSelect(item) {
      this.$router.push(this.boardID + "/articles/" + item.id);
    }
  }
};
</script>

<style scoped>
.buttons-wrapper {
  text-align: right;
  margin: 0 1rem;
}

.pagination-wrapper {
  text-align: center;
  margin-top: 1rem;
}

.pagination-button {
  vertical-align: -webkit-baseline-middle;
}

.pagination-span {
  vertical-align: sub;
  padding: 0 1rem;
}
</style>
