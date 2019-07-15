<template>
  <div>
    <div id="visual-inner" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AtomGraphicOrbitals',
  computed: {
    ...mapState(['activeElement', 'options'])
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
