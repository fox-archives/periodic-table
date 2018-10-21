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
  import { mapMutations } from 'vuex';

  export default {
    name: 'PanelVisual',
    methods: {
      ...mapMutations([
        'sizeElementText'
      ])
    },
    mounted() {
      this.sizeElementText()
    },
    computed: {
      ...mapGetters([
        'activeElement',
        'options'
      ])
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/variables';
  @import 'visual-themes';
  @import 'detailed-visual';
</style>