<template>
  <v-layout>
    <v-flex xs4>
      <Panel title="Song Information">
        <v-text-field required :rules="[required]" name="title" label="Title" v-model="song.title"></v-text-field>
        <br>
        <v-text-field required :rules="[required]" name="artist" label="Artist" v-model="song.artist"></v-text-field>
        <br>
        <v-text-field required :rules="[required]" name="genre" label="Genre" v-model="song.genre"></v-text-field>
        <br>
        <v-text-field required :rules="[required]" name="album" label="Album" v-model="song.album"></v-text-field>
        <br>
        <v-text-field required :rules="[required]" name="albumImageUrl" label="Album Image Url" v-model="song.albumImageUrl"></v-text-field>
        <br>
        <v-text-field required :rules="[required]" name="youtubeId" label="YouTube ID" v-model="song.youtubeId"></v-text-field>
      </Panel>
    </v-flex>
    <v-flex xs8>
      <Panel title="Lyric/Tab" class="ml-2">
        <v-text-field required :rules="[required]" multi-line name="lyrics" label="Lyrics" v-model="song.lyrics"></v-text-field>
        <br>
        <v-text-field required :rules="[required]" multi-line name="tab" label="Tab" v-model="song.tab"></v-text-field>
        <br>
      </Panel>
      <div class="danger-alert" v-if="error">{{error}}</div>
      <v-btn dark class="cyan" @click="createSong">Create Song</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongService from "../services/SongsService";
import SongsService from "../services/SongsService";
export default {
  data() {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      required: (value) => !!value || 'Required.',
      error: null
      
    };
  },
  methods: {
    async createSong() {
        this.error = null
        const areAllFieldsFilledIn = Object.keys(this.song).every(key => !!this.song[key])
        if (!areAllFieldsFilledIn) {
            this.error = 'Please fill in all the required fields.'
            console.log(this.error)
            return
        }
      try {
        SongsService.post(this.song);
        this.$router.push({
            name: 'songs'
        })
      } catch (error) {
          console.log(error)
      }
    }
  }
};
</script>

<style>
.danger-alert {
    color: red;
}
</style>
