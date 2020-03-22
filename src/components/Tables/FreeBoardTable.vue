<template>
  <div>
    <div v-show="articles.length == 0">
      <md-empty-state
        md-icon="priority_high"
        md-label="게시물이 존재하지 않습니다."
        md-description="새로운 게시물을 작성해서 dasom.io를 풍요롭게 만들어주세요 용사님들!">

        <!-- 글쓰기 -->
        <div class="buttons-wrapper">
          <md-button class="md-dense md-provence" @click="newArticle">새로운 글</md-button>
        </div>
      </md-empty-state>
    </div>

    <div v-show="articles.length != 0">

      <!-- 데스크탑용 테이블 -->
      <md-table
        v-model="articles"
        @md-selected="onSelect"
        :table-header-color="tableHeaderColor"
        v-show="!isMobile"
      >
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          md-selectable="single"
          :key="item.id"
        >
          <md-table-cell md-label="제목" class="table-title">{{ item.title }}</md-table-cell>
          <md-table-cell md-label="작성 시간" width="90px">{{
            item.published_at_kor
          }}</md-table-cell>
          <md-table-cell md-label="작성자" width="90px">{{ item.author_name }}</md-table-cell>
          <md-table-cell md-numeric md-label="조회수" width="55px">{{ item.views }}</md-table-cell>
        </md-table-row>
      </md-table>

      <!-- 모바일용 리스트 -->
      <md-list class="md-triple-line" v-model="articles" v-show="isMobile">
        <md-list-item
          v-for="(artc, idx) in articles"
          v-bind:key="idx"
          @click="onSelect(artc)"
        >
          <md-icon class="">library_books</md-icon>
          <div class="md-list-item-text">
            <span>{{ artc.title }}</span>
            <span>{{ artc.author_name }}</span>
            <p>{{ artc.published_at_kor }} | 조회수 : {{ artc.views }}</p>
          </div>
        </md-list-item>
      </md-list>

      <!-- 글쓰기 -->
      <div class="buttons-wrapper">
        <md-button class="md-dense md-provence" @click="newArticle">새로운 글</md-button>
      </div>

      <md-divider></md-divider>

      <!-- 페이지네이션 -->
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
  </div>
</template>

<script>
export default {
  name: "freeboard-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "pantone-provence"
    },
    writeLevel: {
      type: Number
    }
  },
  computed: {
    isMobile: function() {
      return this.$mq === "mobile" ? true : false;
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
      loading: true,
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
      var userInfo = this.$store.getters.getUserInfo;
      if (userInfo.level < this.writeLevel) {
        alert("쓰기 권한이 부족합니다.");
        return;
      }
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
      this.loading = true;

      // Router Parameters
      this.boardID = this.$route.params.board_id;
      this.pagination.current = this.$route.query.page;
      if (this.pagination.current == undefined) {
        this.pagination.current = 0;
      }

      var url =
        "http://api.dasom.io/boards/" +
        this.boardID +
        "/articles?page=" +
        this.pagination.current;

      var token = this.$store.getters.getAccessToken;
      let config = {
        headers: {
          Authorization: token
        }
      };
      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get(url, config)
        .then(res => {
          vm.loading = false;
          vm.articles = res.data.data.articles;
          vm.pagination.count = res.data.data.page_counts;
          vm.pagination.current = res.data.data.page;
        })
        .catch(error => {
          if (error.response.request.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            vm.loading = false;
            vm.$router.push({
              path: "/signin",
              query: {
                redirectPath: encodeURI(vm.$route.path)
              }
            });
          }
        });
      this.loading = false;
    },
    onSelect(item) {
      this.$router.push(this.boardID + "/articles/" + item.id);
    }
  }
};
</script>

<style scoped>
.md-table .md-table-cell.md-numeric .md-table-cell-container {
  display: inline;
}
.md-table .md-table-cell[width] .md-table-cell-container {
  width: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
}

.table-title {
  overflow: hidden;
  text-overflow: ellipsis;
}

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
