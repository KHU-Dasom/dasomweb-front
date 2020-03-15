<template>
  <div class="content main-content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="pantone-provence">
            <h4 class="title">채팅방</h4>
          </md-card-header>
          <md-card-content class="md-scrollbar">
          <div>

            <md-list v-for="(msg, index) in msgs" v-bind:key="index">
            <!--<infinite-loading direction="top" @infinite="infiniteHandler" spinner="waveDots"></infinite-loading>-->
              <md-list-item>
                <md-avatar class="md-avatar-icon" style="font-size: 15px;">{{ msg.from.slice(1,3) }}</md-avatar>
                <div class="md-list-item-text">
                  <span>{{msg.message}}</span>
                  <span>{{msg.sendtime}}</span>
                </div>
              </md-list-item>
            </md-list>
          </div>
          </md-card-content>
        </md-card>
        <md-field>
          <md-textarea v-model="sendmessage" style="resize:unset; min-height:50px; height:50px" @keydown.enter="sendmsg"></md-textarea>
          <md-button class="md-dense md-provence pagination-button" @click="sendmsg">send</md-button>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      conn: null,
      sendmessage: "",
      status: "disconnected",
      msgData: "",
      idx: 0,
      msgs: []
    }
  },
  created() {
    this.wsconnect()
  },
  methods: {
    wsconnect() {
      this.socket = new WebSocket("ws://222.251.229.213:8082/ws");
      this.socket.onopen = () => {
        this.status = "connected";
        this.getmsg();

        this.socket.onmessage = ({data}) => {

          var templist = JSON.parse(data);
          console.log(templist);
          for(var i=0; i<templist.length; i++) {
            this.msgData = templist[i]
            this.msgs.push(this.msgData);
            console.log(this.msgData);
          }
        }
      }
    },
    sendmsg() {
      console.log(this.sendmessage)
      if (this.status == "disconnected") {
        return false;
      }
      if (this.sendmessage == null) {
        return false;
      }
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
        type: "message",
        data: {
          message: this.sendmessage,
          from: this.$store.state.userName,
          sendtime: time,
          user_id: this.$store.state.userID
        }
      }
      this.socket.send(JSON.stringify(realmsg));
      this.sendmessage="";
      this.idx = this.idx + 1;
      return false;
    },
    getmsg() {
      var realmsg = {
        type: "command",
        data: {
          idx: this.idx
        }
      }
      this.idx = this.idx + 10;

      this.socket.send(JSON.stringify(realmsg));
      return false;
    }
  }
};

</script>

<style  lang="scss" scoped>

.md-textarea {
  resize: unset;
}

.md-card-content {
  max-width: 100%;
  max-height: 600px;
  overflow: auto;
}

</style>
