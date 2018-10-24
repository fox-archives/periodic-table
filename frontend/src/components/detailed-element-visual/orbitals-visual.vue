<template>
  <div>
    <div id="visual-inner">

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'OrbitalsVisual',
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


  .light-def {
    #visual-inner {
      background-color: $ld-background !important;
    }
  }

  .light-con {
    #visual-inner {
      background-color: $lc-background !important;
    }
  }

  .dark-def {
    #visual-inner {
      background-color: $dd-background !important;
    }
  }
</style>