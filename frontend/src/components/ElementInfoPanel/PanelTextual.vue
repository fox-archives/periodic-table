<template>
  <div>
    <div id="textual-inner">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'PanelTextual'
  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';

  @import './_panel-textual-theme.scss';

  .light-def {
    @include panelTextualThemeDefault($ld-background, true, $ld-shadow, $ld-shadow-hover);
  }

  .light-con {
    @include panelTextualThemeDefault($lc-background, true, $lc-shadow, $lc-shadow-hover);
  }

  .dark-def {
    @include panelTextualThemeDefault($dd-background, false, $dd-shadow, $dd-shadow-hover);
  }

  #textual-inner {
    width: 100%;
    height: 100%;
    border-radius: $border-radius;
    transition: createTransitions((box-shadow, background-color));
  }

  #textual-inner:hover {
    transition: createTransitions((box-shadow, background-color));
  }
</style>