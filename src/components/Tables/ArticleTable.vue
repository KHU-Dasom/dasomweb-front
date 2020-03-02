<template>
  <div>
    <md-table v-model="article" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        {{ item }}
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "article-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      article: []
    };
  },
  methods: {
    getArticle() {
      var token = localStorage.getItem("accessToken");
      let config = {
        headers: {
          Authorization: token
        }
      };
      var vm = this;
      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get("http://api.dasom.io/boards/7/articles/12", config)
        .then(res => {
          console.log(res);
          vm.article = res.data.data.title;
          alert(vm.article)
        });
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>
