<template>
  <div class="atom-info-wrapper">
    <div class="atom-info" v-if="ready">
      <simplebar class="simplebar" data-simplebar-auto-hide="false">
        <div class="atom-info-inner">
          <div class="atom-stat" v-for="atomTabDataMember in atomTabDataActiveModified">
            <p class="atom-stat-text">
              {{ atomTabDataMember[0] }}: {{ atomTabDataMember[1] }}
            </p>
          </div>
        </div>
      </simplebar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

export default {
  name: 'AtomInfo',
  components: {
    simplebar
  },
  computed: {
    ...mapState(['atomTabDataActive', 'ready']),
    atomTabDataActiveModified() {
      return Object.entries(this.atomTabDataActive);
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
@import 'atomInfoTheme';
@import 'atomInfo';

.light-def {
  @include panelTextualThemeDefault(
      $ld-background,
      $ld-background-accent,
      true,
      $ld-shadow,
      $ld-shadow-hover,
      $ld-text
  );
}

.light-con {
  @include panelTextualThemeDefault(
      $lc-background,
      $lc-background-accent,
      true,
      $lc-shadow,
      $lc-shadow-hover,
      $lc-text
  );
}

.dark-def {
  @include panelTextualThemeDefault(
      $dd-background,
      $dd-background-accent,
      false,
      $dd-shadow,
      $dd-shadow-hover,
      $dd-text
  );
}
</style>
