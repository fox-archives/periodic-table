<template>
  <footer id="footer"
v-bind:class="this.options.themeType">
    <p id="name1" class="text">
      © 2018 Edwin Kofler
    </p>
    <p id="name2" class="text">
      © E. Kofler
    </p>
    <p id="name3" class="text">
      ©
    </p>
    <a class="link"
href="#">About</a>
    <a class="link"
href="#">Feedback</a>
    <a class="link"
href="https://discord.gg/eZMuVnu">Discord</a>
  </footer>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';

export default {
  name: 'Footer',
  computed: {
    ...mapGetters(['options'])
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';
@import './footer.scss';
@import './footer-theme.scss';

.light-def {
  @include footerThemeDefault($oc-gray-9, $oc-gray-3, white);
}

.light-con {
  @include footerThemeDefault($oc-gray-9, $oc-gray-4, white);
}

.dark-def {
  @include footerThemeDefault($oc-gray-1, $oc-gray-7, $oc-gray-9);
}
</style>
