<template>
  <ul class="nav nav-mobile-menu">
    <!-- 검색 기능 -->
    <li>
      <md-field>
        <label>Search</label>
        <md-input v-model="search" type="text"></md-input>
      </md-field>
    </li>

    <!-- 대쉬보드 -->
    <!-- <li>
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <i class="material-icons">dashboard</i>
        <p>Dashboard</p></a
      >
    </li> -->

    <!-- 알림 기능 -->
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">notifications</i>
          <!-- <span class="notification">5</span> -->
          <p>알림</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">알림 기능은 나중에 추가됩니다.</a></li>
        </ul>
      </drop-down>
    </li>

    <!-- 유저 프로필 -->
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">person</i>
          <p>유저</p>
        </a>
        <ProfileTable v-bind:isMobile="true"></ProfileTable>
        <!-- <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">알림 기능은 나중에 추가됩니다.</a></li>
        </ul> -->
      </drop-down>
    </li>
  </ul>
</template>
<script>
import { ProfileTable } from "@/components";
export default {
  components: {
    ProfileTable
  },
  data() {
    return {
      search: null,
      selectedEmployee: null
    }
  }
};
</script>
