<template>
  <nav id="nav" :class="options.themeType">
    <ul id="nav-content">
      <li id="logo-container">
        <div id="logo">
          <a href="/">
            <img src="@/assets/placeholder.png" alt="logo" height="32px" />
          </a>
        </div>
      </li>

      <router-link tag="li" to="/properties">
        <div class="inner" @click="switchAtomTabWrapper('properties')">
          <ListIcon class="icon feather-icon" />
          <h2>Properties</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/electrons">
        <div class="inner" @click="switchAtomTabWrapper('electrons')">
          <ElectronsIcon class="icon custom-icon" />
          <h2>Electrons</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/orbitals">
        <div class="inner" @click="switchAtomTabWrapper('orbitals')">
          <OrbitalsIcon class="icon custom-icon" />
          <h2>Orbitals</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/isotopes">
        <div class="inner" @click="switchAtomTabWrapper('isotopes')">
          <IsotopesIcon class="icon custom-icon" />
          <h2>Isotopes</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/explore">
        <div class="inner" @click="switchAtomTabWrapper('explore')">
          <MapIcon class="icon feather-icon" />
          <h2>Explore</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/trivia">
        <div class="inner" @click="switchAtomTabWrapper('trivia')">
          <CheckIcon class="icon feather-icon" />
          <h2>Trivia</h2>
        </div>
      </router-link>

      <li id="info-nav-item" class="no-text" @click="setInfoModalActive(true)">
        <InfoIcon class="icon feather-icon" />
      </li>

      <!-- <li class="no-text">
        <settings-icon class="icon feather-icon" />
      </li> -->

      <!-- <li class="no-text">
        <search-icon class="icon feather-icon" />
      </li> -->

      <li id="menu-mobile" class="no-text">
        <MenuIcon class="icon feather-icon" />
      </li>
    </ul>

    <InfoModal v-if="infoModalActive" />
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

// Importing to-be-used SVG icons
import ListIcon from "@eankeen/vue-feather-icons/components/list.vue";
import ElectronsIcon from "@/assets/svg/icons/electrons.svg";
import OrbitalsIcon from "@/assets/svg/icons/orbitals.svg";
import IsotopesIcon from "@/assets/svg/icons/isotopes.svg";
import MapIcon from "@eankeen/vue-feather-icons/components/map.vue"; // Explore
import CheckIcon from "@eankeen/vue-feather-icons/components/check.vue"; // Trivia
import InfoIcon from "@eankeen/vue-feather-icons/components/info.vue";
// import Settings from "@eankeen/vue-feather-icons/components/settings.vue";
// import Search from "@eankeen/vue-feather-icons/components/search.vue";
import MenuIcon from "@eankeen/vue-feather-icons/components/menu.vue";

import InfoModal from "@/components/info-modal/InfoModal";

export default {
  name: "Navigation",
  components: {
    // Icon Components
    ListIcon,
    ElectronsIcon,
    OrbitalsIcon,
    IsotopesIcon,
    MapIcon, // Explore
    CheckIcon, // Trivia
    InfoIcon,
    // SettingsIcon: Settings,
    // SearchIcon: Search,
    MenuIcon,
    InfoModal
  },
  data() {
    return {
      showInfoModel: true
    };
  },
  computed: {
    ...mapState("mainAtomTable", ["options"]),
    ...mapState("modals", ["infoModalActive"])
  },
  methods: {
    ...mapActions("mainAtomTable", ["switchAtomTab"]),
    switchAtomTabWrapper: function(atomTabToSwitchTo) {
      if (atomTabToSwitchTo === "properties") {
        this.switchAtomTab({ to: "Properties" });
      } else if (atomTabToSwitchTo === "electrons") {
        this.switchAtomTab({ to: "Electrons" });
      } else if (atomTabToSwitchTo === "orbitals") {
        // eslint-disable-next-line
      } else if (atomTabToSwitchTo === "isotopes") {
      }
      // explore, trivia, excluded
    },
    ...mapMutations("modals", ["setInfoModalActive"])
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
@import "navigation";
@import "navigationMobile";
@import "navigationThemes";

.light-def {
  @include navigationThemeDefault(
    $ld-background,
    true,
    $ld-shadow,
    $ld-shadow-hover,
    $oc-gray-2,
    $oc-gray-3,
    $oc-gray-2,
    $oc-gray-7,
    $oc-gray-7
  );
}

.dark-def {
  @include navigationThemeDefault(
    $dd-background,
    false,
    $dd-shadow,
    $dd-shadow-hover,
    $oc-gray-7,
    $oc-gray-6,
    $oc-gray-7,
    $oc-gray-1,
    $oc-gray-1
  );
}
</style>
