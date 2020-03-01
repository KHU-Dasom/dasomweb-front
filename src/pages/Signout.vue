<script>
export default {
  name: "Signout",
  data() {
    return {};
  },
  methods: {
    // signout
    signout() {
      // LOGIN Action
      this.$store
        .dispatch("LOGOUT")
        .then(() => this.redirect())
        .catch(() => this.redirect());
    },
    redirect() {
      alert("로그아웃 되었습니다.");
      this.$router.push("/dashboard");
    }
  },
  mounted() {
    this.signout();
  }
};
</script>
