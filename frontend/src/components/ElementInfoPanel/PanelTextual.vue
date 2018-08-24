<template>
  <div>
    <div id="textual-inner" v-bind:class="[options.themeType, options.infoLocationType]">
      <div id="textual-inner-inner">
        <div class="stat" v-for="n in 20">
          <div class="stat-icon">
            Test
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

  #textual-inner.info-side {
   overflow-y: auto;
  }

  .info-side #textual-inner-inner {
    padding: 5px 5px 5px 5px;

    display: grid;
    grid-auto-flow: row;
    grid-auto-columns: 1fr;
    // grid-template-rows: (5, auto);



    /*overflow-y: scroll;*/
    overflow-x: hidden;
    height: 100%;
  }

  .stat {
    background-color: $oc-gray-2;
    border-radius: $border-radius-small;
    margin-bottom: 6px;
  }
</style>