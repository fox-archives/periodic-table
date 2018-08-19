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
      grid-template-columns: 20vw 1fr;
      grid-template-rows: 20vw;
      grid-column-gap: $spacing;
      margin-bottom: $spacing;
      border-radius: $border-radius;
      // width: 100%; // Not sure why I need this. Maybe to stretch the component to the width of body?

      #visual {
        height: 100%;
        width: 100%;
      }
    }

    .panel.info-side {
      display: grid;
      grid-template-columns: 17vw;
      grid-template-rows: 17vw auto;
      grid-row-gap: $spacing;
      border-radius: $border-radius;
      margin-right: $spacing;
      // TODO: Make the height of the panel stretch the whole remaining height.
      // Do not add a height because by default, the height is the same as the height of the periodic table, which scales
    }

    .panel.info-exclude {
      display: none;
    }

</style>