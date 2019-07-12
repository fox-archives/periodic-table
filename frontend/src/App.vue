<template>
  <div id="content" :class="[options.themeType, options.infoLocationType]">
    <head />
    <router-view />
    <foot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Head from './components/nav/Navigation.vue';
import Foot from './components/foot/Foot.vue';

export default {
  components: {
    'head': Head,
    'foot': Foot
  },
  computed: {
    ...mapGetters(['options'])
  }
};
</script>

<style lang="scss">
@import 'styles/variables';

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

// The top three templates have the following IDs respectively: #nav, #display, #foot
#content {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  height: 100vh;
}

#content.dark-def {
  background-color: $oc-gray-9;
}
</style>
