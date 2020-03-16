<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">
              <input
              class="input-tag-title"
              v-model="inputTitle"
              placeholder="앨범 제목을 입력해주세요 ..."
              required
              />
            </h4>
          </md-card-header>

          <md-card-content>

            <!-- Dropzone -->
            <vue-dropzone
              ref="dz"
              id="dropzone"
              :options="dropzoneOptions"
              v-on:vdropzone-success="uploadSuccess"
            >
            </vue-dropzone>
            <md-button class="md-danger" @click="removeDropzone">모두 삭제</md-button>

            <!-- Buttons -->
            <div class="buttons-wrapper">
              <md-button class="md-dense md-provence" @click="cancelEditing"
                >취소</md-button
              >
              <md-button class="md-dense md-provence" @click="saveEditing" v-if="isCreation"
                >저장</md-button
              >
              <md-button class="md-dense md-provence" @click="saveEditing" v-else
                >수정 완료</md-button
              >
            </div>

          </md-card-content>
        </md-card>
        <!-- Card End-->

         <!-- Loading Overlay -->
        <div class="creation-loading-overlay" v-if="loading">
          <md-progress-spinner
            md-mode="indeterminate"
            :md-stroke="2"
          ></md-progress-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: () => {
    return {
      loading: false,
      inputTitle: "",
      isCreation: true,
      uploadedImageIDs: [],
      dropzoneOptions: {
        url: "http://api.dasom.io/images",
        thumbnailWidth: 150,
        maxFilesize: 20,
        maxFiles: 30
      }
    };
  },
  mounted() {
    this.$refs.dz.setOption("headers", {
      Authorization: this.$store.getters.getAccessToken
    });
  },
  methods: {
    // [Event Handler] 파일 업로드 성공 시 이벤트 핸들링
    uploadSuccess(file, response) {
      var newImageID = response.data.images[0].image_id;
      this.uploadedImageIDs.push(newImageID);
      console.log("이미지 업로드 완료 :", response.data.images[0].image_name);
    },
    // 모든 올려진 이미지 취소
    removeDropzone() {
      this.$refs.dz.removeAllFiles();
    },
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

      // 제목 작성 체크
      if (this.inputTitle == "") {
        alert("제목을 입력해주세요.");
        this.loading = false;
        return;
      }

      // 이미지 개수 체크
      if (this.uploadedImageIDs.length <= 0) {
        alert("이미지를 최소 한 장 업로드해주세요.");
        this.loading = false;
        return;
      }

      // 요청
      var url = "http://api.dasom.io/albums";
      var config = {
        headers: {
          Authorization: this.$store.getters.getAccessToken,
          "Content-Type": "application/json"
        }
      };
      var payload = {
        title: this.inputTitle
      };
      if (this.uploadedImageIDs != null) {
        if (this.uploadedImageIDs.length != 0) {
          var uploadedIDs = [];
          this.uploadedImageIDs.forEach(element => {
            uploadedIDs.push(element);
          });
          payload.image_ids = uploadedIDs;
        }
      }

      setTimeout(() => {
        this.$http
          .post(url, payload, config)
          .then(res => {
            vm.loading = false;

            alert("앨범 생성이 완료되었습니다.");
            vm.$router.go(-1);
          })
          .catch(error => {
            console.log(error);
            alert("앨범 생성이 실패하였습니다 : " + error);
          });
      }, 700);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>