<template>
  <div>
    <div class="content main-content">
      <div class="md-layout">
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <md-card>
            <md-card-header data-background-color="pantone-provence">
              <h4 class="title">게시판 관리</h4>
            </md-card-header>
            <md-card-content :key="$route.fullPath">

              <!-- 관리용 테이블 -->
              <md-table v-model="boards" :table-header-color="tableHeaderColor">
                <md-table-row
                  slot="md-table-row"
                  slot-scope="{ item }"
                  :key="item.id"
                >
                  <md-table-cell md-label="ID" class="table-title">{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="제목">{{ item.title }}</md-table-cell>
                  <md-table-cell md-label="읽기 권한">{{ translateLevel(item.read_level) }}</md-table-cell>
                  <md-table-cell md-label="쓰기 권한">{{ translateLevel(item.write_level) }}</md-table-cell>
                  <md-table-cell md-label="아이콘">{{ item.icon_class }}</md-table-cell>
                  <md-table-cell md-label="비고">
                    <md-button class="md-provence md-sm" @click="modifyBoard(item)">수정</md-button>
                    <md-button class="md-danger md-sm" @click="removeBoard(item)">삭제</md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table>

              <div class="buttons-wrapper">
                <md-button
                  class="md-dense md-provence md-sm"
                  @click="newBoard"
                  v-bind:key="newBoardButtonValue"
                  >{{ newBoardButtonValue }}</md-button
                >
              </div>

            </md-card-content>
          </md-card>

        </div>
      </div>
    </div>

    <admin-new-board-table v-show="newBoardMode"></admin-new-board-table>
    <!-- <admin-modify-board-table v-show="modifyBoardMode" v-bind:boardData="modifyTargetBoard"></admin-modify-board-table> -->

  </div>
</template>

<script>
import { AdminNewBoardTable } from "@/components";

export default {
  components: {
    AdminNewBoardTable,
    // AdminModifyBoardTable
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: "pantone-provence"
    }
  },
  data: () => {
    return {
      loading: false,
      boards: [],
      newBoardMode: false,
      newBoardButtonValue: "새로운 게시판 ▼",
      modifyBoardMode: false,
      modifyTargetBoard: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 등급 출력
    translateLevel(level) {
      if (level == 1) {
        return "비회원";
      } else if (level == 2) {
        return "정회원";
      } else if (level == 3) {
        return "임원";
      } else if (level == 999) {
        return "관리자";
      } else {
        return "등급 없음";
      }
    },
    // 게시판 정보 가져오기
    fetchData() {
      var vm = this;
      this.loading = true;

      var url = "http://api.dasom.io/boards";
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
          res.data.data.boards.forEach(element => {
            vm.boards.push(element);
          });
        })
        .catch(error => {
          console.log("/admin/boards 오류 발생.");
          console.log(error);
          alert("에러 발생. console을 확인하세요.");
          vm.loading = false;
        });
      this.loading = false;
    },
    // 게시판 생성
    newBoard() {
      // 이미 열려있다면
      if (this.newBoardMode) {
        this.newBoardMode = false;
        this.newBoardButtonValue = "새로운 게시판 ▼";
      } else {
        this.newBoardMode = true;
        this.newBoardButtonValue = "새로운 게시판 ▲";
      }
    },
    // 게시판 수정
    modifyBoard(board) {
      alert("미구현" + board.id);
      return;
      // this.modifyBoardMode = true;
      // this.modifyTargetBoard = board;
    },
    // 게시판 삭제
    removeBoard(board) {
      var vm = this;
      var url = "http://api.dasom.io/boards/" + board.id;
      var config = {
        headers: {
          Authorization: this.$store.getters.getAccessToken,
          "Content-Type": "application/json"
        }
      };

      var result = prompt("(주의) 게시판을 삭제하면 소속된 게시글이 모두 사라질 수 있습니다.\n게시판을 삭제하시려면 삭제를 입력해주세요.");
      if (result == null || result != "삭제") {
        alert("다시 입력해주세요.");
        return;
      } else {
        var cf = confirm("정말 삭제합니까?");
        if (cf == null || cf == false) {
          return;
        }
      }

      this.$http
        .delete(url, config)
        .then(() => {
          alert("삭제가 완료되었습니다.\n페이지를 새로고침해주세요.");
          const idx = vm.boards.findIndex(function(item) {
            return item.id == board.id;
          })
          if (idx > -1) vm.boards.splice(idx, 1);
        })
        .catch(error => {
          console.log("오류 발생.");
          console.log(error);
          alert("에러 발생. console을 확인하세요.");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.buttons-wrapper {
  text-align: right;
  margin: 0 1rem;
}
</style>