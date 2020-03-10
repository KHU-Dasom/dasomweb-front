<template>
  <div>
    <md-dialog
      :md-fullscreen="true"
      :md-active.sync="showModal"
      v-on:md-opened="emitOpened"
      v-on:md-closed="emitClosed"
      v-on:md-clicked-outside="emitClosed"
    >
      <md-dialog-title>이미지 추가</md-dialog-title>

      <!-- <md-tabs md-dynamic-height>
        <md-tab md-label="url">
          <p>이미지 링크 지정하는 곳</p>
        </md-tab>

        <md-tab md-label="dragndrop">
          <p>이미지 드래그 앤 드롭 하는 곳</p>
        </md-tab>

        <md-tab md-label="file">
          <p>이미지 첨부파일 선택하는 곳</p>
        </md-tab>
      </md-tabs> -->

      <md-dialog-actions>
        <md-button class="md-primary" @click="emitClosed">취소</md-button>
        <md-button class="md-primary" @click="emitClosed">저장</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "image-upload-modal",
  props: ["showModal"],
  methods: {
    emitOpened() {
      this.propShowModal = true;
      this.$emit("updateImageModal", true);
    },
    emitClosed() {
      this.propShowModal = false;
      this.$emit("updateImageModal", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
}
</style>
