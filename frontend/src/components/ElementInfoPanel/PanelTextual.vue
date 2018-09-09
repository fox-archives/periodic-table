<template>
  <div id="textual">
    <div id="textual-inner">
      <div id="textual-inner-inner">
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
</template>

<script>
  import { mapGetters } from 'vuex';
  import PerfectScrollbar from 'perfect-scrollbar';
  import SimpleBar from 'simplebar';
  import 'simplebar/dist/simplebar.css';

  export default {
    name: 'PanelTextual',
    computed: {
      ...mapGetters([
        'options'
      ])
    },
    mounted() {
      // data-simplebar
      new SimpleBar(document.getElementById('textual-inner'), {
        autoHide: false
      }, 500);

      // const ps = new PerfectScrollbar('#textual-inner-inner');
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

  // This might be required in the future, not sure
  // .simplebar-scroll-content {
  //   box-sizing: content-box !important;
  // }

  // This element has the scrollbar
  #textual-inner {
    width: 100%;
    height: 100%;
  }

  #textual-inner-inner {
    padding: 5px;
  }

  .info-top .stat {
    background-color: $oc-gray-2;
    border-radius: $border-radius-small;
    margin: 2px;
  }

  .info-side .stat {
    background-color: $oc-gray-2;
    border-radius: $border-radius-small;
    margin-bottom: 6px;
  }

  .info-side #textual-inner {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    border-radius: $border-radius;
  }
  .info-top #textual-inner {
    display: grid;
    grid-column-gap: 0.5vw;
    grid-row-gap: 0.5vw;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-template-rows: repeat(5, auto);
  }

</style>