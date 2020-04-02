<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">관리자 전용 페이지</h4>
          </md-card-header>
          <md-card-content :key="$route.fullPath">

            <!-- List -->
            <md-list class="md-double-line">
              <md-list-item @click="redirect('/admin/users')">
                <md-icon class="">person</md-icon>
                <div class="md-list-item-text">
                  <span>회원 정보 관리</span>
                  <p>회원 정보 조회, 정회원 승인 등의 기능.</p>
                </div>
              </md-list-item>

              <md-list-item @click="redirect('/admin/boards')">
                <md-icon class="">content_paste</md-icon>
                <div class="md-list-item-text">
                  <span>게시판 관리</span>
                  <p>게시판 생성 및 삭제 등의 기능.</p>
                </div>
              </md-list-item>

              <md-list-item @click="redirect('/admin/main-page')">
                <md-icon class="">home</md-icon>
                <div class="md-list-item-text">
                  <span>홈 메인 관리</span>
                  <p>dasom.io 메인 페이지 내 데이터 수정 기능.</p>
                </div>
              </md-list-item>
            </md-list>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirect(path) {
      this.$router.push(path);
    }
  }
};
</script>

