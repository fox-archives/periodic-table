<template>
<div>
  <aside class="options">
    <ul>
      <li class="option">
        <p>Theme</p>
        <vs-select class="option-theme" label="themes" v-model="theme" v-on:change="setTheme">
          <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in themes" />
        </vs-select>
      </li>
      <li class="option">
        <p>Element Info Location</p>
        <vs-select class="option-theme" label="infoLocations" v-model="infoLocation" v-on:change="setInfoLocation">
          <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in infoLocations" />
        </vs-select>
      </li>
      <li class="option">
        <p>Periodic Table Layout</p>
        <vs-select class="option-theme" label="tableLayouts" v-model="tableLayout">
          <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in tableLayouts" />
        </vs-select>
      </li>
      <li class="option">
        <p>Advanced Options</p>
        <!-- I don't know why this div tag stops the button from having a length of 100% -->
        <div>
          <vs-button v-on:click="advancedSettingsPopup('on')" color="primary" vs-type="filled">Advanced</vs-button>
        </div>
      </li>
    </ul>
  </aside>

  <!-- POPUP FOR ADVANCED SETTINGS -->
  <vs-popup title="Advanced Options" :active.sync="advancedSettingsPopupActive" v-on:vs-cancel="advancedSettingsPopup('off')">
      <AdvancedOptionsPopUp></AdvancedOptionsPopUp>
  </vs-popup>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import blurBackground from '../../mixins/blurBackground.js';

  import AdvancedOptionsPopUp from './AdvancedOptions.vue';
  export default {
    name: "Options",
    data() {
      return {
        select1:3,

        options1:[
          {text:'IT',value:0},
          {text:'Blade Runner',value:2},
          {text:'Thor Ragnarok',value:3},
        ],

        // THEMING
        // Default light theme (see themes array below to see values in selection menu)
        themeTypes: ["light-def", "light-con", "dark-def"],

        // INFO LOCATION
        infoLocationTypes: ['info-auto', 'info-top', 'info-side', 'info-exclude'],

        // DATA FOR HOVERED OPTIONS (when an option is hovered, it updates)
        electronOptionHovered: "false",

        advancedSettingsPopupActive: false,

        theme: 1,
        themes: [
          { text: 'Light (Default)', value: 1 },
          { text: 'Light (High Contrast)', value: 2 },
          { text: 'Dark', value: 3 }
        ],

        infoLocation: 1,
        infoLocations: [
          { text: 'Auto', value: 1 },
          { text: 'Top', value: 2 },
          { text: 'Side', value: 3 },
          { text: 'Excluded', value: 4 }
        ],

        tableLayout: 1,
        tableLayouts: [
          { text: 'Auto', value: 1 },
          { text: 'Full Screen Height', value: 2 },
          { text: 'Full Screen Width', value: 3 },
          { text: 'Mobile', value: 4 },
        ]
      }
    },
    methods: {
      advancedSettingsPopup: function(state) {
        if(state === "on") {
          this.options.blurType = 'blur-large';
          // this.addClassToNotif(['blur-large'], ['no-blur', 'blur']);
          this.advancedSettingsPopupActive = true;
        }
        else if(state === "off") {
          this.options.blurType = 'blur';
          // this.addClassToNotif(['blur'], ['no-blur', 'blur-large']);
          this.advancedSettingsPopupActive = false;
        }
      },
      // Changes local theme, and emits 'theme-changed' to all other .vue files (so theme changes in other .vue files)
      setTheme: function() {
        // This changes themeType (in Vuex optios object)
        // i represents each element in themeTypes array
        for(let i = 0; i < this.themeTypes.length; i++) {
          // i + 1 because theme
          if(this.theme === i + 1) {
            this.options.themeType = this.themeTypes[i];

            // Add it to the main body tag
            let bodyTag = document.getElementById("body");
            bodyTag.classList.add(this.themeTypes[i]);
            for(let j = 0; j < this.themeTypes.length; j++) {
              if(this.themeTypes[i] !== this.themeTypes[j]) {
                bodyTag.classList.remove(this.themeTypes[j]);
              }
            }
          }
        }
      },
      setInfoLocation: function() {
        for(let i = 0; i < this.infoLocationTypes.length; i++) {
          if(this.infoLocation === i + 1) {
            this.options.infoLocationType = this.infoLocationTypes[i];
          }
        }

      }
    },
    computed: {
        ...mapGetters([
          'options'
        ])
    },
    components: {
      AdvancedOptionsPopUp
    },
    mixins: [
      blurBackground
    ]
  }
</script>

<style scoped lang="scss">
// Format each option
@import '../../styles/common/options';

</style>