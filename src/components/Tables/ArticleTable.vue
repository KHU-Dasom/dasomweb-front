<template>
<div class="content">
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header data-background-color="pantone-provence">
          <h4 class="title">{{ article.title }}</h4>
        </md-card-header>
        <md-card-content>
        <div class="md-alignment-top-right alignright">
          <span>{{ article.published_at_kor }} {{article.author_name}}({{ enrollyear }})
          </span>
        </div>
          <md-divider></md-divider>
          <p><span v-html="article.content"></span></p>
          <div id="typography">
            <div class="title">
              <h2>Typography</h2>
            </div>
            <div class="row">
              <div class="tim-typo">
                <h1>
                  <span class="tim-note">Header 1</span>The Life of Material
                  Dashboard
                </h1>
              </div>
              <div class="tim-typo">
                <h2>
                  <span class="tim-note">Header 2</span>The life of Material
                  Dashboard
                </h2>
              </div>
              <div class="tim-typo">
                <h3>
                  <span class="tim-note">Header 3</span>The life of Material
                  Dashboard
                </h3>
              </div>
              <div class="tim-typo">
                <h4>
                  <span class="tim-note">Header 4</span>The life of Material
                  Dashboard
                </h4>
              </div>
              <div class="tim-typo">
                <h5>
                  <span class="tim-note">Header 5</span>The life of Material
                  Dashboard
                </h5>
              </div>
              <div class="tim-typo">
                <h6>
                  <span class="tim-note">Header 6</span>The life of Material
                  Dashboard
                </h6>
              </div>
              <div class="tim-typo">
                <p>
                  <span class="tim-note">Paragraph</span>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers. I understand
                  culture. I am the nucleus. I think that’s a responsibility
                  that I have, to push possibilities, to show people, this is
                  the level that things could be at.
                </p>
              </div>
              <div class="tim-typo">
                <span class="tim-note">Quote</span>
                <blockquote>
                  <p>
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers. I
                    understand culture. I am the nucleus. I think that’s a
                    responsibility that I have, to push possibilities, to show
                    people, this is the level that things could be at.
                  </p>
                  <small>
                    Kanye West, Musician
                  </small>
                </blockquote>
              </div>
              <div class="tim-typo">
                <span class="tim-note">Muted Text</span>
                <p class="text-muted">
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </p>
              </div>
              <div class="tim-typo">
                <span class="tim-note">Primary Text</span>
                <p class="text-primary">
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </p>
              </div>
              <div class="tim-typo">
                <span class="tim-note">Info Text</span>
                <p class="text-info">
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </p>
              </div>
              <div class="tim-typo">
                <span class="tim-note">Success Text</span>
                <p class="text-success">
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </p>
              </div>
              <div class="tim-typo">
                <span class="tim-note">Warning Text</span>
                <p class="text-warning">
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </p>
              </div>
              <div class="tim-typo">
                <span class="tim-note">Danger Text</span>
                <p class="text-danger">
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </p>
              </div>
              <div class="tim-typo">
                <h2>
                  <span class="tim-note">Small Tag</span>
                  Header with small subtitle
                  <br />
                  <small>Use "small" tag for the headers</small>
                </h2>
              </div>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
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
      boardID: null,
      articleID: null,
      article: {},
      enrollyear: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      var vm = this;

      this.boardID = this.$route.params.board_id;
      this.articleID = this.$route.params.article_id;
      var url =
        "http://api.dasom.io/boards/" +
        this.boardID +
        "/articles/" +
        this.articleID;

      var token = localStorage.getItem("accessToken");
      let config = {
        headers: {
          Authorization: token
        }
      };
      this.$http.defaults.headers.get["Content-Type"] = "application/json";
      this.$http
        .get(url, config)
        .then(res => {
          vm.article = res.data.data;
          vm.enrollyear = String(vm.article.author_id).slice(2, 4);
          console.log(res.data.data);
        })
        .catch(error => {
          if (error.response.request.status == 401) {
            alert("로그인 세션이 만료되었습니다.");
            vm.$router.push("/signin");
          }
        });
    }
  }
};
</script>

<style>
.alignright {
    text-align: right;
}
</style>
