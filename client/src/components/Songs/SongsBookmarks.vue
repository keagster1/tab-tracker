<template>
  <Panel title="Bookmarks">
    <v-data-table :headers="headers" :pagination.sync="pagination" :items="bookmarks">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.title}}</td>
        <td class="text-xs-left">{{props.item.artist}}</td>
        <td class="text-xs-left"><v-btn class="cyan" dark @click="navigateTo({name: 'song', params: {songId: props.item.SongId}})">View</v-btn></td>
      </template>
    </v-data-table>
  </Panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  data() {
    return {
      headers: [
        {
          text: "Title",
          value: "title"
        },
        {
          text: "Artist",
          value: "artist"
        },
        {
          text: "View",
          value: ""
        }
      ],
      pagination: {
        sortBy: "createdAt",
        descending: true
      },
      bookmarks: []
    };
  },
  methods: {
    navigateTo(route) {      
      this.$router.push(route);
    }
  },
  computed: {
      ...mapState([
          'isUserLoggedIn',
          'user'
      ])
  },
  async mounted () {
      if (this.isUserLoggedIn) {
          this.bookmarks = (await BookmarksService.index()).data
      }
  }
};
</script>

<style>
</style>
