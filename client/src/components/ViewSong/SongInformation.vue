<template>
  <Panel title="Song Information">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">{{song.title}}</div>
        <div class="song-artist">{{song.artist}}</div>
        <div class="song-genre">{{song.genre}}</div>
        <v-btn
          dark
          class="cyan"
          @click="navigateTo({name: 'song-edit', params: {songId: song.id}})"
        >Edit</v-btn>
        <v-btn dark class="cyan" v-if="isUserLoggedIn && !bookmark" @click="setAsBookmark">Bookmark</v-btn>
        <v-btn
          dark
          class="cyan"
          v-if="isUserLoggedIn && bookmark"
          @click="removeBookmark"
        >Unbookmark</v-btn>
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
import { mapState } from "vuex";
import BookmarksService from "@/services/BookmarksService";
export default {
  data() {
    return {
      bookmark: null
    };
  },
  props: ["song"],
  computed: {
    ...mapState(["isUserLoggedIn"])
  },
  watch: {
    async song() {
      try {
        this.bookmark = (await BookmarksService.index({
          songId: this.$store.state.route.params.songId,
          userId: this.$store.state.user.id
        })).data;
      } catch (error) {
        console.log(error);
        this.bookmark = null;
      }
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async setAsBookmark() {
      if (!this.isUserLoggedIn) {
        return;
      }
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.$store.state.route.params.songId,
          userId: this.$store.state.user.id
        })).data;
      } catch (error) {
        console.log(error);
        this.bookmark = null;
      }
    },
    async removeBookmark() {
      try {
        await BookmarksService.delete(this.bookmark.id);
        this.bookmark = null;
      } catch (error) {
        console.log(error);
      }
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
