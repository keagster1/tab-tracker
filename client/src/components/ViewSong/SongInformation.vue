<template>
  <Panel title="Song Information">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">{{song.title}}</div>
        <div class="song-artist">{{song.artist}}</div>
        <div class="song-genre">{{song.genre}}</div>
      </v-flex>
      <v-flex xs6>
        <img :src="song.albumImageUrl" alt class="album-image">
        <br>
        {{song.album}}
      </v-flex>
    </v-layout>
  </Panel>
</template>

<script>
import Panel from '@/components/Panel.vue'
export default {
  components: { Panel },
  props: ["song"]
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
