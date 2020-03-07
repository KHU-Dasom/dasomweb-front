<template>
  <div class="file-table">
    <div class="title">
      <label>첨부파일</label>
      <!--<md-button class="md-provence md-sm button-upload" :disabled="noFiles" @click="uploadAll">모두 업로드</md-button>-->
    </div>

    <!-- List -->
    <md-list>
      <md-list-item v-for="(attachment, idx) in attachments" v-bind:key="idx">
        <md-icon>attach_file</md-icon>
        <a v-bind:href="attachment.url">
          <span class="md-list-item-text">{{ attachment.file_name }}</span>
        </a>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "file-attachments-table",
  data: () => ({
    files: null
  }),
  props: {
    attachments: {
      type: Array,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.file-table {
  position: relative;
  max-width: 55rem;
  margin: 0 auto;

  .title {
    margin-top: 1rem;

    label {
      font-size: 1.3rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    .button-upload {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .md-file {
    width: 80%;
    max-width: 500px;
  }
}
</style>
