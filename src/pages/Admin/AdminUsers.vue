<template>
  <div class="content main-content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">회원 정보 관리</h4>
          </md-card-header>
          <md-card-content :key="$route.fullPath">

            <!-- 관리용 테이블 -->
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
            </md-table>

          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableHeaderColor: {
      type: String,
      default: "pantone-provence"
    }
  },
  data: () => {
    return {
      loading: false,
      users: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 회원 등급 출력
    translateUserLevel(user) {
      if (user.level == 1) {
        return "비회원";
      } else if (user.level == 2) {
        return "정회원";
      } else if (user.level == 3) {
        return "임원";
      } else if (user.level == 999) {
        return "관리자";
      } else {
        return "등급 없음";
      }
    },
    // 회원 정보 가져오기
    fetchData() {
      var vm = this;
      this.loading = true;

      var url = "http://api.dasom.io/users";
      var config = {
        headers: {
          Authorization: this.$store.getters.getAccessToken,
          "Content-Type": "application/json"
        }
      };

      this.$http
        .get(url, config)
        .then(res => {
          vm.loading = false;
          res.data.data.users.forEach(element => {
            vm.users.push(element);
          });
        })
        .catch(error => {
          console.log("/admin/users 오류 발생.");
          console.log(error);
          alert("에러 발생. console을 확인하세요.");
          vm.loading = false;
        });
      this.loading = false;
    },
    // 정회원 승인
    promote(user) {
      var url = "http://api.dasom.io/users/" + user.id + "/promote";
      var config = {
        headers: {
          Authorization: this.$store.getters.getAccessToken,
          "Content-Type": "application/json"
        }
      };

      this.$http
        .post(url, null, config)
        .then(() => {
          user.promote_wait = false;
          user.level = 2;
          alert(user.id + "(" + user.name + ")에 대한 정회원 승인 완료.");
        })
        .catch(error => {
          console.log("정회원 승급 오류 발생.");
          console.log(error);
          alert("에러 발생. console을 확인하세요.");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.button-promote {
  width: 95%;
  margin: 0 auto;
}
</style>