<template>
  <div>
    <!-- NAV BAR WITH BUTTONS -->
    <nav id="nav" v-bind:class="themeType">
      <ul id="nav-content">
        <ul id="nav-left">
          <li id="logo"><img src="../../assets/placeholder.png" height="30px"></img></li>
        </ul>
        <ul id="nav-right">
          <li class="nav-selected" id="simple-wide" v-on:click="setSelection('simple')"> <type-icon class="navIcon featherIcon"></type-icon> <h2>Simple</h2> </li>
          <li id="properties-wide" v-on:click="setSelection('properties')"> <list-icon class="navIcon featherIcon"></list-icon> <h2>Properties</h2> </li>
          <li class="custom-icon" id="electrons-wide" v-on:click="setSelection('electrons')"> <electrons></electrons> <h2>Electrons </h2> </li>
          <li class="custom-icon" id="orbitals-wide" v-on:click="setSelection('orbitals')"> <orbitals></orbitals> <h2>Orbitals </h2> </li>
          <li class="custom-icon" id="isotopes-wide" v-on:click="setSelection('isotopes')"> <isotopes></isotopes> <h2>Isotopes </h2> </li>
          <li id="explore-wide" v-on:click="setSelection('explore')"> <map-icon class="navIcon featherIcon"></map-icon> <h2>Explore</h2> </li>
          <li id="trivia-wide" v-on:click="setSelection('trivia')"> <check-icon class="navIcon featherIcon"></check-icon> <h2>Trivia</h2> </li>
          <li id="info" v-on:click="infoPopup('on')"> <info-icon class="navIcon featherIcon"></info-icon> </li>
          <li id="settings" v-on:click="settingsPopup('on')"> <settings-icon class="navIcon featherIcon"></settings-icon> </li>
          <li id="search"><search-icon class="navIcon featherIcon"> </search-icon> </li>
          <li id="menu-mobile" v-on:click="menuPopup('on')"> <menu-icon class="navIcon featherIcon"></menu-icon> </li>
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
      <aside class="nav-info">
        <em>Tools</em>
        <br>
        <br>
        <ul>
          <li> <p>Logic from <a href="https://vuejs.org/">VueJS</a></p> </li>
          <li> <p>U.I. elements from <a href="https://lusaxweb.github.io/vuesax/">VueSax</a></p> </li>
          <li> <p>Icons from <a href="https://feathericons.com/">Feather Icons</a></p> </li>
          <li> <p>Data from <a href="http://www.rsc.org/periodic-table/">Royal Society of Chemistry</a></p> </li>
          <li> <p>Colors from  <a href="https://yeun.github.io/open-color/">Open Color</a></p> </li>
        </ul>
      </aside>
    </vs-popup>

    <!-- POPUP FOR ADVANCED SETTINGS -->
    <vs-popup vs-title="Advanced Options" v-bind:vs-active="advancedSettingsPopupActive" v-on:vs-cancel="advancedSettingsPopup('off')">
      <aside class="options">
        <ul>
          <li>
            <p>Group Labels</p>
            <vs-select label="groupTypes" v-model="groupType">
              <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in groupTypes" />
            </vs-select>
          </li>
          <li>
            <p>Decimal Count</p>
            <vs-select label="decimalCountTypes" v-model="decimalCountType">
              <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in decimalCountTypes" />
            </vs-select>
          </li>
          <li>
            <p>Transitions and Effects</p>
            <vs-select label="transitionTypes" v-model="transitionType" v-bind:options="transitionTypes">
              <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in transitionTypes" />
            </vs-select>
          </li>
        </ul>
      </aside>
    </vs-popup>

    <!-- POPUP FOR SETTINGS -->
    <vs-popup vs-title="Options" v-bind:vs-active="settingsPopupActive" v-on:vs-cancel="settingsPopup('off')">
      <aside class="options">
        <ul>
          <li>
            <p>Theme</p>
            <vs-select class="option-theme" label="themes" v-model="theme" v-on:change="setTheme">
              <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in themes" />
            </vs-select>
          </li>
          <li>
            <p>Information</p>
            <vs-select class="option-theme" label="infoLocations" v-model="infoLocation" v-on:change="setInfoLocation">
              <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in infoLocations" />
            </vs-select>
          </li>
          <li>
            <p>Periodic Table Layout</p>
            <vs-select class="option-theme" label="tableLayouts" v-model="tableLayout" v-on:change="setTableLayout">
              <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in tableLayouts" />
            </vs-select>
          </li>
          <li>
            <p>Advanced Options</p>
            <!-- I don't know why this div tag stops the button from having a length of 100% -->
            <div>
              <vs-button v-on:click="advancedSettingsPopup('on')" color="primary" vs-type="filled">Advanced</vs-button>
            </div>
          </li>
        </ul>
      </aside>
    </vs-popup>
  </div>
</template>

