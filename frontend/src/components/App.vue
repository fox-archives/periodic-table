<template>
  <div id="content">
  <!--<div id="content" v-bind:class="options.blurType">-->
    <Navigation></Navigation>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from './Navigation/Navigation.vue';
import Footer from './Footer/Footer.vue';

export default {
  data() {
    return {
    }
  },
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

  .dark-def #content {
    background-color: $oc-gray-9;
  }
</style>
