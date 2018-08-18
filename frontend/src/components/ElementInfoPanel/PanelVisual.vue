<template>
  <div>
    <div id="visual-inner">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'PanelVisual'
  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';

  @import './_panel-visual-theme.scss';

  .light-def {
    @include panelVisualThemeDefault($ld-background, true, $ld-shadow, $ld-shadow-hover);
  }

  .light-con {
    @include panelVisualThemeDefault($lc-background, true, $lc-shadow, $lc-shadow-hover);
  }

  .dark-def {
    @include panelVisualThemeDefault($dd-background, false, $dd-shadow, $dd-shadow-hover);
  }

  #visual-inner {
    width: 100%;
    height: 100%;
    border-radius: $border-radius;
    transition: createTransitions((box-shadow, background-color));
  }

  #visual-inner:hover {
    transition: createTransitions((box-shadow, background-color));
  }
</style>