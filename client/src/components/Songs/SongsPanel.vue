<template>
  <Panel title="Songs">
    <v-btn
      slot="action"
      to="/songs/create"
      fab
      class="cyan accent-2"
      light
      medium
      absolute
      right
      middle
    >
      <v-icon>add</v-icon>
    </v-btn>
    <div v-for="song in songs" :key="song.id" class="song">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">{{song.title}}</div>
          <div class="song-artist">{{song.artist}}</div>
          <div class="song-genre">{{song.genre}}</div>
          <v-btn
            dark
            class="cyan"
            @click="navigateTo({name: 'song', params: {songId: song.id}})"
          >View</v-btn>
        </v-flex>
        <v-flex xs6>
          <img :src="song.albumImageUrl" alt class="album-image">
        </v-flex>
      </v-layout>
    </div>
  </Panel>
</template>

<script>
import SongsService from "../../services/SongsService";
export default {
  data() {
    return {
      songs: null
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.songs = (await SongsService.index(value)).data;
      }
    }
  }
};
</script>

<style>
</style>
