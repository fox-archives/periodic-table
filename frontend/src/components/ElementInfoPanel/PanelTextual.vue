<template>
  <div>
    <div id="textual-inner" v-bind:class="[options.themeType, options.infoLocationType]">
      <div id="textual-inner-inner">
        <div class="stat" v-for="n in 20">
          <div class="stat-icon">

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
    // padding: 5px 5px 5px 5px;
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*align-content: flex-start;*/
    /*overflow: auto;*/

    transition: createTransitions((box-shadow, background-color));
  }

  #textual-inner:hover {
    transition: createTransitions((box-shadow, background-color));
  }

  #textual-inner-inner {


    padding: 5px;
    height: 100%;
    width: 100%;
    overflow: auto;
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
    display: flex;

    /*grid-auto-flow: row;*/
    /*grid-template-columns: 1fr;*/
    /*grid-template-rows: repeat(auto-fit, minmax(25px, auto));*/
  }

  .stat {
    background-color: $oc-gray-2;
    border-radius: $border-radius-small;
  }
</style>