<template>
  <section id="panel" v-bind:class="[options.themeType, options.infoLocationType]">
    <div id="visual">
      <h2 class="heading">Visual Element</h2>
    </div>
    <div id="textual">
      <h2 class="heading">Textual Element</h2>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    name: 'ElementInfoPanel',
    computed: {
      ...mapGetters([
        'options'
      ])
    }
  }
</script>

<style scoped lang="scss">
    @import '../../styles/variables.scss';

    @import './element-info-panel.scss';

    #panel {
        display: flex;
        flex-direction: row;
    }

    .heading {
        font-family: robotolight;
        font-weight: normal;
    }
</style>