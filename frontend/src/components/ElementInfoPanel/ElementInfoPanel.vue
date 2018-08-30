<template>
  <section class="panel" v-bind:class="[options.themeType, options.infoLocationType]">
    <PanelVisual></PanelVisual>
    <PanelTextual></PanelTextual>
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

    // INFO SIDE
    .panel.info-side {
      display: grid;
      grid-template-columns: 17vw;
      grid-template-rows: 17vw auto;
      grid-row-gap: $spacing;
      border-radius: $border-radius;
      margin-right: $spacing;
    }

    // INFO TOP
    .panel.info-top {
      display: grid;
      grid-template-columns: 20vw 1fr;
      grid-template-rows: 20vw;
      grid-column-gap: $spacing;
      margin-bottom: $spacing;
      border-radius: $border-radius;
    }

    // INFO EXCLUDE
    .panel.info-exclude {
      display: none;
    }

</style>