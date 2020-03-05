<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">제목 없음</h4>
          </md-card-header>
          <md-card-content>

            <!-- Menu Bar -->
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
              <div class="menubar">
                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.bold() }"
                  @click="commands.bold"
                >
                  <icon name="bold" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.italic() }"
                  @click="commands.italic"
                >
                  <icon name="italic" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.strike() }"
                  @click="commands.strike"
                >
                  <icon name="strike" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.underline() }"
                  @click="commands.underline"
                >
                  <icon name="underline" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.code() }"
                  @click="commands.code"
                >
                  <icon name="code" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.paragraph() }"
                  @click="commands.paragraph"
                >
                  <icon name="paragraph" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                  @click="commands.heading({ level: 1 })"
                >
                  H1
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
                  :class="{ 'is-active': isActive.bullet_list() }"
                  @click="commands.bullet_list"
                >
                  <icon name="ul" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.ordered_list() }"
                  @click="commands.ordered_list"
                >
                  <icon name="ol" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.blockquote() }"
                  @click="commands.blockquote"
                >
                  <icon name="quote" />
                </button>

                <button
                  class="menubar__button"
                  :class="{ 'is-active': isActive.code_block() }"
                  @click="commands.code_block"
                >
                  <icon name="code" />
                </button>

                <button
                  class="menubar__button"
                  @click="commands.horizontal_rule"
                >
                  <icon name="hr" />
                </button>

                <button
                  class="menubar__button"
                  @click="commands.undo"
                >
                  <icon name="undo" />
                </button>

                <button
                  class="menubar__button"
                  @click="commands.redo"
                >
                  <icon name="redo" />
                </button>

                <button
                  class="menubar__button"
                  @click="showImagePrompt(commands.image)"
                >
                  <icon name="image" />
                </button>

              </div>
            </editor-menu-bar> <!-- Menu Bar Ended -->

            <!-- Editor Content -->
            <editor-content class="editor__content" :editor="editor" />

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
// Import the basic building blocks
import Icon from "@/components/Icon";
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
  Image
} from "tiptap-extensions";

export default {
  components: {
    Icon,
    EditorContent,
    EditorMenuBar
  },
  created: function() {
    this.boardID = this.$route.query.board_id;
  },
  data() {
    return {
      board_id: null,
      // Create an `Editor` instance with some default content. The editor is 
      // then passed to the `EditorContent` component as a `prop`
      editor: new Editor({
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
        content: `<p>다솜은 사랑입니다~!</p><pre><code> std::string dasom = "LOVE"; </code></pre>`,
      }),
    }
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    }
  }
}
</script>

<style scoped>
.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="true"] {
  white-space: pre-wrap;
}
</style>