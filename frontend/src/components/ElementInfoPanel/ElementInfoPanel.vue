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

    .panel.info-top {
      display: grid;
      grid-template-columns: 20vw 1fr;
      grid-template-rows: 20vw;
      grid-column-gap: $spacing;
      margin-bottom: $spacing;
      border-radius: $border-radius;

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
    }

    .panel.info-exclude {
      display: none;
    }

</style>