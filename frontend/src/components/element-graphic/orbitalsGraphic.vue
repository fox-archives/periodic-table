<template>
  <div>
    <div id="visual-inner">

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'OrbitalsGraphic',
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
  @import 'theme';
  @import 'common-graphic';


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