<template>
  <div>
    <md-table v-model="articles" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="제목">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="작성 시간">{{ item.published_at }}</md-table-cell>
        <md-table-cell md-label="작성자">{{ item.author_name }}</md-table-cell>
        <md-table-cell md-label="조회수">{{ item.views }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "freeboard-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      boardID: null,
      selected: [],
      articles: []
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var token = localStorage.getItem("accessToken");
      let config = {
        headers: {
          Authorization: token
        }
      };
      var vm = this;
      this.boardID = this.$route.params.board_id;
      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get("http://api.dasom.io/boards/" + this.boardID + "/articles", config)
        .then(res => {
          console.log(res);
          vm.articles = res.data.data.articles;
        });
    }
  }
};
</script>
