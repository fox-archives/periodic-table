<template>
  <div id="app">
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
  components: {
    Navigation,
    Footer
  }
}
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .dark-def #app {
    background-color: $oc-gray-9;
  }
</style>
