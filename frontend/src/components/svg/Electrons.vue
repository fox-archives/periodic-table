<template>
    <electrons class="navIcon customIcon"></electrons>
</template>

<script>
// Implementation adopted from https://github.com/wadetandy/vue-svg-icon-loader (template and script tags)
// Recall if importing 'NameFormatedLikeThis', you must reference it in template as 'name-formated-like-this'
import Electrons from '../../assets/svg/icons/electrons.svg';

export default {
  // Which properties should I be able to set on this component
  /*props: {
    isHovered: String
  },*/
  data() {
    return {

    }
  },
  methods: {
    test: function() {
      //console.log("actvates");
      //console.log(isHovered);
    }
  },
  components: {
    Electrons
  }
}
</script>
