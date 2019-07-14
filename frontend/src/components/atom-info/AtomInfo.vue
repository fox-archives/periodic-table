<template>
  <div v-if="ready" class="atom-info-wrapper">
    <div class="atom-info">
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
import { mapState, mapGetters, mapActions } from 'vuex';
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

export default {
  name: 'AtomInfo',
  components: {
    simplebar
  },
  watch: {
    $route() {
      // TODO: Make this route watcher on TabGenericPeriodicTableInterface.vue element
      this.updateProperties();
    },
  },
  created() {
    this.updateProperties();
  },
  computed: {
    ...mapGetters(['options', 'activeElement']),
    ...mapState(['atomTabData', 'atomTabDataActive', 'ready']),
    atomTabDataActiveModified() {
      return Object.entries(this.atomTabDataActive);
    }
  },

  methods: {
    ...mapActions(['loadAtomTabProperties']),
    // Fetch properties of elements
    updateProperties: function() {
      // console.log(this.$store.atomSimpleData);
      this.loadAtomTabProperties();
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';
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
