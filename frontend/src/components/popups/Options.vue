<template>
  <div>
    <aside id="options">
      <ul>
        <li class="option">
          <p class="text">Theme</p>
          <vs-select v-model="theme" class="option-theme" label="themes" @change="setTheme">
            <vs-select-item
              v-for="(item, index) in themes"
              :vs-value="item.value"
              :vs-text="item.text"
              :key="item.text"
            />
          </vs-select>
        </li>
        <li class="option">
          <p class="text">Element Info Location</p>
          <vs-select
            v-model="infoLocationNum"
            class="option-theme"
            label="infoLocations"
            @change="setInfoLocation"
          >
            <vs-select-item
              v-for="(item, index) in infoLocations"
              :vs-value="item.value"
              :vs-text="item.text"
              :key="item.text"
            />
          </vs-select>
        </li>
        <li class="option">
          <p class="text">Advanced Options</p>
          <!-- I don't know why this div tag stops the button from having a length of 100% -->
          <div>
            <vs-button
              color="primary"
              vs-type="filled"
              @click="advancedSettingsPopup('on')"
            >Advanced</vs-button>
          </div>
        </li>
      </ul>
    </aside>

    <!-- POPUP FOR ADVANCED SETTINGS -->
    <vs-popup
      title="Advanced Options"
      :active.sync="advancedSettingsPopupActive"
      @vs-cancel="advancedSettingsPopup('off')"
    >
      <AdvancedOptionsPopUp/>
    </vs-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import { EventBus } from '../event-bus';
import blurBackground from '../../mixins/blurBackground.js';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import AdvancedOptionsPopUp from './AdvancedOptions.vue';
export default {
  name: 'Options',
  computed: {
    ...mapGetters(['options'])
  },
  mounted() {
    this.$nextTick(() => {
      this.updateInfoLocation();
    });
    // this.updateInfoLocation();
    window.addEventListener('resize', () => {
      this.updateInfoLocation();
    });
    // debounce(window.addEventListener('resize', () => {
    //   this.updateInfoLocation();
    // }), 50);
    // window.addEventListener('resize', () => {
    //   throttle(() => {this.updateInfoLocation()}, 1000);
    // });
  },
  components: {
    AdvancedOptionsPopUp
  },

  data() {
    return {
      advancedSettingsPopupActive: false,

      theme: 1,
      themeTypes: ['light-def', 'light-con', 'dark-def'],
      themes: [
        { text: 'Light (Default)', value: 1 },
        { text: 'Light (High Contrast)', value: 2 },
        { text: 'Dark', value: 3 }
      ],

      infoLocationNum: 1,
      infoLocationTypes: ['info-auto', 'info-top', 'info-side', 'info-exclude'],
      infoLocations: [
        { text: 'Auto', value: 1 },
        { text: 'Top', value: 2 },
        { text: 'Side', value: 3 },
        { text: 'Excluded', value: 4 }
      ]
    };
  },
  methods: {
    ...mapMutations([
      'setOptions',
      'setClassLayout',
      'setMobilePeriodicTableWidth'
    ]),
    advancedSettingsPopup: function(state) {
      if (state === 'on') {
        // TODO: use the setOptions mutator in store.js to manipulate this.options
        this.options.blurType = 'blur-large';

        // this.addClassToNotif(['blur-large'], ['no-blur', 'blur']);
        this.advancedSettingsPopupActive = true;
      } else if (state === 'off') {
        this.options.blurType = 'blur';
        // this.addClassToNotif(['blur'], ['no-blur', 'blur-large']);
        this.advancedSettingsPopupActive = false;
      }
    },
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
  mixins: [blurBackground]
};
</script>

<style scoped lang="scss">
// Format each option
@import '../../styles/common/options.scss';
</style>
