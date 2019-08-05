<template>
  <div>
    <div id="visual-inner">
      <div id="icon">
        <div id="icon-inner" :class="atomActiveSimpleData.color">
          <p>{{ atomActiveSimpleData.atomAbbreviation }}</p>
        </div>
      </div>
      <div id="text">
        <p>{{ atomActiveSimpleData.atomName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AtomGraphicProperties',
  computed: {
    ...mapState(['atomActiveSimpleData'])
  }
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import 'atomGraphicTheme';
@import 'atomGraphic';
</style>
