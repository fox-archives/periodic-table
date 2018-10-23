<template>
  <div>
    <div id="visual-inner">

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ElectronsVisual',
    computed: {
      ...mapGetters([
        'activeElement',
        'options'
      ])
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables';
  @import 'visual-themes';
  @import 'detailed-visual';

  #visual-inner {
    background-color: $oc-gray-3 !important;
  }
</style>