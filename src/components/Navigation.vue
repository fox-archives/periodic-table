<template id="">
  <div>

    <!-- NAV BAR WITH BUTTONS -->
    <nav id="nav-content-outer">
      <ul id="nav-content">
        <ul id="nav-left">
          <li id="logo"><img src="../assets/placeholder.png" height="30px"></img></li>
          <!--<li class="mainOptions" id="menu-mobile" ><vs-button vs-color="primary" vs-type="filled" vs-icon="visibility"></vs-button></li>-->
        </ul>
        <ul id="nav-right">
          <li class="mainOptions" id="quiz"><span class="ti-menu-alt"></span><h2>Simple</h2></li>
          <li class="mainOptions" id="properties"><span class="ti-eye"></span><h2>Properties</h2></li>
          <li class="mainOptions" id="electrons"><span class="ti-arrow-right"></span><h2>Electrons</h2></li>
          <li class="mainOptions" id="orbitals"><span class="ti-shine"></span><h2>Orbitals</h2></li>
          <li class="mainOptions" id="isotopes"><span class="ti-link"></span><h2>Isotopes</h2></li>
          <li class="mainOptions" id="explore"><span class="ti-search"></span><h2>Explore</h2></li>
          <li class="mainOptions" id="quiz"><span class="ti-check"></span><h2>Quiz</h2></li>
          <li id="info" @click="infoPopupActive=true"><span class="ti-info"></span></li>
          <li id="settings" @click="settingsPopupActive=true"><span class="ti-settings"></span></li>
          <li id="search"><span class="ti-search"></span></li>
          <li id="menu-mobile" @click="menuPopupActive=true"><span class="ti-menu"></span></li>
        </ul>
      </ul>
    </nav>

    <!-- POPUP FOR HAMBURGER MENU -->
    <vs-popup vs-title="Choose a View" v-bind:vs-active="menuPopupActive" @vs-cancel="menuPopupActive=false">
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
    <vs-popup vs-title="Information" v-bind:vs-active="infoPopupActive" @vs-cancel="infoPopupActive=false">
      <p>Info</p>
    </vs-popup>

    <!-- POPUP FOR SETTING -->
    <vs-popup vs-title="Choose an Option" v-bind:vs-active="settingsPopupActive" @vs-cancel="settingsPopupActive=false">
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
      changeDOMBlur: function(state)
      {
        console.log("commencing state change");
        if(state == "blurOn") {
          document.getElementById('info').style.filter = 'blur(4px)';
        }
        else if (state == "blurOff") {
          document.getElementById('info').style.filter = 'blur(0px)';
        }
      }
    },
    components: {
      Options
    }
  }
</script>
