<template>
  <div class="content main-content">
    <ArticleTable></ArticleTable>
  </div>
</template>

<script>
import { ArticleTable } from "@/components";

export default {
  components: {
    ArticleTable
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "pantone-provence"
    }
  }
};
</script>
