<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item  md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card style="margin-top: 0">
          <md-card-content>
            <div class="title">
              <label v-show="noComments">댓글</label>
              <label v-show="!noComments">댓글 ({{ comments.length }})</label>
            </div>

            <!-- 댓글 리스트 -->
            <md-list class="md-double-line" v-show="!noComments" v-model="comments">
              <md-list-item v-for="(comm, idx) in comments" v-bind:key="idx">
                <md-icon class="">mode_comment</md-icon>
                <div class="md-list-item-text">
                  <span>{{ comm.comment }}</span>
                  <span>{{ comm.author_name }} | {{ comm.published_at_kor }}</span>
                </div>
              </md-list-item>
            </md-list>

            <!-- 댓글 작성 폼 -->
            <md-field>
              <md-input
                v-model="newComment"
                style="resize:unset; min-height:50px; height:50px"
                placeholder="댓글을 입력해주세요."
                v-on:keyup.enter="commentUpload"
              ></md-input>
              <md-button class="md-dense md-provence" @click="commentUpload"
                >등록</md-button
              >
            </md-field>
          </md-card-content>
        </md-card>
      </div>
    </div>
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
      if (this.newComment == "" || this.newComment === null) {
        alert("댓글을 입력해주세요.");
        return;
      }

      var vm = this;

      var boardID = this.$route.params.board_id;
      var articleID = this.$route.params.article_id;

      var token = this.$store.getters.getAccessToken;
      const url =
        "http://api.dasom.io/boards/" +
        boardID +
        "/articles/" +
        articleID +
        "/comments";
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
          vm.$emit("comment-updated", "updated");
        })
        .catch(({ message }) => {
          alert("댓글 등록이 실패하였습니다. : " + message);
        });
      this.newComment = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 0;
  margin-bottom: 1rem;

  label {
    font-size: 1.3rem;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
