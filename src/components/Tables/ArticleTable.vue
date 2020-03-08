<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">{{ article.title }}</h4>
          </md-card-header>

          <!-- Card-Content -->
          <md-card-content>
            <div class="md-alignment-top-right alignright">
              <span
                >{{ article.published_at_kor }} {{ article.author_name }}({{
                  enrollyear
                }})
              </span>
            </div>

            <md-divider></md-divider>
            <br />

            <!-- Editor -->
            <div class="editor editor-wrapper">
              <editor-content class="editor__content" :editor="editor" />
            </div>

            <md-divider></md-divider>

            <!-- File Attachments -->
            <file-attachments-table
              v-bind:attachments="attachments"
            ></file-attachments-table>

            <!-- 댓글 -->
            <comments-table
              v-bind:comments="comments"
              v-on:comment_updated="fetchCommentsData"
            ></comments-table>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import FileAttachmentsTable from "./FileAttachmentsTable.vue";
import CommentsTable from "./CommentsTable.vue";

import { Editor, EditorContent } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from "tiptap-extensions";

export default {
  name: "article-table",
  components: {
    EditorContent,
    CommentsTable,
    FileAttachmentsTable
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: "pantone-provence"
    }
  },
  data() {
    return {
      boardID: null,
      articleID: null,
      article: {},
      enrollyear: null,
      attachments: [],
      comments: [],
      // Editor
      editor: new Editor({
        editable: false,
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image()
        ],
        content: ""
      })
    };
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    fetchData() {
      var vm = this;

      this.boardID = this.$route.params.board_id;
      this.articleID = this.$route.params.article_id;
      var url =
        "http://api.dasom.io/boards/" +
        this.boardID +
        "/articles/" +
        this.articleID;

      var token = localStorage.getItem("accessToken");
      let config = {
        headers: {
          Authorization: token
        }
      };
      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get(url, config)
        .then(res => {
          vm.article = res.data.data;
          vm.enrollyear = String(vm.article.author_id).slice(2, 4);
          vm.editor.setContent(vm.article.content);

          // 첨부파일들
          if (vm.article.attachment_counts > 0) {
            vm.article.attachments.forEach(element => {
              vm.attachments.push(element);
            });
          }

          // 댓글들
          if (vm.article.comment_counts > 0) {
            vm.article.comments.forEach(element => {
              vm.comments.push(element);
            });
          }
        })
        .catch(error => {
          if (error.response.request.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            vm.$router.push("/signin");
          }
        });
    },
    // 댓글창 다시 로딩
    fetchCommentsData() {
      var vm = this;

      this.boardID = this.$route.params.board_id;
      this.articleID = this.$route.params.article_id;
      var url =
        "http://api.dasom.io/boards/" +
        this.boardID +
        "/articles/" +
        this.articleID + "/comments";

      var token = localStorage.getItem("accessToken");
      let config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };
      this.$http
        .get(url, config)
        .then(res => {
          // 댓글들
          if (res.data.data.article.comment_counts > 0) {
            vm.comments = [];
            res.data.data.article.comments.forEach(element => {
              vm.comments.push(element);
            });
          }
        })
        .catch(error => {
          if (error.response.request.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            vm.$router.push("/signin");
          }
        });
    }
  }
};
</script>

<style lang="scss">
.alignright {
  text-align: right;
}

.editor-wrapper {
  padding: 10px 0;
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="true"] {
  white-space: pre-wrap;
}

// Color Variabls
$color-black: #000000;
$color-white: #ffffff;
$color-grey: #dddddd;

// Editor Styles
.editor {
  position: relative;
  max-width: 55rem;
  margin: 0 auto 3.5rem auto;

  &__content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;

    * {
      caret-color: currentColor;
    }

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: $color-black;
      color: $color-white;
      font-size: 0.8rem;
      overflow-x: auto;

      code {
        display: block;
      }
    }

    p code {
      display: inline-block;
      padding: 0 0.4rem;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: bold;
      background: rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
    }

    ul,
    ol {
      padding-left: 1rem;
    }

    li > p,
    li > ol,
    li > ul {
      margin: 0;
    }

    a {
      color: inherit;
    }

    blockquote {
      border-left: 3px solid rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
      padding-left: 0.8rem;
      font-style: italic;

      p {
        margin: 0;
      }
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid $color-grey;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: 0;
        width: 4px;
        z-index: 20;
        background-color: #adf;
        pointer-events: none;
      }
    }

    .tableWrapper {
      margin: 1em 0;
      overflow-x: auto;
    }

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
}
</style>
