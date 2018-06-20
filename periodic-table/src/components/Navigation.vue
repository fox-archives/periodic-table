<template id="">
  <div>
    <!-- NAV BAR WITH BUTTONS -->
    <nav id="nav-content-outer">
      <ul id="nav-content">
        <ul id="nav-left">
          <li id="logo"><img src="../assets/placeholder.png" height="30px"></img></li>
        </ul>
        <ul id="nav-right">
          <li class="mainOptions" id="quiz"><span class="ti-menu-alt"></span><h2>Simple</h2></li>
          <li class="mainOptions" id="properties"><span class="ti-eye"></span><h2>Properties</h2></li>
          <li class="mainOptions" id="electrons"><span class="ti-arrow-right"></span><h2>Electrons</h2></li>
          <li class="mainOptions" id="orbitals"><span class="ti-shine"></span><h2>Orbitals</h2></li>
          <li class="mainOptions" id="isotopes"><span class="ti-link"></span><h2>Isotopes</h2></li>
          <li class="mainOptions" id="explore"><span class="ti-search"></span><h2>Explore</h2></li>
          <li class="mainOptions" id="quiz"><span class="ti-check"></span><h2>Quiz</h2></li>
          <li id="info" v-on:click="infoPopup('on')"><span class="ti-info"></span></li>
          <li id="settings" v-on:click="settingsPopup('on')"><span class="ti-settings"></span></li>
          <li id="search"><span class="ti-search"></span></li>
          <li id="menu-mobile" v-on:click="menuPopup('on')"><span class="ti-menu"></span></li>
        </ul>
      </ul>
    </nav>

    <!-- POPUP FOR HAMBURGER MENU -->
    <vs-popup vs-title="Choose a View" v-bind:vs-active="menuPopupActive" v-on:vs-cancel="menuPopup('off')">
      <ul id="nav-right-mobile">
        <li class="mainOptions" id="quiz"><span class="ti-menu-alt"></span><h2>Simple</h2></li>
        <li class="mainOptions" id="properties"><span class="ti-eye"></span><h2>Properties</h2></li>
        <li class="mainOptions" id="electrons"><span class="ti-arrow-right"></span><h2>Electrons</h2></li>
        <li class="mainOptions" id="orbitals"><span class="ti-shine"></span><h2>Orbitals</h2></li>
        <li class="mainOptions" id="isotopes"><span class="ti-link"></span><h2>Isotopes</h2></li>
        <li class="mainOptions" id="explore"><span class="ti-search"></span><h2>Explore</h2></li>
        <li class="mainOptions" id="quiz"><span class="ti-check"></span><h2>Quiz</h2></li>
      </ul>
    </vs-popup>

    <!-- POPUP FOR INFO -->
    <vs-popup vs-title="Information" v-bind:vs-active="infoPopupActive" v-on:vs-cancel="infoPopup('off')">
      <aside class="display-references">
        <h2>Tools and Websites Used to Make This Website</h2>
        <br>
        <ul>
          <li>
            Logic from<a href="https://vuejs.org/">VueJS</a>
          </li>
          <li>
            U.I. elements from <a href="https://lusaxweb.github.io/vuesax/">VueSax</a>
          </li>
          <li>
            Data from <a href="http://www.rsc.org/periodic-table/">Royal Society of Chemistry</a>
          </li>
          <li>
            Icons from <a href="https://themify.me/themify-icons">Themify</a>
          </li>
          <li>
            Colors from  <a href="https://yeun.github.io/open-color/">Open Color</a>
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
        }
        else if(blurType == "blur") {
          document.getElementById('content').classList.remove('no-blur');
          document.getElementById('content').classList.add('blur');
          document.getElementById('content').classList.remove('blur-large');
        }
        else if(blurType == "blur-large") {
          document.getElementById('content').classList.remove('no-blur');
          document.getElementById('content').classList.remove('blur');
          document.getElementById('content').classList.add('blur-large');
        }

      }
    }
  }
</script>
