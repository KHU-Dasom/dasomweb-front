<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">"{{ $route.query.query }}" 검색결과</h4>
          </md-card-header>
          <md-card-content>
            <SearchBoardTable></SearchBoardTable>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SearchBoardTable } from "@/components";

export default {
  components: {
    SearchBoardTable
  }
};
</script>
