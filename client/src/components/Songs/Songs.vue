<template>
  <v-layout row>
    <v-flex xs6 class="mr-2" v-if="isUserLoggedIn">
      <SongsBookmarks />
      <RecentlyViewedSongs class="mt-2" />
    </v-flex>
    <v-flex :class="{
        xs12: !isUserLoggedIn,
        xs6: isUserLoggedIn
      }">
      <SongsSearchPanel class="mb-2"/>
      <SongsPanel/>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import SongsService from "@/services/SongsService";
import SongsPanel from "@/components/Songs/SongsPanel.vue";
import SongsSearchPanel from "@/components/Songs/SongsSearchPanel.vue";
import RecentlyViewedSongs from "@/components/Songs/RecentlyViewedSongs.vue";
import SongsBookmarks from "@/components/Songs/SongsBookmarks.vue";

export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState(['isUserLoggedIn'])
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
