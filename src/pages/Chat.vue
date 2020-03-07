<template>
  <div class="content">
    <md-card>
      <md-card-header>
        <div class="md-title">Card without hover effect</div>
      </md-card-header>
      <md-card-content>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>
        <div>안녕하세요 채팅시작</div>

      </md-card-content>
    </md-card>
    <md-field>
        <md-textarea v-model="message" style="resize:unset; min-height:50px; height:50px" @keydown.enter="sendmsg"></md-textarea>

        <md-button class="md-dense md-provence pagination-button" @click="sendmsg">send</md-button>
    </md-field>

  </div>
</template>

<script>
export default {
  components: {

  },
  data(){
    return {
      conn: null,
      message: "",
      status: "disconnected"
    }
  },
  created() {
    this.wsconnect();
  },
  methods: {
    wsconnect() {
      this.socket = new WebSocket("ws://222.251.229.213:8081/ws");
      alert(this.status)
      this.socket.onopen = () => {
        this.status = "connected"
        alert(this.status)
      }
    },
    sendmsg() {
      if (this.status == "disconnected") {
        alert("1번쨰")
        console.log(this.message)
        return false;
      }
      if (this.message == null) {
        alert("2번째")
        console.log(String(this.message))
        return false;
      }
      console.log(this.message)
      //this.conn.send(this.message);

      return false;
    },
    connectWs() {
      //this.$connect("ws://222.251.229.213:8081/ws");
      this.conn = true;
    }
  }
};

</script>

<style>
#log {
    background: white;
    margin: 0;
    padding: 0.5em 0.5em 0.5em 0.5em;
    top: 0.5em;
    left: 0.5em;
    right: 0.5em;
    bottom: 3em;
    overflow: auto;
    height: 50em;
    width: 90em;
}

.md-textarea {
  resize: unset;
}

</style>
