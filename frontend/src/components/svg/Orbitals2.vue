<template>
    <orbitals2 class="navIcon custom-icon"></orbitals2>
</template>

<script>
// Implementation adopted from https://github.com/wadetandy/vue-svg-icon-loader (template and script tags)
// Recall if importing 'NameFormatedLikeThis', you must reference it in template as 'name-formated-like-this'

// The point of these templates is to be reusable, but for some reason, the SVG icon for orbitals will fill in black if there are more than one (of the same Orbitals.vue component) on the same page. Thus, I created another orbital template from a separate file (which has different id tags), which is a work-around for the aforementioned issue.
import Orbitals2 from '../../assets/svg/icons/orbitals2.svg';

export default {
  components: {
    Orbitals2
  }
}
</script>
