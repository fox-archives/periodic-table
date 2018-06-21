<template>
  <div>
    <electrons class="regular" width="1.5em" height="1.5em"/>
  </div>
</template>

<script>
// Recall if importing 'NameFormatedLikeThis', you must reference it in template as 'name-formated-like-this'
import Electrons from './Electrons.svg'

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
