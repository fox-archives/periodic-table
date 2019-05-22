<template>
  <section id="panel">
    <router-view name="visualInfo"/>
    <router-view name="textualInfo"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ElementInfoPanel',
  computed: {
    ...mapGetters(['options'])
  }
};
</script>

<style scoped lang="scss">
@import '../styles/variables';

// INFO SIDE
.info-side #panel {
  display: grid;
  grid-template-columns: 17vw;
  grid-template-rows: 17vw auto;
  grid-row-gap: $spacing;
  border-radius: $border-radius;
}

// INFO TOP
.info-top #panel {
  display: grid;
  grid-template-columns: 20vw auto;
  grid-template-rows: 20vw;
  grid-column-gap: $spacing;
  margin-bottom: $spacing;
  border-radius: $border-radius;
}

// INFO EXCLUDE
.info-exclude #panel {
  display: none;
}
</style>