<script type="text/javascript">
  import bus from "../bus.js";

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
        advancedSettingsPopupActive: false,

        // DATA FOR HOVERED OPTIONS (when an option is hovered, it updates)
        electronOptionHovered: "false",

        // DATA FOR OPTIONS
        theme: 1,
        themes: [
          { text: 'Light (Default)', value: 1 },
          { text: 'Light (High Contrast)', value: 2 },
          { text: 'Dark', value: 3 }
        ],

        infoLocation: 1,
        infoLocations: [
          { text: 'Obtrusive', value: 1 },
          { text: 'Unobtrusive', value: 2 },
          { text: 'Excluded', value: 3 }
        ],

        tableLayout: 1,
        tableLayouts: [
          { text: 'Fit to Screen', value: 1 },
          { text: 'Full Screen Height', value: 2 },
          { text: 'Full Screen Width', value: 3 },
          { text: 'Mobile', value: 4 },
        ],

        transitionType: 1,
        transitionTypes: [
          { text: 'Advanced', value: 1 },
          { text: 'Basic', value: 2 },
        ],

        // DATA FOR ADVANCED OPTIONS
        groupType: 1,
        groupTypes: [
          { text: 'I.U.P.A.C.', value: 1 },
          { text: 'Mendeleev', value: 2 },
          { text: 'CAS', value: 3 },
          { text: 'Trivial Name', value: 4 },
          { text: 'By Element Name', value: 5 }
        ],

        decimalCountType: 1,
        decimalCountTypes: [
          { text: '2', value: 1 },
          { text: '3', value: 2 },
          { text: '4', value: 3 },
          { text: 'Maximum', value: 4 },
        ],

        // END DATA FOR ADVANCED OPTIONS
      }
    },
    methods: {
      menuPopup: function(state) {
        if(state == "on") {
          this.setBlur("blur");
          this.menuPopupActive = true;
        }
        else if(state == "off") {
          this.setBlur("no-blur");
          this.menuPopupActive = false;
        }
      },
      infoPopup: function(state) {
        if(state == "on") {
          this.setBlur("blur");
          this.infoPopupActive = true;
        }
        else if(state == "off") {
          this.setBlur("no-blur");
          this.infoPopupActive = false;
        }
      },
      settingsPopup: function(state) {
        if(state == "on") {
          this.setBlur("blur");
          this.settingsPopupActive = true;
        }
        else if(state == "off") {
          this.setBlur("no-blur");
          this.settingsPopupActive = false;
        }
      },
      advancedSettingsPopup: function(state) {
        if(state == "on") {
          this.setBlur("blur-large");
          this.advancedSettingsPopupActive = true;
        }
        else if(state == "off") {
          this.setBlur("blur");
          this.advancedSettingsPopupActive = false;
        }
      },
      setBlur: function(blurType) {
        // Could make this similar to addClassToNotif function below, but will not
        if(blurType == "no-blur") {
          document.getElementById('content').classList.add('no-blur');
          document.getElementById('content').classList.remove('blur');
          document.getElementById('content').classList.remove('blur-large');

          // There's probably a better way to do this with VueJS
          this.addClassToNotif(['no-blur'], ['blur', 'blur-large']);

        }
        else if(blurType == "blur") {
          document.getElementById('content').classList.remove('no-blur');
          document.getElementById('content').classList.add('blur');
          document.getElementById('content').classList.remove('blur-large');

          this.addClassToNotif(['blur'], ['no-blur', 'blur-large']);
        }
        else if(blurType == "blur-large") {
          document.getElementById('content').classList.remove('no-blur');
          document.getElementById('content').classList.remove('blur');
          document.getElementById('content').classList.add('blur-large');

          this.addClassToNotif(['blur-large'], ['no-blur', 'blur']);
        }
      },
      // Add and remove classes to VueSax notifications (specifically blur)
      addClassToNotif: function(classesAdd, classesRemove) {
        // For all notification div elements found
        var maxElements = document.getElementsByClassName('vs-noti-contenedor');
        for(var i = 0; i < maxElements.length; i++) {
          var element = document.getElementsByClassName('vs-noti-contenedor')[i];

          // Add all classes in classAdd array
          for(var j = 0; j < classesAdd.length; j++) {
            element.classList.add(classesAdd[j]);
          }

          // Remove all classes in classRemove array
          for(var j = 0; j < classesRemove.length; j++) {
            element.classList.remove(classesRemove[j]);
          }
        }
      },
      // Changes local teme, and emits 'theme-changed' to all other .vue files (so theme changes in other .vue files)
      setTheme: function() {
        // This changes themeType
        // i represents each element in themeTypes array
        for(var i = 0; i < this.themeTypes.length; i++) {
          // i + 1 because theme
          if(this.theme == i + 1) {
            this.themeType = this.themeTypes[i];

            // Add it to the main body tag
            var bodyTag = document.getElementById("body");
            bodyTag.classList.add(this.themeTypes[i])
            for(var j = 0; j < this.themeTypes.length; j++) {
              if(this.themeTypes[i] != this.themeTypes[j]) {
                bodyTag.classList.remove(this.themeTypes[j]);
              }
            }
          }
        }
        // Emit event theme change, that the theme type was changed
        bus.$emit('themeChanged', this.themeType);
      },
      setInfoLocation: function() {
        for(var i = 0; i < this.infoLocationTypes.length; i++) {
          if(this.infoLocation == i + 1) {
            this.infoLocationType = this.infoLocationTypes[i];
          }
        }
        bus.$emit('infoLocationChanged', this.infoLocationType);
      },
      setSelection: function() {

      },
      setTableLayout: function() {

      }
    },
    components: {
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
      MenuIcon: Menu.default
    }
  }
</script>

<style scoped lang="scss">
  @import 'Styles/variables.scss';
  @import './navigation.scss';
  @import './navigation-themes.scss';
</style>
