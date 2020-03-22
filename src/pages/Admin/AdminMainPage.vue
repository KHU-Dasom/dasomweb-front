<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">홈 메인 관리</h4>
          </md-card-header>
          <md-card-content :key="$route.fullPath">

            <!-- 관리용 테이블
            <md-table v-model="users" :table-header-color="tableHeaderColor">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                :key="item.id"
              >
                <md-table-cell md-label="ID" class="table-title">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="이름">{{ item.name }} ({{ item.enroll_year }})</md-table-cell>
                <md-table-cell md-label="이메일">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="생년월일">{{ item.birth }}</md-table-cell>
                <md-table-cell md-label="등급">{{ translateUserLevel(item) }}</md-table-cell>
                <md-table-cell md-label="비고">
                  <md-button class="md-provence md-sm button-promote" v-if="item.promote_wait" @click="promote(item)">정회원 승인</md-button>
                </md-table-cell>
              </md-table-row>
            </md-table> -->

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
