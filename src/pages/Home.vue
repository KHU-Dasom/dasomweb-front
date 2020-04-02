<template>
  <div class="content content-home">
    <!-- 대문 이미지 -->
    <div class="main-image-wrapper">
      <span class="main-title">다솜 커뮤니티</span>
    </div>

    <!-- 아이콘 모음 -->
    <div class="main-icons-wrapper">
      <span>여기는 각종 아이콘 모음이면 괜찮지 않을까 싶은데. 위에다간 대체 무슨 그림 넣지 ㅠ</span>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.content-home {
  padding-left: 0;
  padding-right: 0;
}

.main-image-wrapper {
  display: table;

  width: 100%;
  max-width: 1000px;
  height: 250px;

  margin: 0 auto;

  background: url("http://image.dasom.io/20200322/bg3.jpg");
  background-repeat: no-repeat;
  background-position: center;

  .main-title {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: #eee;

    font-family: "Poppins", sans-serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
    text-transform: uppercase;
  }
}

.main-icons-wrapper {
  width: 100%;
  max-width: 1000px;
  height: 400px;

  margin: 0 auto;
  margin-top: 50px;

  background-color: white;
}
</style>