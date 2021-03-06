<template>
  <div class="content main-content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">
              <input
                class="input-tag-title"
                v-model="inputTitle"
                placeholder="제목을 입력해주세요 ..."
                required
              />
            </h4>
          </md-card-header>

          <md-card-content>
            <div class="editor editor-wrapper">
              <!-- Menu Bar -->
              <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div class="menubar menuber-align">
                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                  >
                    <editor-icon name="bold" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                  >
                    <EditorIcon name="italic" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                  >
                    <EditorIcon name="strike" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                  >
                    <EditorIcon name="underline" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                  >
                    <EditorIcon name="code" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.paragraph() }"
                    @click="commands.paragraph"
                  >
                    <EditorIcon name="paragraph" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                  >
                    H2
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                  >
                    H3
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 4 }) }"
                    @click="commands.heading({ level: 4 })"
                  >
                    H4
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                  >
                    <EditorIcon name="ul" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                  >
                    <EditorIcon name="ol" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                  >
                    <EditorIcon name="quote" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                  >
                    <EditorIcon name="code" />
                  </button>

                  <button
                    class="menubar__button"
                    @click="commands.horizontal_rule"
                  >
                    <EditorIcon name="hr" />
                  </button>

                  <button class="menubar__button" @click="commands.undo">
                    <EditorIcon name="undo" />
                  </button>

                  <button class="menubar__button" @click="commands.redo">
                    <EditorIcon name="redo" />
                  </button>

                  <button
                    class="menubar__button"
                    @click="showImagePrompt(commands.image)"
                  >
                    <EditorIcon name="image" />
                  </button>
                </div>
              </editor-menu-bar>
              <!-- Menu Bar End -->

              <!-- Editor Content -->
              <editor-content class="editor__content" :editor="editor" />
            </div>
            <!-- Editor Wrapper End -->

            <md-divider></md-divider>

            <!-- 수정 중인 경우에 노출되는 기존 첨부파일 리스트 -->
            <FileAttachmentsTable
              v-show="!isCreation"
              v-bind:attachments="uploadFiles"
              v-bind:isModify="!isCreation"
              v-on:upload-completed="uploadCompleted"
            ></FileAttachmentsTable>

            <FileUploadTable
              v-on:upload-completed="uploadCompleted"
            ></FileUploadTable>

            <md-divider></md-divider>

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
        <!-- Card End -->

        <!-- Loading Overlay -->
        <div class="creation-loading-overlay" v-if="loading">
          <md-progress-spinner
            md-mode="indeterminate"
            :md-stroke="2"
          ></md-progress-spinner>
        </div>

        <!-- Image Modal -->
        <image-upload-modal
          ref="imageModal"
          :show-modal="showImageModal"
          v-on:onConfirm="addCommand"
        ></image-upload-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { FileUploadTable, ImageUploadModal, FileAttachmentsTable } from "@/components";

/* Code Highlighting */
import bash from "highlight.js/lib/languages/bash";
import cpp from "highlight.js/lib/languages/cpp";
import cs from "highlight.js/lib/languages/cs";
import css from "highlight.js/lib/languages/css";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import go from "highlight.js/lib/languages/go";
import htmlbars from "highlight.js/lib/languages/htmlbars";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import scss from "highlight.js/lib/languages/scss";
import scala from "highlight.js/lib/languages/scala";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import swift from "highlight.js/lib/languages/swift";
import xml from "highlight.js/lib/languages/xml";

// Editor
import EditorIcon from "@/components/EditorIcon/EditorIcon.vue";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
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
  Image,
  CodeBlockHighlight
} from "tiptap-extensions";

