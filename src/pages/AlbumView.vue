<template>
  <album-view-table></album-view-table>
</template>

<script>
import { AlbumViewTable } from "@/components";

export default {
  components: {
    AlbumViewTable
  },
  props: {
    dataBackgroundColor: {
      type: String,
      default: "pantone-provence"
    }
  }
};
</script>
