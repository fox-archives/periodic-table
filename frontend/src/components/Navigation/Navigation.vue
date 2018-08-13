<template>
  <nav id="nav" v-bind:class="options.themeType">
    <ul id="nav-content">
      <ul id="nav-left">
        <li id="logo"><a href="/simple"><img src="../../assets/placeholder.png" height="30px"></a></li>
      </ul>
      <ul id="nav-elements">

        <router-link to="/simple">
        <li class="active navItem" id="simple-wide">
          <type-icon class="navIcon featherIcon"></type-icon>
          <h2 class="navText"> Simple </h2>
        </li>
        </router-link>

        <router-link to="/properties">
        <li class="navItem" id="properties-wide">
          <list-icon class="navIcon featherIcon"></list-icon>
          <h2 class="navText">Properties</h2>
        </li>
        </router-link>

        <router-link to="/electrons">
        <li class="navItem" id="electrons-wide">
          <electrons class="navIcon customIcon"></electrons>
          <h2 class="navText">Electrons </h2>
        </li>
        </router-link>

        <router-link to="/orbitals">
        <li class="navItem" id="orbitals-wide">
          <orbitals class="navIcon customIcon"></orbitals>
          <h2 class="navText">Orbitals</h2>
        </li>
        </router-link>

        <router-link to="/isotopes">
        <li class="navItem" id="isotopes-wide">
          <isotopes class="navIcon customIcon"></isotopes>
          <h2 class="navText"> Isotopes </h2>
        </li>
        </router-link>

        <router-link to="/explore">
        <li class="navItem" id="explore-wide">
          <map-icon class="navIcon featherIcon"></map-icon>
          <h2 class="navText"> Explore </h2>
        </li>
        </router-link>

        <router-link to="/trivia">
        <li class="navItem" id="trivia-wide">
          <check-icon class="navIcon featherIcon"></check-icon>
          <h2 class="navText"> Trivia </h2>
        </li>
        </router-link>


        <li class="navItem" id="info" v-on:click="infoPopup('on')">
          <info-icon class="navIcon featherIcon"></info-icon>
        </li>

        <li class="navItem" id="settings" v-on:click="optionsPopup('on')">
          <settings-icon class="navIcon featherIcon"></settings-icon>
        </li>

        <li class="navItem" id="search">
          <search-icon class="navIcon featherIcon"></search-icon>
        </li>

        <li class="navItem" id="menu-mobile" v-on:click="menuPopup('on')">
          <menu-icon class="navIcon featherIcon"></menu-icon>
        </li>

      </ul>
    </ul>

    <!-- POPUP FOR INFO -->
    <vs-popup vs-title="Information" v-bind:vs-active="infoPopupActive" v-on:vs-cancel="infoPopup('off')">
      <InfoPopup/>
    </vs-popup>

    <!-- POPUP FOR HAMBURGER NAV (MENU)-->
    <vs-popup vs-title="Choose a View" v-bind:vs-active="menuPopupActive" v-on:vs-cancel="menuPopup('off')">
      <MenuPopup/>
    </vs-popup>

    <!-- POPUP FOR SETTINGS / OPTIONS -->
    <vs-popup vs-title="Options" v-bind:vs-active="settingsPopupActive" v-on:vs-cancel="optionsPopup('off')">
      <OptionsPopup/>
    </vs-popup>
  </nav>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';
  import blurBackground from '../../mixins/blurBackground.js';


  // Importing to-be-used SVG icons
  import { Type } from 'vue-feather-icon';
  import { List } from 'vue-feather-icon';
  import Electrons from '../svg/Electrons.vue';
  import Orbitals from '../svg/Orbitals.vue';
  import Orbitals2 from '../svg/Orbitals2.vue';
  import Isotopes from '../svg/Isotopes.vue';
  import { Map } from 'vue-feather-icon'; // Explore
  import { Check } from 'vue-feather-icon'; // Trivia
  import { Info } from 'vue-feather-icon';
  import { Settings } from 'vue-feather-icon';
  import { Search } from 'vue-feather-icon';
  import { Menu } from 'vue-feather-icon';

  // Import Popups
  import InfoPopup from '../Popups/Info.vue';
  import MenuPopup from '../Popups/Menu.vue';
  import OptionsPopup from '../Popups/Options.vue';

  export default {
    name: 'Navigation',
    data() {
      return {
        // DATA FOR POPUPS
        menuPopupActive: false,
        infoPopupActive: false,
        settingsPopupActive: false,
      }
    },
    methods: {
      infoPopup: function(state) {
        if(state === "on") {
          this.setBlur("blur");
          this.infoPopupActive = true;
        }
        else if(state === "off") {
          this.setBlur("no-blur");
          this.infoPopupActive = false;
        }
      },
      menuPopup: function(state) {
        if(state === "on") {
          this.setBlur("blur");
          this.menuPopupActive = true;
        }
        else if(state === "off") {
          this.setBlur("no-blur");
          this.menuPopupActive = false;
        }
      },
      optionsPopup: function(state) {
        if(state === "on") {
          this.setBlur("blur");
          this.settingsPopupActive = true;
        }
        else if(state === "off") {
          this.setBlur("no-blur");
          this.settingsPopupActive = false;
        }
      }
    },
    computed: {
      ...mapGetters([
        'options'
      ]),
    },
    components: {
      // Component Popups
      InfoPopup,
      MenuPopup,
      OptionsPopup,

      // Icon Components
      TypeIcon: Type.default,
      ListIcon: List.default,
      Electrons,
      Orbitals,
      Orbitals2,
      Isotopes,
      MapIcon: Map.default, // Explore
      CheckIcon: Check.default, // Trivia
      InfoIcon: Info.default,
      SettingsIcon: Settings.default,
      SearchIcon: Search.default,
      MenuIcon: Menu.default,
    },
    mixins: [
      blurBackground
    ]
  }
</script>

<style lang="scss">
  // Variables, mixins, and common components
  @import '../../styles/variables.scss';
  @import '../../styles/common/_titles.scss';

  // Structure
  @import './navigation.scss';

  // Themes
  @import 'theme-con-light-nav';
  @import 'theme-dark-nav';
  @import 'theme-light-nav';
</style>
