<template>
  <div>
    <div v-if="" id="visual-inner">
      <div id="icon">
        <div id="icon-inner" v-bind:class="activeElement.color">
          <p>{{ activeElement.abbreviation }}</p>
        </div>
      </div>
      <div id="text">
        <p>{{ activeElement.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { EventBus } from '../event-bus';
import throttle from 'lodash/debounce';

export default {
  name: 'PropertiesGraphic',
  watch: {
    $route() {
      this.sizePropertiesGraphicText();
    }
  },
  mounted() {
    // TODO: Fix this bug with adding 20ms delay?
    // this.sizePropertiesGraphicText();
    setTimeout(() => this.sizePropertiesGraphicText(), 20);

    window.addEventListener(
      'resize',
      throttle(this.sizePropertiesGraphicText, 25)
    );

    EventBus.$on('set-information-container-location', payload => {
      this.sizePropertiesGraphicText();
    });
  },
  computed: {
    ...mapGetters(['activeElement', 'options'])
  },
  methods: {
    sizePropertiesGraphicText: function() {
      // container is the large color box with large abbreviation, and the area around that (the square)
      let container = document.getElementById('visual-inner');
      let fontSize = container.clientWidth * 0.12 + 'px';
      container.style.setProperty('--elementNameTextSize', fontSize);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables';
@import 'theme';
@import 'common-graphic';
</style>
