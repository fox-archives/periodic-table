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
      <p>Element Data from Royal Society of Chemistry</p>
      <p>VueJS</p>
      <p>VueSax</p>
      <p>Icons from Themify Icons</p>
      <p>Colors from OpenColor</p>
    </vs-popup>

    <!-- POPUP FOR SETTING -->
    <vs-popup vs-title="Options" v-bind:vs-active="settingsPopupActive" v-on:vs-cancel="settingsPopup('off')">
      <Options></Options>
    </vs-popup>
  </div>
</template>

<script type="text/javascript">
  import Options from './Options.vue';

  export default {
    name: 'Navigation',
    data() {
      return {
        menuPopupActive: false,
        infoPopupActive: false,
        settingsPopupActive: false,
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
        else if(blurType == "large") {
          document.getElementById('content').classList.remove('no-blur');
          document.getElementById('content').classList.remove('blur');
          document.getElementById('content').classList.add('blur-large');
        }

      }
    },
    components: {
      Options
    }
  }
</script>
