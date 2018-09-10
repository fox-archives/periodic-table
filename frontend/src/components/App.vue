<template>
  <div id="content" v-bind:class="[options.themeType, options.infoLocationType]">
  <!--<div id="content" v-bind:class="options.blurType">-->
    <Navigation></Navigation>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from './Navigation/Navigation.vue';
import Footer from './Footer/Footer.vue';

export default {
  computed: {
    options: function(){
      return this.$store.getters.options;
    }
  },
  mounted() {
      // Add style to scrollbars
      let scrollsx = document.getElementsByClassName('ps__rail-x');
      console.log('test');
      console.log(scrollsx);
      for(let i = 0; i < scrollsx.length; i++) {
        scrollsx[i].style.opacity = 0.6;
      }

      let scrollsy =  document.getElementsByClassName('ps__rail-y');
      for(let i = 0; i < scrollsy.length; i++) {
        scrollsy[i].style.opacity = 0.6;
      }
  },
  components: {
    Navigation,
    Footer
  }
}
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  // The top three templates have the following IDs respectively: #nav, #display, #footer
  #content {
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    height: 100vh;
  }

  #content.dark-def {
    background-color: $oc-gray-9;
  }
</style>
