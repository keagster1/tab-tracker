<template>
    <Panel title="YouTube Video" class='ml-2 mb-2'>
        <!-- youtube embedded -->
        <youtube :video-id="youtubeId" :player-width="500" :player-height="300"/>
    </Panel>
</template>

<script>
import Panel from '@/components/Panel.vue'
export default {
  components: { Panel },
  props: ["youtubeId"]
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
