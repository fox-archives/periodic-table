<template>
  <div id="content" :class="[options.themeType, options.infoLocationType]">
    <!--<div id="content" v-bind:class="options.blurType">-->
    <Navigation/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navigation from './navbar/Navigation.vue';
import Footer from './footer/Footer.vue';

export default {
  components: {
    Navigation,
    Footer
  },
  computed: {
    options: function() {
      return this.$store.getters.options;
    }
  }
};
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
