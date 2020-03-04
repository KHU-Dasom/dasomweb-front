<template>
  <ArticleTable></ArticleTable>
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
      default: ""
    }
  }
};
</script>
