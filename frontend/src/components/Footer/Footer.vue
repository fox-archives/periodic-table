<template>
  <footer id="footer" v-bind:class="this.options.themeType">
    <p class="text" id="name1">© 2018 Edwin Kofler</p>
    <p class="text" id="name2">© E. Kofler</p>
    <p class="text" id="name3">©</p>
    <a class="link" href="#">About</a>
    <a class="link" href="#">Feedback</a>
    <a class="link" href="https://discord.gg/eZMuVnu">Discord</a>
  </footer>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';

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
@import '../../styles/variables.scss';
@import './footer.scss';
@import './_footer-theme.scss';

// footerThemeDefault parameters
// @param 1  Text Color
// @param 2  Color of Underline when mouse hoveres over link (a tag)
// @param 3  Background color of footer element

.light-def {
  @include footerThemeDefault($oc-gray-9, $oc-gray-3, white)
}

.light-con {
  @include footerThemeDefault($oc-gray-9, $oc-gray-4, white)
}

.dark-def {
  @include footerThemeDefault($oc-gray-1, $oc-gray-7, $oc-gray-9)
}
</style>
