<template>
  <div>
    <!-- NAV BAR WITH BUTTONS -->
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
          <li class="navItem" id="settings" v-on:click="settingsPopup('on')">
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
    </nav>

    <!-- POPUP FOR HAMBURGER MENU -->
    <vs-popup vs-title="Choose a View" v-bind:vs-active="menuPopupActive" v-on:vs-cancel="menuPopup('off')">
      <ul v-bind:class="options.themeType" id="nav-popup">
        <li class="navitem" id="simple-mobile">
          <type-icon class="navIcon featherIcon"></type-icon>
          <h2 class="navText">Simple</h2>
        </li>

        <li class="navitem" id="properties-mobile">
          <list-icon class="navIcon featherIcon"></list-icon>
          <h2 class="navText">Properties</h2>
        </li>

        <li class="navItem custom-icon" id="electrons-mobile">
          <electrons v-bind:isHovered="electronOptionHovered"></electrons>
          <h2 class="navText">Electrons</h2>
        </li>

        <li class="navItem custom-icon" id="orbitals-mobile">
          <orbitals2></orbitals2>
          <h2 class="navText">Orbitals</h2>
        </li>

        <li class="navItem custom-icon" id="isotopes-mobile">
          <isotopes></isotopes>
          <h2 class="navText">Isotopes</h2>
        </li>

        <li class="navitem" id="explore-mobile">
          <map-icon class="navIcon featherIcon"></map-icon>
          <h2 class="navText">Explore</h2> </li>

        <li class="navitem" id="trivia-mobile">
          <check-icon class="navIcon featherIcon"></check-icon>
          <h2 class="navText">Trivia</h2>
        </li>
      </ul>
    </vs-popup>

    <!-- POPUP FOR INFO -->
    <vs-popup vs-title="Information" v-bind:vs-active="infoPopupActive" v-on:vs-cancel="infoPopup('off')">
      <InfoPopUp></InfoPopUp>
    </vs-popup>

    <!-- POPUP FOR SETTINGS -->
    <vs-popup vs-title="Options" v-bind:vs-active="settingsPopupActive" v-on:vs-cancel="settingsPopup('off')">
      <OptionsPopUp></OptionsPopUp>
    </vs-popup>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import bus from '../bus.js';
  import blurBackGround from '../../mixins/blurBackground.js';

  // Importing to-be-used SVG icons
  import { Type } from 'vue-feather-icon'
  import { List } from 'vue-feather-icon'
  import Electrons from '../svg/Electrons.vue'
  import Orbitals from '../svg/Orbitals.vue'
  import Orbitals2 from '../svg/Orbitals2.vue'
  import Isotopes from '../svg/Isotopes.vue'
  import { Map } from 'vue-feather-icon' // Explore
  import { Check } from 'vue-feather-icon' // Trivia
  import { Info } from 'vue-feather-icon'
  import { Settings } from 'vue-feather-icon'
  import { Search } from 'vue-feather-icon'
  import { Menu } from 'vue-feather-icon'

  // Importing Popup Components
  import InfoPopUp from '../Info.vue'
  import OptionsPopUp from '../Options.vue'

  export default {
    name: 'Navigation',
    data() {
      return {
        // DATA FOR POPUPS
        menuPopupActive: false,
        infoPopupActive: false,
        settingsPopupActive: false,

        // DATA FOR HOVERED OPTIONS (when an option is hovered, it updates)
        electronOptionHovered: "false",
      }
    },
    methods: {

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
      settingsPopup: function(state) {
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
        'options',
        'themeType',
        'infoLocationType'
      ]),
    },
    components: {
      // Icon Components
      TypeIcon: Type.default,
      ListIcon: List.default,
      Electrons,
      Orbitals,
      Orbitals2,
      Isotopes,
      MapIcon: Map.default,
      CheckIcon: Check.default, // Trivia
      InfoIcon: Info.default,
      SettingsIcon: Settings.default,
      SearchIcon: Search.default,
      MenuIcon: Menu.default,

      // Notification Components
      InfoPopUp,
      OptionsPopUp
    },
    mixins: [
      blurBackGround
    ]
  }
</script>

<style lang="scss">
  @import '../../styles/variables.scss';
  @import './navigation.scss';

  // Themes
  @import './dark-theme-navigation';
  @import './light-con-theme-navigation';
  @import './light-theme-navigation';
</style>
