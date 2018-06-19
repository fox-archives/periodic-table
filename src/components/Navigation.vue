<template id="">
  <div>
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
          <li id="info"><span class="ti-info"></span></li>
          <li id="question"><span class="ti-help"></span></li>
          <li id="search"><span class="ti-search"></span></li>
          <li id="menu-mobile" @click="openAlert('primary')"><span class="ti-menu"></span></li>
        </ul>
      </ul>
    </nav>

    <vs-dialog
      :vs-color="colorAlert"
      :vs-title="titleAlert"
      @vs-accept="acceptAlert"
      :vs-active.sync="activeAlert">
      <ul id="nav-right-mobile">
        <li class="mainOptions" id="quiz"><span class="ti-menu-alt"></span><h2>Simple</h2></li>
        <li class="mainOptions" id="properties"><span class="ti-eye"></span><h2>Properties</h2></li>
        <li class="mainOptions" id="electrons"><span class="ti-arrow-right"></span><h2>Electrons</h2></li>
        <li class="mainOptions" id="orbitals"><span class="ti-shine"></span><h2>Orbitals</h2></li>
        <li class="mainOptions" id="isotopes"><span class="ti-link"></span><h2>Isotopes</h2></li>
        <li class="mainOptions" id="explore"><span class="ti-search"></span><h2>Explore</h2></li>
        <li class="mainOptions" id="quiz"><span class="ti-check"></span><h2>Quiz</h2></li>
      </ul>
    </vs-dialog>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'Navigation',
    data() {
      return {
        colorAlert: 'primary',
        titleAlert: 'Selection Options',
        activeAlert: false,
        valueInput: '',
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
      },
      openAlert(color){
      this.activeAlert = true
      this.titleAlert = 'Choose Option'
      this.colorAlert = color || this.getColorRandom()
    },
    getColorRandom(){
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      return `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
    },
    acceptAlert(color){
      this.$vs.notify({
        color:this.colorAlert,
        title:'Accept Selected',
        text:'Lorem ipsum dolor sit amet, consectetur'
      })
    }

    }
  }
</script>
