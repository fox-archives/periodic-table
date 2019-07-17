<template>
  <div>
    <div id="visual-inner">
      <div id="icon">
        <div id="icon-inner" :class="atomActiveSimpleData.color">
          <p>{{ atomActiveSimpleData.abbreviation }}</p>
        </div>
      </div>
      <div id="text">
        <p>{{ atomActiveSimpleData.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { EventBus } from '@/eventBus';
import throttle from 'lodash/debounce';

export default {
  name: 'AtomGraphicProperties',
  watch: {
    $route() {
      this.newSizeInfoVisualText();
    }
  },
  mounted() {
    //TODO: Fix this bug with adding delay?
    setTimeout(() => this.newSizeInfoVisualText(), 20);
    // this.newSizeInfoVisualText();

    window.addEventListener('resize', throttle(this.newSizeInfoVisualText, 50));

    EventBus.$on('set-info-location', payload => {
      this.newSizeInfoVisualText();
    });
  },
  computed: {
    ...mapState(['atomActiveSimpleData', 'options'])
  },
  methods: {
    newSizeInfoVisualText: function() {
      // container is the large color box with large abbreviation, and the area around that (the square)
      let container = document.getElementById('visual-inner');
      let fontSize = container.clientWidth * 0.12 + 'px';
      container.style.setProperty('--elementNameTextSize', fontSize);
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import 'atomGraphicTheme';
@import 'atomGraphic';
</style>
