<template>
  <div id="textual">
    <div id="textual-inner">
      <div id="textual-buffer">
        <div id="textual-content">
          <div class="stat" v-for="n in 15">
            <div class="stat-icon">
              <p>Lorem</p>
            </div>
            <div class="stat-text">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import PerfectScrollbar from 'perfect-scrollbar';

  export default {
    name: 'PanelTextual',
    computed: {
      ...mapGetters([
        'options'
      ])
    },
    mounted() {
      let ps = new PerfectScrollbar('#textual-inner', {
        swipeEasing: true, // Default
      });



    }

  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';

  @import './panel-textual-theme.scss';

  .light-def {
    @include panelTextualThemeDefault($ld-background, true, $ld-shadow, $ld-shadow-hover);
  }

  .light-con {
    @include panelTextualThemeDefault($lc-background, true, $lc-shadow, $lc-shadow-hover);
  }

  .dark-def {
    @include panelTextualThemeDefault($dd-background, false, $dd-shadow, $dd-shadow-hover);
  }

  #textual {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: $border-radius;
    transition: createTransitions((box-shadow, background-color));
  }

  #textual:hover {
    transition: createTransitions((box-shadow, background-color));
  }

  #textual-inner {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #textual-buffer {
    // Buffer because the direct div under the element with scroll (textual-inner) cannot be flex
    display: block; // Default for div elements
    width: 100%;
    height: 100%;
    box-sizing: content-box;
  }

  // INFO-SIDE
  .info-side #textual-content {
    display: flex;
    flex-direction: column;
    padding: 5px 5px 0px 5px;
    box-sizing: content-box;
  }

  .info-side .stat {
    background-color: $oc-gray-2;
    border-radius: $border-radius-small;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  // INFO-TOP
  .info-top #textual-content {
    display: grid;
    grid-column-gap: 0.5vw;
    grid-row-gap: 0.5vw;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-template-rows: repeat(5, auto);
    width: 100%;
    height: 100%;
  }

  .info-top .stat {
    display: flex;
    background-color: $oc-gray-2;
    border-radius: $border-radius-small;
    margin: 2px;
  }

</style>