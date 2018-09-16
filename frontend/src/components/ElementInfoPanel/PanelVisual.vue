<template>
  <div>
    <div id="visual-inner">
      <div id="icon">
        <div id="icon-inner" v-bind:class="activeElement.color">
            {{ activeElement.abbreviation }}
        </div>
      </div>
      <div id="text">
        {{ activeElement.name }}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'PanelVisual',
    computed: {
      ...mapGetters([
        'activeElement',
        'options'
    ])
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';

  @import './panel-visual-theme.scss';

  // TODO: Make elementsThemeColors global rather than importing the _elements-theme.scss file, which is mixins and variables
  @import '../PeriodicTable/elements-theme.scss';
  .light-def {
    @include panelVisualThemeDefault($ld-background, true, $ld-shadow, $ld-shadow-hover);
    @include elementsThemeColors('', true, 2, 9);
  }

  .light-con {
    @include panelVisualThemeDefault($lc-background, true, $lc-shadow, $lc-shadow-hover);
    @include elementsThemeColors('', true, 4, 9);
  }

  .dark-def {
    @include panelVisualThemeDefault($dd-background, false, $dd-shadow, $dd-shadow-hover);
    @include elementsThemeColors('', true, 7, 1);

  }

  #visual-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: $border-radius;
    transition: createTransitions((box-shadow, background-color));
  }

  #visual-inner:hover {
    transition: createTransitions((box-shadow, background-color));
  }

  #icon {
    position: relative;
    margin-top: 10px; // Don't think this should be $spacing
    height: 0px;
    width: 75%;
    padding-bottom: 75%;
  }

  #icon-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border-radius: $border-radius;
    transition: createTransitions((border-radius, background-color));
    font-family: robotoregular;
    font-weight: normal;
  }

  .info-top #icon-inner {
    font-size: calc(20vw * 0.75 * 0.48);
  }

  .info-side #icon-inner {
    font-size: calc(17vw * 0.75 * 0.48);
  }

  #icon-inner:hover {
    border-radius: $border-radius * 1.75;
    transition: createTransitions((border-radius));
  }

  #text {
    font-family: robotoregular;
    font-weight: normal;
  }

</style>