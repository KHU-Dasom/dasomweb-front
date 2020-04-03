<template>
  <div class="content content-home">
    <!-- 대문 이미지 -->
    <div class="main-image-wrapper">
      <span class="main-title">다솜 커뮤니티</span>
    </div>

    <!-- 아이콘 모음 -->
    <div class="main-icons-wrapper">

      <!-- Icon -->
      <div class="icon-container" @click="iconClicked(iconUrlMap.khu_home)">
        <div class="icon-view">
          <img :src="require('@/assets/img/home-icons/khu_ci_lion_character.png')" />
        </div>
        <span class="icon-label">경희대학교</span>
      </div>

      <!-- Icon -->
      <div class="icon-container" @click="iconClicked(iconUrlMap.khu_ce)">
        <div class="icon-view">
          <img :src="require('@/assets/img/home-icons/khu_ci_flower.png')" />
        </div>
        <span class="icon-label">SW중심대학</span>
      </div>

    </div> <!-- Icon wrapper ends -->
  </div>
</template>

<script>
export default {
  data: () => ({
    iconUrlMap: {
      khu_home: "https://khu.ac.kr",
      khu_sw: "https://software.khu.ac.kr"
    }
  }),
  methods: {
    iconClicked(url) {
      window.location.href = url;
    }
  }
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
  height: 200px;

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

// Icon Wrapper
.main-icons-wrapper {
  width: 100%;
  max-width: 55rem;
  height: 400px;

  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;

  overflow-y: auto;

  // Icons
  .icon-container {
    cursor: pointer;
    float: left;

    width: 100px;
    height: 100px;

    text-align: center;
    margin: 30px;

    .icon-view {
      width: 100%;

      border-radius: 15px;
      box-shadow: 0 5px 28px 0 rgba(0, 0, 0, 0.1);
      background-color: white;

      img {
        width: 70%;
        margin: 15%;
      }
    }

    .icon-label {
      font-size: 0.9rem;
      text-align: center;
      margin-top: 10px;
      font-weight: 500;
    }
  }
}
</style>