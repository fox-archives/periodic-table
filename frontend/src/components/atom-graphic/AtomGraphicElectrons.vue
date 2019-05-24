<template>
  <div>
    <div id="visual-inner" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ElectronsVisual',
  computed: {
    ...mapGetters(['activeElement', 'options'])
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables';
@import 'atomGraphicTheme';
@import 'atomGraphic';

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
