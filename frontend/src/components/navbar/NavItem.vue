<template>
  <li>
    <router-link :to="to" />
  </li>
</template>

<script>
export default {
  name: 'NavItemVue',
  props: {
    to: {
      type: String,
      default: '/'
    }
  }
};
</script>

<style scoped></style>
