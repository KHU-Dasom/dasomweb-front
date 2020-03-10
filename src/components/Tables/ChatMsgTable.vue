<template>
  <div>
    <md-list v-for="(msg, index) in msgs" v-bind:key="index">
      <md-list-item>
        <md-avatar class="md-avatar-icon" style="font-size: 15px;">{{ msg.from }}</md-avatar>
        <div class="md-list-item-text">
          <span>{{msg.message}}</span>
          <span>{{msg.sendtime}}</span>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "ChatMsgTable",
  props: ["msgs"]
};
</script>
