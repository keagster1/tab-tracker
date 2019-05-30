<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
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
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from "./Panel.vue";
import SongsService from "../services/SongsService";

export default {
  components: {
    Panel
  },
  data() {
    return {
      songs: null
    };
  },
  async mounted() {
    this.songs = (await SongsService.index()).data;
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style>
.album-image {
  width: 70%;
  margin: auto 0;
}
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
</style>
