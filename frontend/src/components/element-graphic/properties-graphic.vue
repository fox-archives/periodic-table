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
  import { EventBus } from "../event-bus";
  import throttle from 'lodash/debounce';

  export default {
    name: 'PropertiesVisual',
    mounted() {
      // TODO: Fix this bug with adding 20ms delay?
      setTimeout(() => this.newSizeInfoVisualText(), 20);
      // this.newSizeInfoVisualText();

      window.addEventListener('resize',
        throttle(this.newSizeInfoVisualText, 25)
      );

      EventBus.$on('set-info-location', payload => {
        this.newSizeInfoVisualText();
      });

    },
    watch: {
      '$route'() {
        this.newSizeInfoVisualText();
      }
    },
    computed: {
      ...mapGetters([
        'activeElement',
        'options'
      ])
    },
    methods: {
      newSizeInfoVisualText: function() {
          // container is the large color box with large abbreviation, and the area around that (the square)
          let container = document.getElementById('visual-inner');
          let fontSize = (container.clientWidth * 0.12) + 'px';
          container.style.setProperty('--elementNameTextSize', fontSize);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables';
  @import 'theme';
  @import 'element-graphic';
</style>