export default {
  components: {
    FileUploadTable,
    FileAttachmentsTable,
    EditorIcon,
    EditorContent,
    EditorMenuBar,
    ImageUploadModal
  },
  created: function() {
    // 게시글 생성인 경우
    if (this.$route.name == "ArticleCreation") {
      this.boardID = this.$route.query.board_id;
      this.isCreation = true;

      var vm = this;
      this.html = this.editor.getHTML();
      // this.json = this.editor.getJSON();
      this.editor.on("update", () => {
        vm.html = vm.editor.getHTML();
        // vm.json = vm.editor.getJSON();
        vm.$emit("update", vm.html);
      });
    }
    // 게시글 수정인 경우
    else if (this.$route.name == "ArticleModify") {
      this.boardID = this.$route.query.board_id;
      this.articleID = this.$route.query.article_id;
      this.isCreation = false;

      // 기존 데이터 불러오기
      this.fetchDataIfNotCreation();
    }
  },
  data() {
    return {
      showImageModal: false,
      loading: false,
      boardID: null,
      articleID: null,
      isCreation: true,
      uploadFiles: [],
      inputTitle: "",
      content_html: "",
      // content_json: "",
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [2, 3, 4] }),
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
          new Image(),
          new CodeBlockHighlight({
            languages: {
              bash, cpp, cs, css, dockerfile, go, htmlbars, java, javascript, json, php, python, ruby, rust, scss, scala, shell, sql, swift, xml
            }
          })
        ],
        content: ``
      })
    };
  },
  beforeDestroy() {
    // 다른 페이지로 넘어가기 전 항상 destroy 호출
    this.editor.destroy();
  },
  methods: {
    // 업로드된 파일 ID들
    uploadCompleted(obj) {
      // 새로 업로드된 경우
      if (obj.isNew == true) {
        obj.files.forEach(element => {
          this.uploadFiles.push(element);
        });
      } 
      // 기존 파일이 삭제된 경우
      else {
        this.uploadFiles = obj.files;
      }
    },
    // 이미지 modal의 show 상태를 결정
    updateImageModal(param) {
      this.showImageModal = param;
    },
    // 이미지 링크거는 용도
    showImagePrompt(command) {
      this.$refs.imageModal.showModal(command);
    },
    addCommand(data) {
      if (data.command !== null) {
        data.command(data.data);
      }
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

      // 글 내용 저장
      this.html = this.editor.getHTML();

      // 요청
      var url = "http://api.dasom.io/boards/" + this.boardID + "/articles";
      const author = Number(this.$store.getters.getUserInfo.id);
      var token = this.$store.getters.getAccessToken;
      var config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };
      var payload = {
        title: this.inputTitle,
        content: this.html,
        author_id: author
      };
      if (this.uploadFiles != null) { // 업로드 파일 ID 리스트 생성.
        if (this.uploadFiles.length != 0) {
          var uploadIDs = [];
          this.uploadFiles.forEach(element => {
            uploadIDs.push(element.file_id);
          });
          payload.upload_ids = uploadIDs;
        }
      }

      setTimeout(() => {
        // 생성인 경우
        if (this.isCreation) {
          this.$http
            .post(url, payload, config)
            .then(() => {
              vm.loading = false;

              alert("게시글 생성이 완료되었습니다.");
              vm.$router.go(-1);
            })
            .catch(({ message }) => {
              alert("게시글 생성이 실패하였습니다 : " + message);
              vm.loading = false;
            });
        } 
        // 수정인 경우
        else {
          // 첨부파일 등록
          var url2 = url + "/" + this.articleID;
          this.$http
            .put(url2, payload, config)
            .then(() => {
              vm.loading = false;
              alert("게시글 수정이 완료되었습니다.");
              vm.$router.go(-1);
            })
            .catch(({ message }) => {
              alert("게시글 수정이 실패하였습니다 : " + message);
              vm.loading = false;
            });
        }
      }, 700);
    },
    // 수정인 경우 기존 데이터를 불러옴
    fetchDataIfNotCreation() {
      var vm = this;

      var url =
        "http://api.dasom.io/boards/" +
        this.boardID +
        "/articles/" +
        this.articleID;

      var token = this.$store.getters.getAccessToken;
      let config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };
      this.$http
        .get(url, config)
        .then(res => {
          var article = res.data.data;
          vm.editor.setContent(article.content);
          vm.inputTitle = article.title;

          // 기존에 있던 첨부파일 리스트 불러오기
          if (article.attachment_counts > 0) {
            article.attachments.forEach(element => {
              vm.uploadFiles.push({
                file_id: element.file_id,
                file_name: element.file_name,
                file_ext: element.file_ext,
                url: element.url
              });
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
@import "@/assets/scss/code-highlight.scss";

.creation-loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
}

.editor-wrapper {
  padding: 10px 0;
}

.input-tag-title {
  background-color: #658dc6;
  border-color: #658dc6;
  border-style: none;
  font-size: 1em;
  vertical-align: sub;
  color: #ffffff;
  width: 100%;
}
.input-tag-title::placeholder {
  color: #e6e6e6;
  font-style: oblique;
}

.menuber-align {
  text-align: center;
}

.buttons-wrapper {
  text-align: right;
  margin: 0 1rem;
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

// Menubar Styles
.menubar {
  margin-bottom: 1.5rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba($color-black, 0.05);
    }

    &.is-active {
      background-color: rgba($color-black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}

// Editor Styles

.editor {
  position: relative;
  max-width: 55rem;
  margin: 0 auto 2.5rem auto;

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

    img:not(.md-card) {
      width: inherit;
      height: auto;
      display: block;
      margin: 0 auto;
      max-width: 80%;
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
