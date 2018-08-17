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
      display: grid;
      grid-template-columns: 20vw auto;
      grid-template-rows: 20vw;
      border-radius: $border-radius;
      width: 100%;
      margin-bottom: 10px;

      #visual {
        height: 100%;
        width: 100%;
        background-color: $oc-yellow-1;
      }

      #textual {
        background-color: $oc-orange-1;
      }
    }

    .panel.info-side {
      display: grid;
      grid-template-columns: 17vw;
      grid-template-rows: 17vw auto;
      margin-right: 10px;
      border-radius: $border-radius;
      // Do not add a height because by default, the height is the same as the height of the periodic table, which scales

      #visual {
        background-color: $oc-yellow-1;
      }

      #textual {
        background-color: $oc-orange-1;
      }
    }

    .panel.info-exclude {
      display: none;
    }

</style>