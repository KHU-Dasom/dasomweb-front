<template>
  <div class="main-content file-table">
    <div class="title">
      <label>첨부파일</label>
    </div>

    <!-- List -->
    <md-list>
      <md-list-item v-for="(attachment, idx) in attachments" v-bind:key="idx" class="left-align">
        <md-icon>get_app</md-icon>
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

<style lang="scss">
.file-table {
  padding-top: 1rem;

  .title {
    margin-top: 1rem;

    label {
      font-size: 1.3rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .left-align .md-list-item-container .md-list-item-content {
    justify-content: left;
  }
}
</style>
