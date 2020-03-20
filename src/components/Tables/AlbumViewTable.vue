<template>
  <div>
    <div class="content main-content">
      <div class="md-layout">
        <div class="md-layout-item">
          <md-card>
            <md-card-header data-background-color="pantone-provence">
              <h4 class="title">{{ album.title }}</h4>
            </md-card-header>

            <br />

            <md-card-media>

              <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
                <swiper-slide
                  v-for="(image, idx) in images"
                  :key="idx"
                >
                  <img :src="image.url" class="slide-image" />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>

            </md-card-media>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "album-view-table",
  components: {
    swiper,
    swiperSlide
  },
  data: () => {
    return {
      albumID: null,
      album: {},
      images: [],
      swiperOption: {
        slidesPerView: "auto",
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 데이터 로딩
    fetchData() {
      var vm = this;

      this.albumID = this.$route.params.album_id;
      var url = "http://api.dasom.io/albums/" + this.albumID;
      let config = {
        headers : {
          Authorization: this.$store.getters.getAccessToken,
          "Content-Type": "application/json"
        }
      };

      this.$http
        .get(url, config)
        .then(res => {
          vm.album = res.data.data;

          // Images
          vm.album.images.forEach(element => {
            vm.images.push({
              id: element.image_id,
              name: element.image_name,
              url: element.url
            });
          });
        })
        .catch(error => {
          console.log(error);
          if (error.response.request.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            vm.$router.push({
              path: "/signin",
              redirectPath: encodeURI(vm.$route.path)
            });
          } else {
            console.log(error);
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "./base.scss";

.swiper-box {
  width: 90%;
  margin: 0 auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.slide-image {
}

</style>