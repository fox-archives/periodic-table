<template>
  <div>
    <!-- NAV BAR WITH BUTTONS -->
    <nav id="nav" v-bind:class="themeType">
      <ul id="nav-content">
        <ul id="nav-left">
          <li id="logo"><img src="../../assets/placeholder.png" height="30px"></li>
        </ul>
        <ul id="nav-right">
          <li class="nav-selected" id="simple-wide" v-on:click="setSelection('simple')">
            <type-icon class="navIcon featherIcon"></type-icon>
            <h2> <router-link to="/simple">Simple</router-link> </h2>
          </li>
          <li id="properties-wide" v-on:click="setSelection('properties')">
            <list-icon class="navIcon featherIcon"></list-icon>
            <h2> <router-link to="/properties"> Properties</router-link> </h2>
          </li>
          <li class="custom-icon" id="electrons-wide" v-on:click="setSelection('electrons')">
            <electrons></electrons>
            <h2> <router-link to="/electrons">Electrons</router-link> </h2>
          </li>
          <li class="custom-icon" id="orbitals-wide" v-on:click="setSelection('orbitals')">
            <orbitals></orbitals>
            <h2> <router-link to="/orbitals">Orbitals</router-link> </h2>
          </li>
          <li class="custom-icon" id="isotopes-wide" v-on:click="setSelection('isotopes')">
            <isotopes></isotopes>
            <h2> <router-link to="/isotopes">Isotopes</router-link> </h2>
          </li>
          <li id="explore-wide" v-on:click="setSelection('explore')">
            <map-icon class="navIcon featherIcon"></map-icon>
            <h2> <router-link to="/explore">Explore</router-link> </h2>
          </li>
          <li id="trivia-wide" v-on:click="setSelection('trivia')">
            <check-icon class="navIcon featherIcon"></check-icon>
            <h2> <router-link to="/trivia">Trivia</router-link> </h2>
          </li>
          <li id="info" v-on:click="infoPopup('on')">
            <info-icon class="navIcon featherIcon"></info-icon>

          </li>
          <li id="settings" v-on:click="settingsPopup('on')">
            <settings-icon class="navIcon featherIcon"></settings-icon>

          </li>
          <li id="search"><search-icon class="navIcon featherIcon">
          </search-icon>

          </li>
          <li id="menu-mobile" v-on:click="menuPopup('on')">
            <menu-icon class="navIcon featherIcon"></menu-icon>

          </li>
        </ul>
      </ul>
    </nav>

    <!-- POPUP FOR HAMBURGER MENU -->
    <vs-popup vs-title="Choose a View" v-bind:vs-active="menuPopupActive" v-on:vs-cancel="menuPopup('off')">
      <ul v-bind:class="themeType" id="nav-mobile">
        <li id="trivia-mobile"> <type-icon class="navIcon featherIcon"> </type-icon><h2>Simple</h2></li>
        <li id="properties-mobile"> <list-icon class="navIcon featherIcon"> </list-icon><h2>Properties</h2></li>
        <li class="custom-icon" id="electrons-mobile"> <electrons v-bind:isHovered="electronOptionHovered"></electrons> <h2>Electrons</h2> </li>
        <li class="custom-icon" id="orbitals-mobile"> <orbitals2></orbitals2> <h2>Orbitals</h2> </li>
        <li class="custom-icon" id="isotopes-mobile"> <isotopes></isotopes> <h2>Isotopes</h2> </li>
        <li id="explore-mobile"> <map-icon class="navIcon featherIcon"> </map-icon> <h2>Explore</h2> </li>
        <li id="trivia-mobile"> <check-icon class="navIcon featherIcon"> </check-icon> <h2>Trivia</h2> </li>
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
  import InfoPopUp from '../../views/Info.vue'
  import OptionsPopUp from '../../views/Options.vue'

  export default {
    name: 'Navigation',
    data() {
      return {
        // THEMING
        // Default light theme (see themes array below to see values in selection menu)
        // Recall there is a dark blue theme for element blue color (so cannot name blue theme dark-blue)
        themeTypes: ["light-def", "light-con", "dark-def"],
        themeType: "light-def",

        // INFO LOCATION
        infoLocationTypes: ['info-obtrusive', 'info-unobtrusive', 'info-excluded'],
        infoLocationType: "info-obtrusive",

        // DATA FOR ELEMENT UI MENU
        activeIndex: '1',
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

<style scoped lang="scss">
  @import 'Styles/variables.scss';
  @import './navigation.scss';
  @import './navigation-themes.scss';
</style>
