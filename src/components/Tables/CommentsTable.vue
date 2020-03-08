<template>
  <div class="comments-table">
    <div class="title">
      <label>댓글</label>
    </div>

    <!-- List -->
    <md-list v-show="!noComments">
      <md-list-item v-for="(comm, idx) in comments" v-bind:key="idx">
        <md-icon>comment</md-icon>
        <span class="md-list-item-text">{{ comm.comment }}</span>
      </md-list-item>
    </md-list>

    <!-- 댓글 작성 폼 -->
    <md-field>
      <md-input v-model="newComment" style="resize:unset; min-height:50px; height:50px" placeholder="댓글을 입력해주세요."></md-input>
      <md-button class="md-dense md-provence pagination-button" @click="commentUpload">등록</md-button>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "comments-table",
  computed: {
    noComments: function() {
      return this.comments.length == 0;
    }
  },
  data: () => ({
    newComment: null
  }),
  props: {
    comments: {
      type: Array,
      required: false
    }
  },
  methods: {
    commentUpload: function() {
      var boardID = this.$route.params.board_id;
      var articleID = this.$route.params.article_id;

      var token = localStorage.getItem("accessToken");
      const url = "http://api.dasom.io/boards/" + boardID + "/articles/" + articleID + "/comments";
      var payload = {
        comment: this.newComment
      };
      this.$http
        .post(url, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        })
        .then(res => {
          console.log(res);
          this.$emit("comment_updated", "updated");
        })
        .catch(({ message }) => {
          alert("댓글 등록이 실패하였습니다. : " + message);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.comments-table {
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
}
</style>
