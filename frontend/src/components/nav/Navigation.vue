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
        <div class="inner" @click="switchAtomTabDataWrapper('properties')">
          <list-icon class="icon feather-icon" />
          <h2>Properties</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/electrons">
        <div class="inner" @click="switchAtomTabDataWrapper('electrons')">
          <electrons class="icon custom-icon" />
          <h2>Electrons</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/orbitals">
        <div class="inner" @click="switchAtomTabDataWrapper('orbitals')">
          <orbitals class="icon custom-icon" />
          <h2>Orbitals</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/isotopes">
        <div class="inner" @click="switchAtomTabDataWrapper('isotopes')">
          <isotopes class="icon custom-icon" />
          <h2>Isotopes</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/explore">
        <div class="inner" @click="switchAtomTabDataWrapper('explore')">
          <map-icon class="icon feather-icon" />
          <h2>Explore</h2>
        </div>
      </router-link>

      <router-link tag="li" to="/trivia">
        <div class="inner" @click="switchAtomTabDataWrapper('trivia')">
          <check-icon class="icon feather-icon" />
          <h2>Trivia</h2>
        </div>
      </router-link>

      <li id="info-nav-item" class="no-text">
        <info-icon class="icon feather-icon" />
      </li>

      <li class="no-text">
        <settings-icon class="icon feather-icon" />
      </li>

      <li class="no-text">
        <search-icon class="icon feather-icon" />
      </li>

      <li id="menu-mobile" class="no-text">
        <menu-icon class="icon feather-icon" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";

// Importing to-be-used SVG icons
import List from "@eankeen/vue-feather-icons/components/list.vue";
import Electrons from "@/assets/svg/icons/electrons.svg";
import Orbitals from "@/assets/svg/icons/orbitals.svg";
import Isotopes from "@/assets/svg/icons/isotopes.svg";
import Map from "@eankeen/vue-feather-icons/components/map.vue"; // Explore
import Check from "@eankeen/vue-feather-icons/components/check.vue"; // Trivia
import Info from "@eankeen/vue-feather-icons/components/info.vue";
import Settings from "@eankeen/vue-feather-icons/components/settings.vue";
import Search from "@eankeen/vue-feather-icons/components/search.vue";
import Menu from "@eankeen/vue-feather-icons/components/menu.vue";

export default {
  name: "Navigation",
  components: {
    // Icon Components
    ListIcon: List,
    Electrons,
    Orbitals,
    Isotopes,
    MapIcon: Map, // Explore
    CheckIcon: Check, // Trivia
    InfoIcon: Info,
    SettingsIcon: Settings,
    SearchIcon: Search,
    MenuIcon: Menu
  },
  computed: {
    ...mapState(["options"])
  },
  methods: {
    ...mapActions(["switchAtomTabData"]),
    switchAtomTabDataWrapper: function(atomTabToSwitchTo) {
      if (atomTabToSwitchTo === "properties") {
        this.switchAtomTabData({
          atomColorAppearance: "Category",
          atomTab: "Properties"
        });
      } else if (atomTabToSwitchTo === "electrons") {
        this.switchAtomTabData({
          atomColorAppearance: "OrbitalBlock",
          atomTab: "Isotopes"
        });
      } else if (atomTabToSwitchTo === "orbitals") {
        // eslint-disable-next-line
      } else if (atomTabToSwitchTo === 'isotopes') {
      }
      // explore, trivia, excluded
    }
  }
};
</script>

<style scoped lang="scss">
// Variables, mixins, and common components
@import "~@/styles/variables.scss";
@import "~@/styles/tags.scss";
// Structure
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

.light-con {
  @include navigationThemeDefault(
    $lc-background,
    true,
    $lc-shadow,
    $lc-shadow-hover,
    $oc-gray-3,
    $oc-gray-4,
    $oc-gray-3,
    $oc-gray-8,
    $oc-gray-8
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
