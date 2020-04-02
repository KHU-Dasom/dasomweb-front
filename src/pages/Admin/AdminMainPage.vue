<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">홈 메인 관리</h4>
          </md-card-header>
          <md-card-content>

            <!-- 수정 폼 -->
            <div>
              <h4>Title</h4>
              <md-field>
                <label for="input-0">Title</label>
                <md-input name="input-0" id="input-0" v-model="form.title" :disabled="sending" />
              </md-field>

              <h4>Main Section</h4>
              <md-field>
                <label for="input-1-1">Catchphrase</label>
                <md-input name="input-1-1" id="input-1-1" v-model="form.main1" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-1-1">Catchphrase 2</label>
                <md-input name="input-1-2" id="input-1-2" v-model="form.main2" :disabled="sending" />
              </md-field>

              <h4>About Us</h4>
              <md-field>
                <label for="input-2-1">소개 1 제목</label>
                <md-input name="input-2-1" id="input-2-1" v-model="form.aboutus21" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-2-2">소개 1 내용</label>
                <md-input name="input-2-2" id="input-2-2" v-model="form.aboutus22" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-2-3">소개 2 제목</label>
                <md-input name="input-2-3" id="input-2-3" v-model="form.aboutus23" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-2-4">소개 2 내용</label>
                <md-input name="input-2-4" id="input-2-4" v-model="form.aboutus24" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-2-5">소개 3 제목</label>
                <md-input name="input-2-5" id="input-2-5" v-model="form.aboutus25" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-2-6">소개 3 내용</label>
                <md-input name="input-2-6" id="input-2-6" v-model="form.aboutus26" :disabled="sending" />
              </md-field>

              <h4>About Us Num</h4>
              <md-field>
                <label for="input-3-1">1번 내용</label>
                <md-input name="input-3-1" id="input-3-1" v-model="form.aboutus31" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-3-2">1번 숫자</label>
                <md-input name="input-3-2" id="input-3-2" v-model="form.aboutus32" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-3-3">2번 내용</label>
                <md-input name="input-3-3" id="input-3-3" v-model="form.aboutus33" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-3-4">2번 숫자</label>
                <md-input name="input-3-4" id="input-3-4" v-model="form.aboutus34" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-3-5">3번 내용</label>
                <md-input name="input-3-5" id="input-3-5" v-model="form.aboutus35" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-3-6">3번 숫자</label>
                <md-input name="input-3-6" id="input-3-6" v-model="form.aboutus36" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-3-7">4번 내용</label>
                <md-input name="input-3-7" id="input-3-7" v-model="form.aboutus37" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-3-8">4번 숫자</label>
                <md-input name="input-3-8" id="input-3-8" v-model="form.aboutus38" :disabled="sending" />
              </md-field>

              <h4>Contact Us</h4>
              <md-field>
                <label for="input-4-1">회장 연락처 (띄어쓰기로 구분, 연도 이름 번호 순)</label>
                <md-input name="input-4-1" id="input-4-1" v-model="form.contactus1" :disabled="sending" />
              </md-field>

              <md-field>
                <label for="input-4-2">부회장 연락처 (띄어쓰기로 구분, 연도 이름 번호 순)</label>
                <md-input name="input-4-2" id="input-4-2" v-model="form.contactus2" :disabled="sending" />
              </md-field>
              
            </div>
            <!-- End Form -->

            <!-- Buttons -->
            <div class="buttons-wrapper">
              <md-button class="md-dense md-provence" @click="cancelEditing"
                >취소</md-button
              >
              <md-button class="md-dense md-provence" @click="saveEditing"
                >저장</md-button
              >
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    sending: false,
    form: {
      title: null,
      main1: null,
      main2: null,
      aboutus21: null,
      aboutus22: null,
      aboutus23: null,
      aboutus24: null,
      aboutus25: null,
      aboutus26: null,
      aboutus31: null,
      aboutus32: null,
      aboutus33: null,
      aboutus34: null,
      aboutus35: null,
      aboutus36: null,
      aboutus37: null,
      aboutus38: null,
      contactus1: null,
      contactus2: null,
      images: []
    }
  }),
  created() {
    this.loadData();
  },
  methods: {
    // 수정 취소 후 리다이렉트
    cancelEditing() {
      const result = confirm("수정을 취소하고 이전 페이지로 돌아갑니다.");
      if (result) {
        this.$router.go(-1);
      }
    },
    // 수정 완료 후 저장
    saveEditing() {
      var vm = this;
      this.loading = true;

      // JSON 만들기
      var _section4_1 = vm.form.contactus1.split(' ');
      var _section4_2 = vm.form.contactus2.split(' ');

      var title = vm.form.title;
      var images = vm.form.images;
      var section1 = {
        title: vm.form.main1,
        subtitle: vm.form.main2,
      };
      var section2 = [
        {
          title: vm.form.aboutus21,
          content: vm.form.aboutus22
        },
        {
          title: vm.form.aboutus23,
          content: vm.form.aboutus24
        },
        {
          title: vm.form.aboutus25,
          content: vm.form.aboutus26
        },
      ];
      var section3 = [
        {
          key: vm.form.aboutus31,
          value: Number(vm.form.aboutus32)
        },
        {
          key: vm.form.aboutus33,
          value: Number(vm.form.aboutus34)
        },
        {
          key: vm.form.aboutus35,
          value: Number(vm.form.aboutus36)
        },
        {
          key: vm.form.aboutus37,
          value: Number(vm.form.aboutus38)
        }
      ]
      var section4 = [
        {
          year: Number(_section4_1[0]),
          name: _section4_1[1],
          phone: _section4_2[2]
        },
        {
          year: Number(_section4_2[0]),
          name: _section4_2[1],
          phone: _section4_2[2]
        }
      ];

      // 요청
      var url = "http://api.dasom.io/main-page";
      var config = {
        headers: {
          Authorization: this.$store.getters.getAccessToken,
          "Content-Type": "application/json"
        }
      };
      var payload = {
        title: title,
        main: section1,
        about_us: section2,
        about_us_num: section3,
        bosses: section4,
        images: images
      };

      this.$http
        .post(url, payload, config)
        .then(() => {
          vm.loading = false;
          alert("수정 완료. 이전 페이지로 돌아갑니다.");
          vm.$router.go(-1);
        })
        .catch(({ message}) => {
          alert("수정 실패. console 확인하세요.");
          console.log(message);
          vm.loading = false;
        });
    },
    // 기존 데이터 로딩
    loadData() {
      var vm = this;
      var url = "http://api.dasom.io/main-page";
      this.$http.get(url)
        .then(res => {
          var data = res.data.data;
          console.log(data);

          vm.form.title = data.title;

          vm.form.main1 = data.main.title;
          vm.form.main2 = data.main.subtitle;

          vm.form.aboutus21 = data.about_us[0].title;
          vm.form.aboutus22 = data.about_us[0].content;
          vm.form.aboutus23 = data.about_us[1].title;
          vm.form.aboutus24 = data.about_us[1].content;
          vm.form.aboutus25 = data.about_us[2].title;
          vm.form.aboutus26 = data.about_us[2].content;

          vm.form.aboutus31 = data.about_us_num[0].key;
          vm.form.aboutus32 = data.about_us_num[0].value;
          vm.form.aboutus33 = data.about_us_num[1].key;
          vm.form.aboutus34 = data.about_us_num[1].value;
          vm.form.aboutus35 = data.about_us_num[2].key;
          vm.form.aboutus36 = data.about_us_num[2].value;
          vm.form.aboutus37 = data.about_us_num[3].key;
          vm.form.aboutus38 = data.about_us_num[3].value;

          vm.form.contactus1 = data.bosses[0].year + " " + data.bosses[0].name + " " + data.bosses[0].phone;
          vm.form.contactus2 = data.bosses[1].year + " " + data.bosses[1].name + " " + data.bosses[1].phone;

          vm.form.images = data.images;
        })
      console.log("데이터 로딩 완료.");
    }
  }
};
</script>

<style lang="scss" scoped>
.buttons-wrapper {
  text-align: right;
  margin: 0 1rem;
}
</style>