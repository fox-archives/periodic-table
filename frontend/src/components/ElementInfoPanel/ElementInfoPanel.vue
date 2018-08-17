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

    @import './_element-info-panel-theme.scss';

    .light-def {
      @include elementInfoPanelThemeDefault($oc-gray-0);
    }


    .panel.info-auto {

    }

    .panel.info-top {
      display: flex;
      flex-direction: row;
      border-radius: $border-radius;
      width: 100%;
      height: 20vw;
      margin-bottom: 10px;
    }

    .panel.info-side {
      display: flex;
      flex-direction: column;
      width: 25vw;
      margin-right: 10px;
      border-radius: $border-radius;
      // Do not add a height because by default, the height is the same as the height of the periodic table, which scales
    }

    .panel.info-exclude {
      display: none;
    }

</style>