<template id="">
  <div>
    <!-- NAV BAR WITH BUTTONS -->
    <nav id="nav-content-outer" class="has-shadow">
      <ul id="nav-content">
        <ul id="nav-left">
          <li id="logo"><img src="../assets/placeholder.png" height="30px"></img></li>
        </ul>
        <ul id="nav-right">
          <li class="mainOptions" id="simple"> <type-icon class="navIcon featherIcon"></type-icon> <h2>Simple</h2> </li>
          <li class="mainOptions" id="properties"> <list-icon class="navIcon featherIcon"></list-icon> <h2>Properties</h2> </li>
          <li class="mainOptions" id="electrons"> <electrons></electrons> <h2>Electrons </h2> </li>
          <li class="mainOptions" id="orbitals"> <orbitals></orbitals> <h2>Orbitals </h2> </li>
          <li class="mainOptions" id="isotopes"> <isotopes></isotopes> <h2>Isotopes </h2> </li>
          <li class="mainOptions" id="explore"> <map-icon class="navIcon featherIcon"></map-icon> <h2>Explore</h2> </li>
          <li class="mainOptions" id="quiz"> <check-icon class="navIcon featherIcon"></check-icon> <h2>Quiz</h2> </li>
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
        <li class="mainOptions" id="quiz"> <type-icon class="navIcon featherIcon"> </type-icon><h2>Simple</h2></li>
        <li class="mainOptions" id="properties"> <list-icon class="navIcon featherIcon"> </list-icon><h2>Properties</h2></li>
        <li class="mainOptions" id="electrons"> <electrons></electrons> <h2>Electrons</h2> </li>
        <li class="mainOptions" id="orbitals"> <orbitals2></orbitals2> <h2>Orbitals</h2> </li>
        <li class="mainOptions" id="isotopes"> <isotopes></isotopes> <h2>Isotopes</h2> </li>
        <li class="mainOptions" id="explore"> <map-icon class="navIcon featherIcon"> </map-icon> <h2>Explore</h2> </li>
        <li class="mainOptions" id="quiz"> <check-icon class="navIcon featherIcon"> </check-icon> <h2>Quiz</h2> </li>
      </ul>
    </vs-popup>

    <!-- POPUP FOR INFO -->
    <vs-popup vs-title="Information" v-bind:vs-active="infoPopupActive" v-on:vs-cancel="infoPopup('off')">
      <aside class="nav-info">
        <em>Tools</em>
        <br>
        <hr>
        <br>
        <ul>
          <li>
            <p>Logic from <a href="https://vuejs.org/">VueJS</a></p>
          </li>
          <li>
            <p>U.I. elements from <a href="https://lusaxweb.github.io/vuesax/">VueSax</a></p>
          </li>
          <li>
            <p>Some icons from <a href="https://feathericons.com/">Feather Icons</a></p>
          </li>
          <li>
            <p>Data from <a href="http://www.rsc.org/periodic-table/">Royal Society of Chemistry</a></p>
          </li>
          <li>
            <p>Colors from  <a href="https://yeun.github.io/open-color/">Open Color</a></p>
          </li>

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
            <vs-select style="width: 70px;" class="option-theme" label="themes" v-model="theme" v-bind:options="themes"></vs-select>
          </li>
          <li>
            <p>Information</p>
            <vs-select style="width: 110px;" class="option-theme" label="theme" v-model="informationLocation" v-bind:options="informationLocations"></vs-select>
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

  export default {
    name: 'Navigation',
    data() {
      return {
        menuPopupActive: false,
        infoPopupActive: false,
        settingsPopupActive: false,
        advancedSettingsPopupActive: false,

        // DATA FOR OPTIONS
        theme: 1,
        themes: [
          { text: 'Light', value: 1 },
          { text: 'Dark', value: 2 }
        ],

        informationLocation: 2,
        informationLocations: [
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
      testAnimation: function() {

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
