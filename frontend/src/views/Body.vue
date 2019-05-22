<template>
  <div
    id="display"
    :class="[periodicTableFormat, options.themeType, options.infoLocationType]"
  >
    <PropertiesInformationContainer />
    <PeriodicTable />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { EventBus } from '../components/event-bus';
import throttle from 'lodash/throttle';
import PeriodicTable from '../components/periodic-table/PeriodicTable.vue';
import PropertiesInformationContainer from '../components/propertiesInformationContainer.vue';

export default {
  name: 'Body',
  data() {
    return {
      periodicTableFormat: ''
    };
  },
  created() {
    // Right when grid-outer is not null, resize text and calculate layout
    let setClassLayoutFirstLoad = setInterval(() => {
      // If the document is loaded, clear the timer, setClassLayout
      // should only be activated on page resize
      if (document.getElementById('grid-outer') !== null) {
        this.calculateLayout();
        clearInterval(setClassLayoutFirstLoad);
      } else {
        console.warn('Grid-outer not loaded in yet.');
      }
    }, 100);

    // Apparently you need a set interval after this Vue component is created, especially for the method setMobilePeriodicTableWidth
    setTimeout(() => {
      this.calculateLayout();
    }, 1000);

    // Update layout (concerning the body component) on resize
    window.addEventListener('resize', throttle(this.calculateLayout, 25));

    // Update layout when the settings for container location changes
    EventBus.$on('set-information-container-location', payload => {
      this.calculateLayout();
    });
  },
  computed: {
    ...mapGetters(['options'])
  },
  methods: {
    calculateLayout: function() {
      if (document.getElementById('grid-outer') !== null) {
        this.setMobilePeriodicTableWidth();
        this.setClassLayout();
        this.sizeElementsText();
      }
    },
    // This changes the CSS variable to size the element text
    // Recall the CSS variables are declared in periodic-table.scss
    sizeElementsText: function() {
      let grid = document.getElementById('grid');

      let elementWidth = grid.childNodes[0].clientWidth;
      let primaryFontSize = elementWidth * 0.32 + 'px';
      let secondaryFontSize = elementWidth * 0.2 + 'px';
      let labelFontSize = elementWidth * 0.3 + 'px';

      // Setting CSS Variables for All Elements
      // Variables stores in grid
      grid.style.setProperty('--primaryTextSize', primaryFontSize);
      grid.style.setProperty('--secondaryTextSize', secondaryFontSize);
      grid.style.setProperty('--labelTextSize', labelFontSize);
    },

    // This script makes the periodic-table and element info panel not have a height
    // bigger than the browser on info-side
    setClassLayout: function() {
      // Test if the height of periodic-table and element-info-panel are the same
      // This assumes the properties-visual.vue goes all the way to bottom of window (stops right above footer)

      let panelHeight = document.getElementById('grid-container').offsetHeight;
      let periodicTableHeight = document.getElementById('grid-outer')
        .offsetHeight;

      // Only change the style if the periodic-table has a greater or equal height for properties-visual.vue
      if (
        periodicTableHeight >= panelHeight &&
        periodicTableHeight !== 0 &&
        panelHeight !== 0
      ) {
        // This means if panel and periodic-table fill whole window height, increasing
        // width will not increase size of periodic-table, instead it creates whitespace;
        // periodic-table will only increase if the height of browser window increases
        this.periodicTableFormat = 'heightSame';
      } else {
        this.periodicTableFormat = 'heightDifferent';
      }
    },

    setMobilePeriodicTableWidth: function() {
      if (
        /*this.options.infoLocationType === 'info-top' && */ this
          .periodicTableFormat === 'heightDifferent'
      ) {
        // To change the length of the #grid-container (so #grid-outer scrolls to fit)
        let gridContainer = document.getElementById('grid');

        // Be sure to change the ratio in periodic-table.scss if changed here
        let periodicTableRatio = 0.6;

        // Subtract 2 because recall CSS says the height is calc(100% - 2px)
        // All I know is that when 2 is removed, then scrollbar is shown for small widths for info-side
        gridContainer.style.width =
          (gridContainer.clientHeight - 2) / 0.6 + 'px';
      } else {
        document.getElementById('grid').style.width = '';
      }
    }
  },
  components: {
    PropertiesInformationContainer,
    PeriodicTable
  }
};
</script>

<style scoped lang="scss">
@import '../styles/variables';

#display {
  margin-left: $body-margin;
  margin-right: $body-margin;
}

.info-top #display {
  display: grid;
  grid-template-rows: max-content auto;
  // grid-row-gap: $spacing;
}

.info-side #display {
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: $spacing;
}
</style>
