<template>
  <div>
    <md-table v-model="profile" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <div v-if="login">
          <li><a>{{ item.name }}</a></li>
          <li><a>{{ item.enrollYear }}</a></li>
          <li><a><button @click="onClickSignout()">로그아웃</button></a></li>
        </div>
        <div v-else>
          <li><a><button @click="onClickSignin()">로그인</button></a></li>
        </div>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "profile-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "pantone-provence"
    }
  },
  data() {
    return {
      profile: [
        {
          login: null,
          name: localStorage.getItem("userName"),
          enrollYear: localStorage.getItem("userEnrollYear")
        }
      ]
    };
  },
  methods: {
    getProfile() {
      if ( localStorage.getItem("userName") != null ) {
        this.login = true;
      }
      else {
        this.login = false;
      }
    },
    onClickSignin() {
      this.$router.push("/signin");
    },
    onClickSignout() {
      this.$router.push("/signout");
    }
  },
  created() {
    this.getProfile();
  }
};
</script>
