<template>
  <nav id="nav" :class="options.themeType">
    <ul id="nav-content">
      <ul id="left-nav">
        <ul id="logo-container">
          <li id="logo">
            <a href="/">
              <img
                src="../../assets/placeholder.png"
                alt="logo"
                height="32px"
              >
            </a>
          </li>
        </ul>

        <ul id="nav-items">
          <li id="properties-wide" class="nav-item text">
            <router-link class="nav-item-body link" to="/properties">
              <list-icon class="icon feather-icon" />
              <h2 class="heading" @click="loadOtherData">
                Propertiess
              </h2>
            </router-link>
          </li>

          <li id="electrons-wide" class="nav-item text">
            <router-link class="nav-item-body link" to="/electrons">
              <electrons class="icon custom-icon" />
              <h2 class="heading">
                Electrons
              </h2>
            </router-link>
          </li>

          <li id="orbitals-wide" class="nav-item text">
            <router-link class="nav-item-body link" to="/orbitals">
              <orbitals class="icon custom-icon" />
              <h2 class="heading">
                Orbitals
              </h2>
            </router-link>
          </li>

          <li id="isotopes-wide" class="nav-item text">
            <router-link class="nav-item-body link" to="/isotopes">
              <isotopes class="icon custom-icon" />
              <h2 class="heading">
                Isotopes
              </h2>
            </router-link>
          </li>

          <li id="explore-wide" class="nav-item text">
            <router-link class="nav-item-body link" to="/explore">
              <map-icon class="icon feather-icon" />
              <h2 class="heading">
                Explore
              </h2>
            </router-link>
          </li>

          <li id="trivia-wide" class="nav-item text">
            <router-link class="nav-item-body link" to="/trivia">
              <check-icon class="icon feather-icon" />
              <h2 class="heading">
                Trivia
              </h2>
            </router-link>
          </li>
        </ul>
      </ul>
      <!-- End Left Nav -->

      <ul id="right-nav">
        <li
          id="info"
          class="nav-item nav-item-body no-text"
        >
          <info-icon class="icon feather-icon" />
        </li>

        <li
          id="settings"
          class="nav-item nav-item-body no-text"
        >
          <settings-icon class="icon feather-icon" />
        </li>

        <li id="search" class="nav-item nav-item-body no-text">
          <search-icon class="icon feather-icon" />
        </li>

        <li
          id="menu-mobile"
          class="nav-item nav-item-body no-text"
        >
          <menu-icon class="icon feather-icon" />
        </li>
      </ul>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// Importing to-be-used SVG icons
import List from '@eankeen/vue-feather-icons/components/list.vue';
import Electrons from '../../assets/svg/icons/electrons.svg';
import Orbitals from '../../assets/svg/icons/orbitals.svg';
import Orbitals2 from '../../assets/svg/icons/orbitals2.svg';
import Isotopes from '../../assets/svg/icons/isotopes.svg';
import Map from '@eankeen/vue-feather-icons/components/map.vue'; // Explore
import Check from '@eankeen/vue-feather-icons/components/check.vue'; // Trivia
import Info from '@eankeen/vue-feather-icons/components/info.vue';
import Settings from '@eankeen/vue-feather-icons/components/settings.vue';
import Search from '@eankeen/vue-feather-icons/components/search.vue';
import Menu from '@eankeen/vue-feather-icons/components/menu.vue';

export default {
  name: 'Head',
  mounted() {
    setTimeout(() => {
      this.infoPopupActive = true;
    }, 1000);
  },
  computed: {
    ...mapGetters(['options'])
  },
  methods: {
    ...mapActions(['loadOtherData']),
    optionsPopup: function(state) {
      if (state === 'on') {
        this.options.blurType = 'blur';
        this.settingsPopupActive = true;
      } else if (state === 'off') {
        this.options.blurType = 'no-blur';
        this.settingsPopupActive = false;
      }
    }
  },
  components: {
    // Icon Components
    ListIcon: List,
    Electrons,
    Orbitals,
    Orbitals2,
    Isotopes,
    MapIcon: Map, // Explore
    CheckIcon: Check, // Trivia
    InfoIcon: Info,
    SettingsIcon: Settings,
    SearchIcon: Search,
    MenuIcon: Menu
  },
};
</script>

<style scoped lang="scss">
/*@import '../../styles/common/options';*/
// Variables, mixins, and common components
@import '../../styles/variables.scss';
@import '../../styles/tags.scss';

// Structure
@import 'head';
@import 'headMobile';
@import 'headTheme';

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
