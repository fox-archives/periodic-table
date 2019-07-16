<template>
  <div id="content" :class="[options.themeType, options.infoLocationType]">
    <navigation />
    <router-view />
    <foot />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navigation from '@/components/nav/Navigation.vue';
import Foot from '@/components/foot/Foot.vue';

export default {
  components: {
    'navigation': Navigation,
    'foot': Foot
  },
  computed: {
    ...mapState(['options'])
  }
};
</script>

<style lang="scss">
@import 'styles/variables';

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: latolight, Arial, 'sans-serif';
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
