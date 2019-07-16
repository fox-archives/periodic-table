<template>
  <nav id="nav" :class="options.themeType">
    <ul id="nav-content">
      <li id="logo-container">
        <div id="logo">
          <a href="/">
            <img
                src="../../assets/placeholder.png"
                alt="logo"
                height="32px"
            >
          </a>
        </div>
      </li>

      <li class="nav-item">
        <router-link class="nav-item-inner link" to="/properties">
          <list-icon class="icon feather-icon"/>
          <h2 class="heading" @click="loadAtomTabProperties">
            Properties
          </h2>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item-inner link" to="/electrons">
          <electrons class="icon custom-icon"/>
          <h2 class="heading">
            Electrons
          </h2>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item-inner link" to="/orbitals">
          <orbitals class="icon custom-icon"/>
          <h2 class="heading">
            Orbitals
          </h2>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item-inner link" to="/isotopes">
          <isotopes class="icon custom-icon"/>
          <h2 class="heading">
            Isotopes
          </h2>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item-inner link" to="/explore">
          <map-icon class="icon feather-icon"/>
          <h2 class="heading">
            Explore
          </h2>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-item-inner link" to="/trivia">
          <check-icon class="icon feather-icon"/>
          <h2 class="heading">
            Trivia
          </h2>
        </router-link>
      </li>

      <li id="info-nav-item"
          class="nav-item nav-item-inner no-text"
      >
        <info-icon class="icon feather-icon"/>
      </li>

      <li
          class="nav-item nav-item-inner no-text"
      >
        <settings-icon class="icon feather-icon"/>
      </li>

      <li class="nav-item nav-item-inner">
        <search-icon class="icon feather-icon"/>
      </li>

      <li
          id="menu-mobile"
          class="nav-item nav-item-inner no-text"
      >
        <menu-icon class="icon feather-icon"/>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  // Importing to-be-used SVG icons
  import List from '@eankeen/vue-feather-icons/components/list.vue';
  import Electrons from '@/assets/svg/icons/electrons.svg';
  import Orbitals from '@/assets/svg/icons/orbitals.svg';
  import Orbitals2 from '@/assets/svg/icons/orbitals2.svg';
  import Isotopes from '@/assets/svg/icons/isotopes.svg';
  import Map from '@eankeen/vue-feather-icons/components/map.vue'; // Explore
  import Check from '@eankeen/vue-feather-icons/components/check.vue'; // Trivia
  import Info from '@eankeen/vue-feather-icons/components/info.vue';
  import Settings from '@eankeen/vue-feather-icons/components/settings.vue';
  import Search from '@eankeen/vue-feather-icons/components/search.vue';
  import Menu from '@eankeen/vue-feather-icons/components/menu.vue';

  export default {
    name: 'Navigation',
    computed: {
      ...mapState(['options'])
    },
    methods: {
      ...mapActions(['loadAtomTabProperties'])
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
  // Variables, mixins, and common components
  @import '~@/styles/variables.scss';
  @import '~@/styles/tags.scss';
  // Structure
  @import 'navigation';
  @import 'navigationMobile';
  @import 'navigationThemes';

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
