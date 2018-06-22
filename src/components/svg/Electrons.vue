<template>
    <electrons class="regular"></electrons>
</template>

<script>
// Implementation adopted from https://github.com/wadetandy/vue-svg-icon-loader (template and script tags)
// Recall if importing 'NameFormatedLikeThis', you must reference it in template as 'name-formated-like-this'
import Electrons from '../../assets/svg/icons/electrons.svg';

export default {
  components: {
    Electrons
  }
}
</script>

<style>
.regular {
  width: 32px;
  height: 32px;
}
</style>
