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
    grid-template-rows: max-content 1fr auto;
  }

  // This is to make sure that the periodic table does not expand past the actual <html></html> tags (there was an issue with white showing in the dark theme on info-top if height: 100vh; was used
  #content.info-top {
    height: 100%;
  }

  #content.info-side {
    height: 100vh;
  }

  #content.dark-def {
    background-color: $oc-gray-9;
  }
</style>
