<template>
    <section v-if="options.infoLocationType !== 'info-exclude'" id="element-info-panel">
        <div id="visual">
            <h2>Visual Element</h2>
        </div>
        <div id="textual">
            <h2>Textual Element</h2>
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
</style>