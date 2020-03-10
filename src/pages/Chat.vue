<template>
  <div class="content" :key="$route">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">채팅방</h4>
          </md-card-header>
          <md-card-content>
            <ChatMsgTable :msgs="msgDatas"></ChatMsgTable>
          </md-card-content>
        </md-card>
        <md-field>
          <md-textarea v-model="message" style="resize:unset; min-height:50px; height:50px" @keydown.enter="sendmsg"></md-textarea>
          <md-button class="md-dense md-provence pagination-button" @click="sendmsg">send</md-button>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ChatMsgTable } from "@/components";
export default {
  components: {
    ChatMsgTable
  },
  data(){
    return {
      conn: null,
      message: "",
      status: "disconnected"
    }
  },
  computed: {
    ...mapState({
      "msgDatas": state => state.msgDatas
    })
  },
  created() {
    this.wsconnect()
  },
  methods: {
    wsconnect() {
      this.socket = new WebSocket("ws://222.251.229.213.:8081/ws");
      this.socket.onopen = () => {
        this.status = "connected"

        this.socket.onmessage = ({data}) => {
          var message = JSON.parse(data);
          this.$store.commit("PushMsgData", {message})
        }
      }
    },
    sendmsg() {
      if (this.status == "disconnected") {
        return false;
      }
      if (this.message == null) {
        return false;
      }
      //var sendtime = this.$moment(new Date()).format("HH:mm a");
      var d = new Date();
      var hour = d.getHours();
      var minute = d.getMinutes();
      if (minute < 10) {
        minute = "0" + String(minute);
      }
      var time;
      if (hour == 12) {
        time = "오후 " + String(hour) + ":" + minute;
      } else if (hour > 12) {
        time = "오후 " + String(hour-12) + ":" + minute;
      } else {
        time = "오전 " + String(hour) + ":" + minute;
      }
      var realmsg = {
        id: localStorage.userID,
        message: this.message,
        from: localStorage.userName.slice(1,3),
        sendtime: time
      };
      this.socket.send(JSON.stringify(realmsg));
      this.message="";
      return false;
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
