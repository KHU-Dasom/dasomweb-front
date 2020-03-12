<template>
  <div>
    <md-dialog
      :md-fullscreen="false"
      :md-active.sync="show"
      v-on:md-closed="close"
      v-on:md-clicked-outside="close"
    >
      <nav-tabs-card>
        <template slot="content">
          <md-tabs class="md-success md-tabs-provence" md-alignment="left">
            <md-tab id="tab-input" md-label="Input" md-icon="tab_unselected">
              <md-field>
                <label>이미지 업로드</label>
                <md-file @change="fileChange" ref="imageInput" />
              </md-field>
            </md-tab>

            <md-tab id="tab-url" md-label="URL" md-icon="http">
              <p>URL 입력하는 곳</p>
            </md-tab>
          </md-tabs>
        </template>
      </nav-tabs-card>

      <md-dialog-actions>
        <md-button class="md-provence" @click="close">취소</md-button>
        <md-button class="md-provence" @click="emitLink">저장</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { NavTabsCard } from "@/components";

export default {
  components: {
    NavTabsCard
  },
  name: "image-upload-modal",
  data: function() {
    return {
      show: false,
      command: null,
      imageSrc: null
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    showModal(command) {
      this.command = command;
      this.show = true;
    },
    // link를 emit
    emitLink() {
      const data = {
        command: this.command,
        data: {
          src: this.imageSrc
        }
      };
      this.$emit("onConfirm", data);
      this.show = false;
    },
    // 파일이 선택되었을 때
    fileChange(ev) {
      var vm = this;
      const file = ev.target.files[0];

      // Form Data 생성
      const formData = new FormData();
      formData.append("target_files", file);

      const url = "http://api.dasom.io/images";
      var token = this.$store.getters.getAccessToken;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          }
        })
        .then(res => {
          if (res.data.data.image_counts > 0) {
            vm.imageSrc = res.data.data.images[0].download_link;
          }
        })
        .catch(err => {
          console.log(err);
          alert("파일 업로드 에러 발생! ", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
  min-width: 400px;
}
</style>
