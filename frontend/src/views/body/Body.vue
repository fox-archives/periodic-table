<template>
  <div
    id="display"
    :class="[contentState, options.themeType, options.infoLocationType]"
  >
    <ElementInfoPanel />
    <PeriodicTable />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import throttle from 'lodash/throttle';
import PeriodicTable from '../../components/periodic-table/PeriodicTable.vue';
import ElementInfoPanel from '../../components/SideBarInterface.vue';

export default {
  name: 'Body',
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
    setTimeout(() => {
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
    ...mapMutations([
      'setMobilePeriodicTableWidth',
      'sizeElementsText',
      'setClassLayout'
    ]),

    // FROM OPTIONS
    ...mapMutations([
      'setOptions'
      // 'setClassLayout'
      // 'setMobilePeriodicTableWidth'
    ]),
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
      let infoChosen = this.infoLocationTypes[this.infoLocationNum - 1];

      // Then, set it to global options
      this.setOptions({ infoLocationType: infoChosen });

      // Then set the global options for if the info location type is auto
      if (infoChosen === 'info-auto') {
        this.setOptions({ infoLocationTypeIsAuto: true });
        this.updateInfoLocation();
      } else {
        this.setOptions({ infoLocationTypeIsAuto: false });
      }
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
    }
  },
  computed: {
    ...mapGetters(['options', 'contentState'])
  },
  components: {
    ElementInfoPanel,
    PeriodicTable
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

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
