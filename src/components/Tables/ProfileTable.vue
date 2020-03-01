<template>
  <div>
    <md-table v-model="profile" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        {{ item.name }}
        {{ item.enrollYear }}
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "profile-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      profile: [
        {
          name: localStorage.getItem("userName"),
          enrollYear: localStorage.getItem("userEnrollYear")
        }
      ]
    };
  },
};
</script>
