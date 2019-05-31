<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <SongsSearchPanel class="mb-2"/>
      <SongsPanel/>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from "@/services/SongsService";
import SongsPanel from "@/components/Songs/SongsPanel.vue";
import SongsSearchPanel from "@/components/Songs/SongsSearchPanel.vue";

export default {
  components: {
    SongsPanel,
    SongsSearchPanel
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
