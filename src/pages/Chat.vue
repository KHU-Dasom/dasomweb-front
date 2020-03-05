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
        <md-textarea style="resize:unset; min-height:50px; height:50px"></md-textarea>

        <md-button class="md-dense md-provence pagination-button">send</md-button>
    </md-field>

  </div>
</template>

<script>
export default {
  components: {

  },
  data(){
    return {
    }
  },
  methods: {
    sendmsg() {
      alert("sdfsdf")
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
