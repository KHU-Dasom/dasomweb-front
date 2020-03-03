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
        <md-table-cell md-label="ID" @click="onclickArticle()">{{
          item.id
        }}</md-table-cell>
        <md-table-cell md-label="제목">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="작성 시간">{{
          item.published_at
        }}</md-table-cell>
        <md-table-cell md-label="작성자">{{ item.author_name }}</md-table-cell>
        <md-table-cell md-label="조회수">{{ item.views }}</md-table-cell>
      </md-table-row>
    </md-table>

    <!-- 페이지네이션 -->
    <div class="pagination-wrapper" :key="pagination.current">
      <md-button
        class="md-dense md-provence"
        @click="prevPage"
        v-bind:disabled="pagination.prevPage"
        >이전</md-button
      >
      <span class="pagination-span md-body-1"
        >{{ pagination.current + 1 }} / {{ pagination.count }}</span
      >
      <md-button
        class="md-dense md-provence"
        @click="nextPage"
        v-bind:disabled="pagination.nextPage"
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
    pagination: {
      deep: true,
      handler() {
        this.fetchData();
        this.pagination.prevDisable = (this.pagination.current == 0);
        this.pagination.nextDisable =
          (this.pagination.current == this.pagination.count - 1);
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
        count: 1,
        prevDisable: false,
        nextDisable: false
      }
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    nextPage() {
      if (this.pagination.current < this.pagination.count - 1) {
        this.pagination.current += 1;
      }
    },
    prevPage() {
      if (this.pagination.current > this.pagination.count - 1) {
        this.pagination.current -= 1;
      }
    },
    fetchData() {
      var vm = this;

      this.boardID = this.$route.params.board_id;
      var url =
        "http://api.dasom.io/boards/" +
        this.boardID +
        "/articles?page=" +
        this.pagination.current;
      console.log(url);

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
          console.log(res);
          vm.articles = res.data.data.articles;
          vm.pagination.count = res.data.data.page_counts;
        })
        .catch(error => {
          if (error.response.request.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            vm.$router.push("/signin");
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
.pagination-wrapper {
  text-align: center;
  margin-top: 1.5rem;
}

.pagination-span {
  padding: 0 1rem;
}
</style>
