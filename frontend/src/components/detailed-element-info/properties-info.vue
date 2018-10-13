<template>
  <div id="textual">
    <div id="textual-inner">
      <div id="textual-buffer">
        <div id="textual-content">
          <div class="stat" v-for="n in 15">
            <div class="stat-icon">
              <p> {{ activeElement.density }} </p>
            </div>
            <div class="stat-text">
              <p style="font-family: latoregular;">Lorem Ipsum</p>
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
        'options',
        'activeElement'
      ])
    },
    mounted() {
      let psPanelTextual = new PerfectScrollbar('#textual-inner', {
        swipeEasing: true, // Default
      });
    }

  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';
  @import 'info-theme';
  @import 'detailed-info';
</style>
