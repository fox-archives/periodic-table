<template>
    <section v-if="options.infoLocationType !== 'info-exclude'" id="element-info-panel">
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
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'options',
        'activeElement',
      ])
    }
  }
</script>

<style scoped lang="scss">
    @import '../../styles/variables.scss';
    @import '../../styles/common/_titles.scss';


    @import './element-info-panel.scss';

    .heading {
        font-family: robotolight;
        font-weight: normal;
    }
</style>