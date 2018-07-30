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
      <p>Information</p>
      <vs-select class="option-theme" label="infoLocations" v-model="infoLocation" v-on:change="setInfoLocation">
        <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in infoLocations" />
      </vs-select>
    </li>
    <li class="option">
      <p>Periodic Table Layout</p>
      <vs-select class="option-theme" label="tableLayouts" v-model="tableLayout" v-on:change="setTableLayout">
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
    <vs-popup vs-title="Advanced Options" v-bind:vs-active="advancedSettingsPopupActive" v-on:vs-cancel="advancedSettingsPopup('off')">
        <AdvancedOptionsPopUp></AdvancedOptionsPopUp>
    </vs-popup>

</div>
</template>

<script>
  import bus from '../components/bus.js';
  import blurBackground from '../mixins/blurBackground.js';

  import AdvancedOptionsPopUp from './AdvancedOptions.vue';
  export default {
    name: "Options",
    data() {
      return {
        advancedSettingsPopupActive: false,

        theme: 1,
        themes: [
          { text: 'Light (Default)', value: 1 },
          { text: 'Light (High Contrast)', value: 2 },
          { text: 'Dark', value: 3 }
        ],

        infoLocation: 1,
        infoLocations: [
          { text: 'Obtrusive', value: 1 },
          { text: 'Unobtrusive', value: 2 },
          { text: 'Excluded', value: 3 }
        ],

        tableLayout: 1,
        tableLayouts: [
          { text: 'Fit to Screen', value: 1 },
          { text: 'Full Screen Height', value: 2 },
          { text: 'Full Screen Width', value: 3 },
          { text: 'Mobile', value: 4 },
        ]
      }
    },
    methods: {
      advancedSettingsPopup: function(state) {
        if(state === "on") {
          this.setBlur("blur-large");
          this.advancedSettingsPopupActive = true;
        }
        else if(state === "off") {
          this.setBlur("blur");
          this.advancedSettingsPopupActive = false;
        }
      },
      // Changes local theme, and emits 'theme-changed' to all other .vue files (so theme changes in other .vue files)
      setTheme: function() {
        // This changes themeType
        // i represents each element in themeTypes array
        for(let i = 0; i < this.themeTypes.length; i++) {
          // i + 1 because theme
          if(this.theme === i + 1) {
            this.themeType = this.themeTypes[i];

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
        // Emit event theme change, that the theme type was changed
        bus.$emit('themeChanged', this.themeType);
      },
      setInfoLocation: function() {
        for(let i = 0; i < this.infoLocationTypes.length; i++) {
          if(this.infoLocation === i + 1) {
            this.infoLocationType = this.infoLocationTypes[i];
          }
        }
        bus.$emit('infoLocationChanged', this.infoLocationType);
      },
      setSelection: function() {

      },
      setTableLayout: function() {

      }
    },
    components: {
      AdvancedOptionsPopUp
    },
    mixins: [
      blurBackground
    ]
  }
</script>

<style lang="scss">
  // TODO: Remove duplicate of following SCSS in AdvancedOptions.vue
  // while still displaying advancedOptions.vue properly
#options {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 200px;
}

.option {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    list-style-type: none;
}

.option p {
    font-family: robotolight;
    padding-bottom: 5px;
}
</style>