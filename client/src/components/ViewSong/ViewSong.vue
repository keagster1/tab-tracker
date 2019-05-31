<template>
  <div>
    <v-layout>
      <v-flex xs6 class="mb-2">
        <!-- Name, artist, genre, album -->
        <song-information :song="song"/>
      </v-flex>
      <v-flex xs6>
        <!-- Youtube Video -->
        <youtube-video :youtubeId="song.youtubeId"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6>
        <!-- Tab -->
        <Tab :song="song"/>
      </v-flex>
      <v-flex xs6>
        <!-- Lyrics -->
        <Lyrics :song="song"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongsService from "@/services/SongsService";
import SongInformation from "@/components/ViewSong/SongInformation";
import YoutubeVideo from "@/components/ViewSong/YoutubeVideo";
import Lyrics from "@/components/ViewSong/Lyrics";
import Tab from "@/components/ViewSong/Tab";
export default {
  components: {
    SongInformation,
    YoutubeVideo,
    Lyrics,
    Tab
  },
  async mounted() {
    const songId = this.$store.state.route.params.songId;
    this.song = (await SongsService.show(songId)).data;
  },
  data() {
    return {
      song: {}
    };
  }
};
</script>

<style>

</style>
