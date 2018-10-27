<template>
  <div id="content" v-bind:class="[options.themeType, options.infoLocationType]">
  <!--<div id="content" v-bind:class="options.blurType">-->
    <router-view name="navigation"></router-view>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from './navigation/Navigation.vue';
import Footer from './footer/Footer.vue';

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
    grid-template-rows: max-content 1fr max-content;
    height: 100vh;
  }

  #content.dark-def {
    background-color: $oc-gray-9;
  }
</style>
