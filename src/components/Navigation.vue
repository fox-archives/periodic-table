<template id="">
  <div id="theme-decider">  <!-- Do not remove this! Assists in determining what the current theme is -->
    <!-- NAV BAR WITH BUTTONS -->
    <nav id="nav-content-outer" class="has-shadow">
      <ul id="nav-content">
        <ul id="nav-left">
          <li id="logo"><img src="../assets/placeholder.png" height="30px"></img></li>
        </ul>
        <ul id="nav-right">
          <li class="mainOptions" id="simple-main" v-on:click="changeSelection('simple-main')"> <type-icon class="navIcon featherIcon"></type-icon> <h2>Simple</h2> </li>
          <li class="mainOptions" id="properties-main" v-on:click="changeSelection('properties-main')"> <list-icon class="navIcon featherIcon"></list-icon> <h2>Properties</h2> </li>
          <li class="mainOptions" id="electrons-main" v-on:click="[changeSelection('electrons-main')]"> <electrons></electrons> <h2>Electrons </h2> </li>
          <li class="mainOptions" id="orbitals-main" v-on:click="changeSelection('orbitals-main')"> <orbitals></orbitals> <h2>Orbitals </h2> </li>
          <li class="mainOptions" id="isotopes-main" v-on:click="changeSelection('isotopes-main')"> <isotopes></isotopes> <h2>Isotopes </h2> </li>
          <li class="mainOptions" id="explore-main" v-on:click="changeSelection('explore-main')"> <map-icon class="navIcon featherIcon"></map-icon> <h2>Explore</h2> </li>
          <li class="mainOptions" id="quiz-main" v-on:click="changeSelection('quiz-main')"> <check-icon class="navIcon featherIcon"></check-icon> <h2>Quiz</h2> </li>

          <li id="info" v-on:click="infoPopup('on')"> <info-icon class="navIcon featherIcon"></info-icon> </li>
          <li id="settings" v-on:click="settingsPopup('on')"> <settings-icon class="navIcon featherIcon"></settings-icon> </li>
          <li id="search"><search-icon class="navIcon featherIcon"> </search-icon> </li>
          <li id="menu-mobile" v-on:click="menuPopup('on')"> <menu-icon class="navIcon featherIcon"></menu-icon> </li>
        </ul>
      </ul>
    </nav>

    <!-- POPUP FOR HAMBURGER MENU -->
    <vs-popup vs-title="Choose a View" v-bind:vs-active="menuPopupActive" v-on:vs-cancel="menuPopup('off')">
      <ul id="nav-right-mobile">
        <li class="mainOptions" id="quiz-mobile"> <type-icon class="navIcon featherIcon"> </type-icon><h2>Simple</h2></li>
        <li class="mainOptions" id="properties-mobile"> <list-icon class="navIcon featherIcon"> </list-icon><h2>Properties</h2></li>
        <li class="mainOptions" id="electrons-mobile"> <electrons v-bind:isHovered="electronOptionHovered"></electrons> <h2>Electrons</h2> </li>
        <li class="mainOptions" id="orbitals-mobile"> <orbitals2></orbitals2> <h2>Orbitals</h2> </li>
        <li class="mainOptions" id="isotopes-mobile"> <isotopes></isotopes> <h2>Isotopes</h2> </li>
        <li class="mainOptions" id="explore-mobile"> <map-icon class="navIcon featherIcon"> </map-icon> <h2>Explore</h2> </li>
        <li class="mainOptions" id="quiz-mobile"> <check-icon class="navIcon featherIcon"> </check-icon> <h2>Quiz</h2> </li>
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
          <li> <p>Some icons from <a href="https://feathericons.com/">Feather Icons</a></p> </li>
          <li> <p>Data from <a href="http://www.rsc.org/periodic-table/">Royal Society of Chemistry</a></p> </li>
          <li> <p>Colors from  <a href="https://yeun.github.io/open-color/">Open Color</a></p> </li>
        </ul>
      </aside>
    </vs-popup>

    <!-- POPUP FOR ADVANCED SETTINGS -->
    <vs-popup vs-title="Advanced Options" v-bind:vs-active="advancedSettingsPopupActive" v-on:vs-cancel="advancedSettingsPopup('off')">
      <aside class="display-options">
        <ul>
          <li>
            <p>Group Labels</p>
            <vs-select style="width: 90;" class="option-group-Types" label="groupTypes" v-model="groupType" v-bind:options="groupTypes"></vs-select>
          </li>
        </ul>
      </aside>
    </vs-popup>

    <!-- POPUP FOR SETTINGS -->
    <vs-popup vs-title="Options" v-bind:vs-active="settingsPopupActive" v-on:vs-cancel="settingsPopup('off')">
      <aside class="display-options">
        <ul>
          <li>
            <p>Theme</p>
            <vs-select style="width: 70px;" class="option-theme" label="themes" v-model="theme" v-bind:options="themes" v-on:change="changeTheme"></vs-select>
          </li>
          <li>
            <p>Information</p>
            <vs-select style="width: 110px;" class="option-theme" label="theme" v-model="infoLocation" v-bind:options="infoLocations" v-on:change="changeInfoLocation"></vs-select>
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
  // Importing to-be-used SVG icons
  import { Type } from 'vue-feather-icon';
  import { List } from 'vue-feather-icon';
  import Electrons from './svg/Electrons.vue';
  import Orbitals from './svg/Orbitals.vue';
  import Orbitals2 from './svg/Orbitals2.vue';
  import Isotopes from './svg/Isotopes.vue';
  import { Map } from 'vue-feather-icon'; // Explore
  import { Check } from 'vue-feather-icon'; // Quiz
  import { Info } from 'vue-feather-icon';
  import { Settings } from 'vue-feather-icon';
  import { Search } from 'vue-feather-icon';
  import { Menu } from 'vue-feather-icon';

  import anime from 'animejs';

  export default {
    name: 'Navigation',
    data() {
      return {
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
          { text: 'Light', value: 1 },
          { text: 'Dark', value: 2 }
        ],

        infoLocation: 2,
        infoLocations: [
          { text: 'Unobtrusive', value: 1 },
          { text: 'Intrusive', value: 2 },
          { text: 'Excluded', value: 3 }
        ],
        // END DATA FOR OPTIONS

        // START DATA FOR ADVANCED OPTIONS
        groupType: 1,
        groupTypes: [
          { text: 'I.U.P.A.C.', value: 1 },
          { text: 'Mendeleev', value: 2 },
          { text: 'CAS', value: 3 },
          { text: 'Trivial Name', value: 4 },
          { text: 'By Element Name', value: 5 }
        ]

        // END DATA FOR ADVANCED OPTIONS
      }
    },
    methods: {
      // POPUP MENUS: ACTIVATING / CLOSING THEM
      menuPopup: function(state) {
        if(state == "on") {
          this.changeBlur("blur");
          this.menuPopupActive = true;
        }
        else if(state == "off") {
          this.changeBlur("no-blur");
          this.menuPopupActive = false;
        }
      },
      infoPopup: function(state) {
        if(state == "on") {
          this.changeBlur("blur");
          this.infoPopupActive = true;
        }
        else if(state == "off") {
          this.changeBlur("no-blur");
          this.infoPopupActive = false;
        }
      },
      settingsPopup: function(state) {
        if(state == "on") {
          this.changeBlur("blur");
          this.settingsPopupActive = true;
        }
        else if(state == "off") {
          this.changeBlur("no-blur");
          this.settingsPopupActive = false;
        }
      },
      advancedSettingsPopup: function(state) {
        if(state == "on") {
          this.changeBlur("blur-large");
          this.advancedSettingsPopupActive = true;
        }
        else if(state == "off") {
          this.changeBlur("blur");
          this.advancedSettingsPopupActive = false;
        }
      },
      // CHANGE THE BLUR OF THE BACKGROUND
      changeBlur: function(blurType) {
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
            element.classList.add(classesRemove[j]);
          }
        }
      },
      // Clicked element will change color (different than all other nav componets)
      changeSelection: function(element) {
        // All elements that will change their background
        var navElements = [ "simple-main", "properties-main", "electrons-main", "orbitals-main", "isotopes-main", "explore-main", "quiz-main" ];
      },
      changeTheme: function() {
        // 1 is Light
        // 2 is Dark

        var newTheme;
        if(this.theme == 1) {
          newTheme = "theme-light";
        }
        else if(this.theme == 2) {
          newTheme = "theme-dark";
        }

        // Gets array of all classes (which should correspond to themes). There should only be one element in the array
        var themeClasses = document.getElementById("theme-decider").classList;
        if(themeClasses.length > 1) {
          console.log("Something is not right. There are more than one classes under the element with 'theme-decider' id. This means that more than 1 theme exists at one time.");
        }

        // Assumes there is only one theme active at a time (which must be held true throughout the applications, or there may be CSS weirdness)
        var currentTheme = themeClasses[0];

        // Only replace themes if the current theme is different than the new theme
        if(newTheme != currentTheme) {
          var allElements = document.getElementById("content").querySelectorAll("*");
          for (var i = 0; i < allElements.length; i++) {
            //console.log("test");
            allElements[i].classList.add(newTheme);
            allElements[i].classList.remove(currentTheme);
          }

        }

      },
      changeInfoLocation: function() {
        // 1 is Unobtrusive
        // 2 is Intrusive
        // 3 is Excluded
        console.log(this.infoLocation);
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
      CheckIcon: Check.default, // Quiz
      InfoIcon: Info.default,
      SettingsIcon: Settings.default,
      SearchIcon: Search.default,
      MenuIcon: Menu.default
    }
  }
</script>

<style lang="scss">

</style>
