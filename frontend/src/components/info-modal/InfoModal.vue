<template>
  <div class="info-modal">
    <transition name="popup">
      <div v-if="infoModalActive" class="info-modal-inner">
        <h1>Info</h1>
        <p>
          This periodic table application was built by Edwin Kofler. The website
          is in active development - a feedback system will be instantiated in
          the near future.
        </p>
        <button @click="setInfoModalActive(false)">close</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "InfoModal",
  computed: {
    ...mapState("modals", ["infoModalActive"])
  },
  methods: {
    ...mapMutations("modals", ["setInfoModalActive"])
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
@import "infoModal";
@import "infoModalTheme";

.light-def {
  @include infoModalThemeDefault(
    $ld-background,
    true,
    $ld-shadow,
    $ld-shadow-hover
  );
}
</style>
