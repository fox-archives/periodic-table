<main>

</template>

<script>
  import GridElement from '../../mixins/GridElement.js';
  import { mapGetters } from 'vuex';

  export default {
    name: "Element",
    data() {
      return {

      }
    },
    computed: {
      // Mix the getters into computed with object spread operator
      ...mapGetters([
        'simpleData',
        'simpleDataObject',
        'ePlacements',
        'periodData',
        'groupData',
        'eColors',
        'ready',
        'showElement',
        'clickActive',
        'clickedElementIndex',
        'clickedElementPeriod',
        'clickedElementGroup',
        'themeType',
        'infoLocationType',

        'ePlacements',
        'ePlacements',
        'test',
        'elementHovered',

      ])
    },
    mixins: [
      GridElement
    ]
  }
</script>

<style scoped lang="scss">
  @import 'Styles/variables.scss';
  @import './generic-elements.scss';
  @import './periodic-table.scss';
  @import './periodic-table.scss';
</style>