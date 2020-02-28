<template>
  <nav class="nav" :class="options.themeType">
    <ul class="nav-content">
      <li class="logo-container">
        <div class="logo">
          <a href="/">
            <img src="@/assets/svg/chemtableapp.png" alt="logo" />
          </a>
        </div>
      </li>

      <router-link to="/properties">
        <div
          class="router-link-inner"
          @click="switchAtomTabWrapper('properties')"
        >
          <ListIcon class="icon feather-icon" />
          <h2>Properties</h2>
        </div>
      </router-link>

      <router-link to="/electrons">
        <div
          class="router-link-inner"
          @click="switchAtomTabWrapper('electrons')"
        >
          <ElectronsIcon class="icon custom-icon" />
          <h2>Electrons</h2>
        </div>
      </router-link>

      <router-link to="/orbitals">
        <div
          class="router-link-inner"
          @click="switchAtomTabWrapper('orbitals')"
        >
          <OrbitalsIcon class="icon custom-icon" />
          <h2>Orbitals</h2>
        </div>
      </router-link>

      <router-link to="/isotopes">
        <div
          class="router-link-inner"
          @click="switchAtomTabWrapper('isotopes')"
        >
          <IsotopesIcon class="icon custom-icon" />
          <h2>Isotopes</h2>
        </div>
      </router-link>

      <router-link to="/explore">
        <div class="router-link-inner" @click="switchAtomTabWrapper('explore')">
          <MapIcon class="icon feather-icon" />
          <h2>Explore</h2>
        </div>
      </router-link>

      <router-link to="/trivia">
        <div class="router-link-inner" @click="switchAtomTabWrapper('trivia')">
          <CheckIcon class="icon feather-icon" />
          <h2>Trivia</h2>
        </div>
      </router-link>

      <li
        class="info-nav-item no-text"
        tabindex="0"
        @click="setInfoModalActive(true)"
      >
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

    <InfoModal />
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
    $background: $theme-light-background,
    $hasShadow: true,
    $shadow: $theme-light-shadow,
    $shadowHover: $theme-light-shadow-hover,
    $navItemHover: $oc-gray-2,
    $navItemClick: $oc-gray-3,
    $navItemActive: $oc-gray-2,
    $heading: $oc-gray-7,
    $icon: $oc-gray-7
  );
}

.dark-def {
  @include navigationThemeDefault(
    $background: $theme-dark-background,
    $hasShadow: false,
    $shadow: $theme-dark-shadow,
    $shadowHover: $theme-dark-shadow-hover,
    $navItemHover: $oc-gray-7,
    $navItemClick: $oc-gray-6,
    $navItemActive: $oc-gray-7,
    $heading: $oc-gray-1,
    $icon: $oc-gray-1
  );
}
</style>
