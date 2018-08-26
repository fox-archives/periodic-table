<template>
  <div>
    <div id="textual-inner" v-bind:class="[options.themeType, options.infoLocationType]">
      <div id="textual-inner-inner">
        <div class="stat" v-for="n in 25">
          <div class="stat-icon">
            B
          </div>
          <div class="stat-text">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'PanelTextual',
    computed: {
      ...mapGetters([
        'options'
      ])
    }

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

  #textual-inner.info-side {
    position: relative;
    overflow: auto;
  }

  #textual-inner-inner {
    width: 100%;
    height: 100%;
    padding: 5px;
  }

  .info-top #textual-inner-inner {
    display: grid;
    grid-column-gap: 0.5vw;
    grid-row-gap: 0.5vw;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-template-rows: repeat(5, auto);
  }


  .info-side #textual-inner-inner {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    padding: 5px 5px 5px 5px;
    border-radius: $border-radius;

    overflow: auto;
    // height: 100%;
    // max-height: 40vh;
  }

  .stat {
    background-color: $oc-gray-2;
    border-radius: $border-radius-small;
    margin-bottom: 10px;
  }
</style>