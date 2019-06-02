<template>
  <Panel title="Recently Viewed Songs">
    <v-data-table :headers="headers" :pagination.sync="pagination" :items="songs">
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
import SongHistoryService from '@/services/SongHistoryService'
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
      songs: []
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
          this.songs = (await SongHistoryService.index({
          })).data
      }
  }
};
</script>

<style>
</style>
