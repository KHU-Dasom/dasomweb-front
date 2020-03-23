<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item  md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card style="margin-top: 0">
          <md-card-content>
            <div class="title">
              <label>새로운 게시판</label>
            </div>

            <!-- 작성 폼 -->
            <div class="form">
              <md-field>
                <label for="">게시판 이름</label>
                <md-input
                  name="input-title"
                  id="input-title"
                  v-model="form.inputTitle"
                  :disabled="sending"
                />
              </md-field>

              <md-field>
                <label for="">아이콘 class명</label>
                <md-input
                  name="input-icon"
                  id="input-icon"
                  v-model="form.inputIcon"
                  :disabled="sending"
                />
              </md-field>

              <md-field>
                <label for="input-read">읽기 권한</label>
                <md-select v-model="form.inputRead" name="input-read" id="input-read" md-dense>
                  <md-option value="1">비회원</md-option>
                  <md-option value="2">정회원</md-option>
                  <md-option value="3">임원</md-option>
                  <md-option value="999">관리자</md-option>
                </md-select>
              </md-field>

              <md-field>
                <label for="input-write">쓰기 권한</label>
                <md-select v-model="form.inputWrite" name="input-write" id="input-write" md-dense>
                  <md-option value="1">비회원</md-option>
                  <md-option value="2">정회원</md-option>
                  <md-option value="3">임원</md-option>
                  <md-option value="999">관리자</md-option>
                </md-select>
              </md-field>

              <div class="button-wrapper">
                <md-button class="md-provence" @click="createBoard">생성</md-button>
              </div>
            </div> <!-- form end -->

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-new-board-table",
  data: () => ({
    loading: false,
    sending: false,
    form: {
      inputTitle: null,
      inputIcon: null,
      inputRead: null,
      inputWrite: null
    },
  }),
  methods: {
    // Create Board
    createBoard() {
      // 데이터 체크
      if (
        this.form.inputTitle == null ||
        this.form.inputIcon == null ||
        this.form.inputRead == null ||
        this.form.inputWrite == null
      ) {
        alert("값을 제대로 세팅해주세요.");
        return;
      }

      // 생성
      var url = "http://api.dasom.io/boards";
      var headers = {
        headers: {
          Authorization: this.$store.getters.getAccessToken,
          "Content-Type": "application/json"
        }
      };
      var payload = {
        title: this.form.inputTitle,
        icon_class: this.form.inputIcon,
        read_level: Number(this.form.inputRead),
        write_level: Number(this.form.inputWrite)
      };

      this.$http
        .post(url, payload, headers)
        .then(res => {
          this.sending = false;
          this.loading = false;

          alert("생성 완료. 게시판 ID : " + res.data.data.board_id + "\n현재 페이지에는 새로고침을 해야 반영됩니다.");
        })
        .catch(err => {
          console.log("게시판 생성 실패.");
          console.log(err);
          alert("실패. console을 확인하세요.")
        });
      
    }
  }
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  text-align: right;
  margin: 0 1rem;
}

.title {
  margin-top: 0;
  margin-bottom: 1.5rem;

  label {
    font-size: 1.3rem;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
