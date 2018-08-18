<template>
  <section class="panel" v-bind:class="[options.themeType, options.infoLocationType]">
    <PanelVisual id="visual"></PanelVisual>
    <PanelTextual id="textual"></PanelTextual>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import PanelVisual from './PanelVisual.vue';
import PanelTextual from './PanelTextual.vue';

  export default {
    name: 'ElementInfoPanel',
    computed: {
      ...mapGetters([
        'options'
      ])
    },
    components: {
      PanelVisual,
      PanelTextual
    }
  }
</script>

<style scoped lang="scss">
    @import '../../styles/variables.scss';

    .panel.info-auto {

    }

    .panel.info-top {
      display: grid;
      grid-template-columns: 20vw auto;
      grid-template-rows: 20vw;
      grid-column-gap: 10px;
      margin-bottom: 10px;
      border-radius: $border-radius;
      width: 100%;

      #visual {
        height: 100%;
        width: 100%;
      }
    }

    .panel.info-side {
      display: grid;
      grid-template-columns: 17vw;
      grid-template-rows: 17vw auto;
      grid-row-gap: 10px;
      border-radius: $border-radius;
      margin-right: 10px;
      // Do not add a height because by default, the height is the same as the height of the periodic table, which scales
    }

    .panel.info-exclude {
      display: none;
    }

</style>