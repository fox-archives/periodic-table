<template>
  <div
    id="display"
    :class="[options.contentState, options.themeType, options.infoLocationType]"
  >
    <atom-info-panel />
    <periodic-table />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import throttle from 'lodash/throttle';
import PeriodicTable from '@/components/periodic-table/PeriodicTable.vue';
import AtomInfoPanel from '@/components/AtomInfoPanel.vue';

export default {
  name: 'TabGenericPeriodicTableInterface',
  computed: {
    ...mapState(['options'])
  },
  components: {
    'atom-info-panel': AtomInfoPanel,
    'periodic-table': PeriodicTable
  },
  created() {
    let setClassLayoutFirstLoad = setInterval(() => {
      // If the document is loaded, clear the timer, setClassLayout
      // should only be activated on page resize
      if (document.getElementById('grid-outer') !== null) {
        this.setMobilePeriodicTableWidth();
        this.sizeElementsText();
        this.setClassLayout();
        clearInterval(setClassLayoutFirstLoad);
      } else {
        console.warn(
          'Grid-outer cannot be found. Perhaps the periodic table data cannot be fetched?'
        );
      }
    }, 100);

    // Apparently you need a set interval after this Vue component is created, especially for the method setMobilePeriodicTableWidth
    // setTimeout(() => {
    //   this.setMobilePeriodicTableWidth();
    //   this.sizeElementsText();
    //   this.setClassLayout();
    // }, 1000);


    window.addEventListener('resize', throttle(this.calculateLayout, 100));
  },
  mounted() {
    window.setTimeout(() => {
      // this.setMobilePeriodicTableWidth();
      // this.sizeElementsText();
    }, 20);

    // this.$nextTick(() => {
    //   this.setMobilePeriodicTableWidth();
    //   this.sizeElementsText();
    //   this.setClassLayout();
    // });

    // FROM OPTIONS.VUE
    this.$nextTick(() => {
      this.updateInfoLocation();
    });
    // this.updateInfoLocation();
    window.addEventListener('resize', () => {
      this.updateInfoLocation();
    });
  },
  methods: {
    ...mapMutations(['setOptions']),
    calculateLayout: function() {
      if (document.getElementById('grid-outer') !== null) {
        this.setMobilePeriodicTableWidth();
        this.sizeElementsText();
        this.setClassLayout();
      }
    },

    // FROM OPTIONS
    // Changes local theme
    setTheme: function() {
      // This changes options.themeType (in Vuex options object)
      // i represents each element in themeTypes array
      for (let i = 0; i < this.themeTypes.length; i++) {
        // i + 1 because theme
        if (this.theme === i + 1) {
          this.options.themeType = this.themeTypes[i];

          // Add it to the main body tag
          let bodyTag = document.getElementById('body');
          bodyTag.classList.add(this.themeTypes[i]);
          for (let j = 0; j < this.themeTypes.length; j++) {
            if (this.themeTypes[i] !== this.themeTypes[j]) {
              bodyTag.classList.remove(this.themeTypes[j]);
            }
          }
        }
      }
    },
    // Changes placement of info-location (and calls setClassLayout)
    setInfoLocation: function() {
      // .1s after setInfoLocation is called, update the className that determines the layout
      // Probably can't do it right away because the div elements have just moved / changed positions
      setTimeout(() => {
        this.setClassLayout();
        this.setMobilePeriodicTableWidth();
        EventBus.$emit('set-info-location', 1);
      }, 100);

      // First, convert infoLocation number to a string
      // let infoChosen = this.infoLocationTypes[this.infoLocationNum - 1];

      // Then, set it to global options
      // this.setOptions({ infoLocationType: infoChosen });

      // Then set the global options for if the info location type is auto
      // if (infoChosen === 'info-auto') {
      //   this.setOptions({ infoLocationTypeIsAuto: true });
      //   this.updateInfoLocation();
      // } else {
      //   this.setOptions({ infoLocationTypeIsAuto: false });
      // }
    },
    // Purpose: To update the infoLocationType depending on the size of the viewport (greater than or less than 1100 px)
    updateInfoLocation: function() {
      if (this.options.infoLocationTypeIsAuto) {
        if (window.innerWidth < 1150) {
          this.setOptions({ infoLocationType: 'info-top' });
        } else if (window.innerWidth >= 1150) {
          this.setOptions({ infoLocationType: 'info-side' });
        }
      }
    },

    // This script makes the periodic-table and element info panel not have a height
    // bigger than the browser on info-side
    setClassLayout: function() {
      // Test if the height of periodic-table and element-info-panel are the same
      // This assumes the AtomGraphicProperties.vue goes all the way to bottom of window (stops right above foot)

      let panelHeight = document.getElementById('grid-container').offsetHeight;
      let periodicTableHeight = document.getElementById('grid-outer')
        .offsetHeight;

      // Only change the style if the periodic-table has a greater or equal height for AtomGraphicProperties.vue
      if (
        periodicTableHeight >= panelHeight &&
        periodicTableHeight !== 0 &&
        panelHeight !== 0
      ) {
        // This means if panel and periodic-table fill whole window height, increasing
        // width will not increase size of periodic-table, instead it creates whitespace;
        // periodic-table will only increase if the height of browser window increases
        this.setOptions({
          contentState: 'heightSame'
        });
      } else {
        this.setOptions({
          contentState: 'heightDifferent'
        });
      }
    },

    setMobilePeriodicTableWidth: function() {
      if (
        /*this.options.infoLocationType === 'info-top' && */ this.options.contentState ===
        'heightDifferent'
      ) {
        // To change the length of the #grid-container (so #grid-outer scrolls to fit)
        let gridContainer = document.getElementById('grid');

        // Be sure to change the ratio in periodicTable.scss if changed here
        let periodicTableRatio = 0.6;

        // Subtract 2 because recall CSS says the height is calc(100% - 2px)
        // All I know is that when 2 is removed, then scrollbar is shown for small widths for info-side
        gridContainer.style.width = `${(gridContainer.clientHeight - 2) /
        periodicTableRatio}px`;
      } else {
        document.getElementById('grid').style.width = '';
      }
    },

    // This changes the CSS variable to size the element text
    // Recall the CSS variables are declared in periodicTable.scss
    sizeElementsText: function() {
      let grid = document.getElementById('grid');

      let elementWidth = grid.childNodes[0].clientWidth;
      let primaryFontSize = `${elementWidth * 0.32}px`;
      let secondaryFontSize = `${elementWidth * 0.2}px`;
      let labelFontSize = `${elementWidth * 0.3}px`;

      // Setting CSS Variables for All Elements
      // Variables stores in grid
      grid.style.setProperty('--primaryTextSize', primaryFontSize);
      grid.style.setProperty('--secondaryTextSize', secondaryFontSize);
      grid.style.setProperty('--labelTextSize', labelFontSize);
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

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
