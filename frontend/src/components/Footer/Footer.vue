<template>
  <footer id="footer" v-bind:class="this.options.themeType">
    <p id="name1">© 2018 Edwin Kofler</p>
    <p id="name2">© E. Kofler</p>
    <p id="name3">©</p>
    <a href="#">About</a>
    <a href="#">Feedback</a>
    <a href="https://discord.gg/eZMuVnu">Discord</a>
  </footer>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import bus from "../bus.js";

  export default {
    name: 'Footer',
    computed: {
      ...mapGetters([
          'options'
      ])
    }
  }
</script>

<style scoped lang="scss">
  @import 'Styles/variables.scss';
  @import './footer.scss';
  @import './footer-themes.scss';
</style>
