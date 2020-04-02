<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <!-- <h3 class="md-title">{{ $route.name }}</h3> -->
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-layout md-gutter">
            <div class="md-layout-item" style="margin-right: 10px;">
              <md-field>
                <md-select
                  v-model="searchtype"
                  name="searchtype"
                  id="searchtype"
                  style="width: 80px;"
                  md-dense
                >
                  <md-option value="title">제목</md-option>
                  <md-option value="author">작성자</md-option>
                </md-select>
              </md-field>
            </div>
          </div>

          <md-field>
            <!-- <md-textarea v-model="searchmsg" style="resize:unset; min-height:50px; height:50px" @keydown.enter="search"></md-textarea> -->
            <md-input
              id="input-searchmsg"
              v-model="searchmsg"
              style="resize:unset; min-height:50px; height:50px; margin-top: -2px;"
              @keydown.enter="search"
              placeholder="검색어를 입력하세요."
            ></md-input>
          </md-field>

          <md-list>

            <li class="md-list-item">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <!-- <span class="notification">5</span> -->
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a href="#">개인 알림 기능은 나중에 추가됩니다.</a>
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
            <li class="md-list-item">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>person</md-icon>
                      <p class="hidden-lg hidden-md">Profile</p>
                    </md-button>
                    <ProfileTable></ProfileTable>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { ProfileTable } from "@/components";

export default {
  components: {
    ProfileTable
  },
  data() {
    return {
      searchtype: "title",
      searchmsg: "",
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    search() {
      this.$router.push(
        "/search?type=" + this.searchtype + "&query=" + this.searchmsg
      );
      this.searchtype = "";
      this.searchmsg = "";
    }
  }
};
</script>

<style lang="scss">
#input-searchmsg::placeholder {
  font-size: 13px !important;
}
</style>
