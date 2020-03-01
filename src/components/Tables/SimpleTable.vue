<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="ID">{{ item.ID }}</md-table-cell>
      <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
      <md-table-cell md-label="Write_level">{{ item.write_level }}</md-table-cell>
      <md-table-cell md-label="Read_level">{{ item.read_level }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
      ]
    };
  },
  methods: {
    getboards () {
      var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODI4NjYyMTksImlzcyI6ImRhc29tLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIiwidXNlcl9iaXJ0aCI6IjE5OTgtMDktMTUiLCJ1c2VyX2VtYWlsIjoidG9yaWhvbWUxQG5hdmVyLmNvbSIsInVzZXJfZW5yb2xsX3llYXIiOjE4LCJ1c2VyX2lkIjoyMDE4MTAyMjQ2LCJ1c2VyX2xldmVsIjoyLCJ1c2VyX25hbWUiOiLstZzsnbjtm4gifQ.el9xO_FqFpQYqH4Re53H04mAjyzLO_Xc1AYj-rl-J5s'
      let config = {
        headers: {
          Authorization: token
        }
      }
      this.$http.get('http://api.dasom.io/boards', config)
        .then(res => {
          alert(res.data.data)
          this.users = res.data.data
        })
      }
    },
  mounted () {
    this.getboards()
  }
};
</script>
