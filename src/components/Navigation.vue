<template id="">
  <nav id="nav-content-outer">
    <ul id="nav-content">
      <ul id="nav-left">
        <li id="logo"><img src="../assets/placeholder.png" height="30px"></img></li>
      </ul>
      <ul id="nav-right">
        <li id="simple"><span class="ti-menu-alt"></span><h2>Simple</h2></li>
        <li id="properties"><span class="ti-eye"></span><h2>Properties</h2></li>
        <li id="electrons"><span class="ti-arrow-right"></span><h2>Electrons</h2></li>
        <li id="orbitals"><span class="ti-link"></span><h2>Orbitals</h2></li>
        <li id="explore"><span class="ti-search"></span><h2>Explore</h2></li>
        <li id="quiz"><span class="ti-check"></span><h2>Quiz</h2></li>
        <li v:on:click="changeDOMBlur(blurOn)" id="info"><span class="ti-info"></span></li>
        <li id="question"><span class="ti-help"></span></li>
        <li id="search"><span class="ti-search"></span></li>
        <li id="menu-mobile"><span class="ti-menu"></span></li>
      </ul>
    </ul>
  </nav>
</template>

<script type="text/javascript">
  export default {
    name: 'Navigation',
    data() {
      return {

      }
    },
    methods: {
      changeDOMBlur: function(state)
      {
        console.log("commencing state change");
        if(state == "blurOn")
        {
          document.getElementById('info').style.filter = 'blur(4px)';
        }
        else if (state == "blurOff")
        {
          document.getElementById('info').style.filter = 'blur(0px)';
        }
      }

    }
  }
</script>
