<template>
  <div>
    <div v-show="albums.length == 0">
      <md-empty-state
        md-icon="priority_high"
        md-label="게시물이 존재하지 않습니다."
        md-description="새로운 게시물을 작성해서 dasom.io를 풍요롭게 만들어주세요 용사님들!">

        <!-- 글쓰기 -->
        <div class="buttons-wrapper">
          <md-button class="md-dense md-provence" @click="newAlbum">새로운 앨범</md-button>
        </div>
      </md-empty-state>
    </div>

    <div v-show="albums.length != 0">

      <!-- 갤러리 카드들 -->
      <div class="gallery-wrapper">
        <div
          v-for="(album, idx) in albums"
          v-bind:key="idx"
          @click="onSelect(album)"
        >
          <md-card :class="{'album-card': true}">
            <md-card-media-cover md-solid>
              <md-card-media md-ratio="4:3">
                <img :src="album.thumbnail" alt="Thumbnail" crossorigin="anonymous" />
              </md-card-media>

              <md-card-area>
                <span class="md-title gallery-title">{{ album.title }}</span>
                <span class="md-subhead gallery-subhead">{{ album.author_name }} | {{ album.published_at_kor }}</span>
              </md-card-area>
            </md-card-media-cover>
          </md-card>
        </div>
      </div>

      <!-- 글쓰기 -->
      <div class="buttons-wrapper">
        <md-button class="md-dense md-provence" @click="newAlbum">새로운 앨범</md-button>
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
  name: "album-list-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "pantone-provence"
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
            path: "/albums",
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
      selected: [],
      albums: [],
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
    onSelect(item) {
      this.$router.push("/albums/" + item.id);
    },
    newAlbum() {
      this.$router.push("/newalbum");
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
      this.pagination.current = this.$route.query.page;
      if (this.pagination.current == undefined) {
        this.pagination.current = 0;
      }

      var url = "http://api.dasom.io/albums?page=" + this.pagination.current;

      var token = this.$store.getters.getAccessToken;
      let config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };
      this.$http
        .get(url, config)
        .then(res => {
          vm.loading = false;
          vm.albums = res.data.data.albums;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery-wrapper {
  justify-content: center;
  justify-items: center;
  text-align: center;
  margin: 0 auto;
}

.album-card {
  max-width: 300px;
  margin: 10px;

  cursor: pointer;

  .gallery-title {
    font-size: 18px;
  }

  .gallery-subhead {
    font-size: 14px;
  }
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
