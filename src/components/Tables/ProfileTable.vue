<template>
  <ul class="dropdown-menu dropdown-menu-right profile-table">
    <!-- 프로필 -->
    <li v-if="isLogin">
      <md-list class="md-double-line center-align">
        <!-- 유저 정보 -->
        <md-list-item>
          <md-avatar class="md-avatar-icon" style="font-size: 16px;">{{
            userName.slice(1, 3)
          }}</md-avatar>

          <div class="md-list-item-text">
            <span class="">{{ userName }} ({{ userEnrollYear }})</span>
            <span class="">{{ userID }}</span>
          </div>
        </md-list-item>

        <!-- 세션 만료 시간 -->
        <md-list-item>
          <div class="md-list-item-text">
            <span class="">{{ expiryDiffStr }}</span>
          </div>
        </md-list-item>
      </md-list>
    </li>

    <li v-if="isLogin">
      <md-button
        class="md-provence md-sm profile-buttons"
        @click="onClickSignout"
        >로그아웃</md-button
      >
      <md-button
        class="md-provence md-sm profile-buttons"
        @click="onClickRefresh"
        >세션 연장</md-button
      >
    </li>

    <li v-else>
      <md-button
        class="md-provence md-sm profile-buttons"
        @click="onClickSignin"
        >로그인</md-button
      >
    </li>
  </ul>
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
  computed: {
    isLogin: function() {
      return this.$store.state.accessToken !== null;
    },
    userID: function() {
      return this.$store.state.userID;
    },
    userEnrollYear: function() {
      return this.$store.state.userEnrollYear;
    },
    userName: function() {
      return this.$store.state.userName;
    }
  },
  created() {
    this.startTimer();
    this.$store.watch(
      () => this.$store.getters.getAccessToken,
      accessToken => {
        if (accessToken !== null) {
          this.clearTimer();
          this.startTimer();
        }
      }
    );
  },
  data() {
    return {
      expiryDiffStr: "",
      timer: null
    };
  },
  methods: {
    startTimer() {
      if (this.$store.state.accessToken != null) {
        var vm = this;

        var expiry = this.$store.state.accessTokenExpiry;
        var target = this.$moment.unix(expiry);
        var now = this.$moment(new Date()).unix() * 1000;
        var diff = target.diff(now) / 1000; // seconds

        this.timer = setInterval(function() {
          vm.expiryDiffStr = vm.makeTimeFormat(diff);
          diff -= 1;

          if (diff < 1) {
            clearInterval(vm.timer);
            alert("로그인 세션이 만료되었습니다.");
            vm.$router.push({
              path: "/signin",
              query: {
                redirectPath: encodeURI(vm.$route.path)
              }
            });
          }
        }, 1000);
      }
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    onClickSignin() {
      this.$router.push("/signin");
    },
    onClickSignout() {
      this.$router.push("/signout");
    },
    onClickRefresh() {
      this.clearTimer();
      var refresh_token = this.$store.state.refreshToken;
      this.$store.dispatch("REFRESH", { refresh_token });

      this.startTimer();
    },
    makeTimeFormat(sec) {
      var seconds = sec % 60;
      var minutes = (sec - seconds) / 60;

      var result = "";
      if (minutes < 10) {
        result += "0" + minutes;
      } else {
        result += String(minutes);
      }

      if (seconds < 10) {
        result += ":0" + seconds;
      } else {
        result += ":" + seconds;
      }

      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.profile-table {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: default;

  a {
    background: none;
  }

  .profile-buttons {
    margin: 0 5px;
    cursor: pointer;
  }
}

.center-align {
  text-align: center;
}
</style>
