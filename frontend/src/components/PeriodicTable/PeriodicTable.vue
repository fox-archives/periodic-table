<template>
  <div id="pt" class="has-shadow" v-bind:class="themeType">
    <!-- (INFO UNOBTRUSIVE) ELEMENT OVERVIEW PANEL -->
    <section v-if="infoLocationType === 'info-unobtrusive'" id="det">
      <li id="unobtrusive-overview">
        <div id="unobtrusive-overview-inner" class="shadowReg">
          <p id="element-icon" v-bind:class="showElement.color">{{ showElement.abbreviation }}</p>
          <h3 id="element-name">{{ showElement.name }}</h3>
        </div>
      </li>
      <li id="unobtrusive-desc">
        <ul id="unobtrusive-desc-left">
          <li class="shadowReg">
              <h4>Atomic Number</h4>
              <p>{{ showElement.atomicNumber }}</p>
          </li>
          <li class="shadowReg">
            <h4>Atomic Mass</h4>
            <p>{{ showElement.atomicMass }}</p>
            <p>u</p>
          </li>
          <li class="shadowReg">
            <h4>Discovered By</h4>
            <p>{{ showElement.discoveredBy }}</p>
          </li>
          <li class="shadowReg">
            <h4>Discovery Date</h4>
            <p>{{ showElement.discoveryDate }}</p>
          </li>
        </ul>
        <ul id="unobtrusive-desc-right">

        </ul>
      </li>
    </section>

    <div v-if="ready" id="grid-container">
      <main id="grid">
        <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
        <div class="element-outer"
             v-for="(ePlacement, index) in ePlacements"
             v-on:mouseover="[setElementColor(index, 'dark-'), changeLabelColor(index, 'true'), updateElementInfoAndDesc(index)]"
             v-on:mouseleave="[setElementColor(index, ''), changeLabelColor(index, 'false'), updateElementInfoAndDesc(index)]"
             v-on:click="[clickElement(index), updateElementInfoAndDesc(index)]"
             v-bind:class="[ePlacement.column, ePlacement.row, ePlacement.period, ePlacement.group, eColors[index].color]"
        >
          <div v-cloak class="element-inner">
            <p class="element-atomicNumber element-secondary-info">{{ ePlacement.eLabel }}</p>
            <p class="element-abbreviation element-primary-info">{{ simpleData[index].abbreviation }}</p>
            <p class="element-name element-secondary-info">{{ simpleData[index].name }}</p>
            <p class="element-atomicMass element-secondary-info">{{ simpleData[index].atomicMass }}</p>
          </div>
        </div>

        <!-- (INFO OBTRUSIVE) ELEMENT OVERVIEW PANEL -->
        <section v-if="infoLocationType === 'info-obtrusive'" id="element-overview" v-bind:class="showElement.color" v-cloak>
          <div id="element-overview-inner">
            <p class="element-ov-secondary-info">{{ showElement.atomicNumber }}</p>
            <p class="element-ov-primary-info">{{ showElement.abbreviation }}</p>
            <p class="element-ov-secondary-info">{{ showElement.name }}</p>
            <p class="element-ov-secondary-info">{{ showElement.atomicMass }}</p>
          </div>
        </section>

        <!-- (INFO OBTRUSIVE) ELEMENT DESCRIPTIONS -->
        <section v-if="infoLocationType === 'info-obtrusive'" id="element-desc" v-bind:class="showElement.color" v-cloak>
          <div id="element-desc-inner">
            <p id="element-d-discovery-date" class="element-d-primary-info">Discovery Date</p>
            <p id="element-discovery-date" class="element-d-secondary-info">{{ showElement.discoveryDate }}</p>
            <p id="element-d-discoverer" class="element-d-primary-info">Discovered By </p>
            <p id="element-discoverer" class="element-d-secondary-info">{{ showElement.discoveredBy }}</p>
          </div>
        </section>


        <!-- PERIOD LABELS -->
        <div class="label-period-outer" v-for="(period, index) in periodData" v-bind:class="[period.row, period.column]">
          <div v-cloak class="label-period-inner"
               v-bind:class="periodData[index].color"
               v-on:mouseover="[darkenElements(index, 'dark-', 'period'), lightenElements(index, 'light-', 'period', 'p-'), maintenanceAfter(index, 'mouseOver')]"
               v-on:mouseleave="[darkenElements(index, '', 'period'), lightenElements(index, '', 'period', 'p-'), maintenanceAfter(index, 'mouseLeave')]"
               v-on:click="periodNotification(index)"
          >
            <p class="label-text">{{ period.display }}</p>
          </div>
        </div>

        <!-- GROUP LABELS -->
        <div class="label-group-outer" v-for="(group, index) in groupData" v-bind:class="[group.row, group.column]">
          <div v-cloak class="label-group-inner"
               v-bind:class="groupData[index].color"
               v-on:mouseover="[darkenElements(index, 'dark-', 'group'), lightenElements(index, 'light-', 'group', 'g-'), maintenanceAfter(index, 'mouseOver')]"
               v-on:mouseleave="[darkenElements(index, '', 'group'), lightenElements(index, '', 'group', 'g-'), maintenanceAfter(index, 'mouseLeave')]"
               v-on:click="groupNotification(index)"
          >
            <p class="label-text">{{ group.display }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script type="text/javascript">
  import bus from '../bus.js';
  import { mapGetters } from 'vuex';
  import { mapMutations } from 'vuex';
  import Elements from '../Elements/Elements.vue';

  export default {
    name: 'PeriodicTable',
    data() {
      return {

      }
    },
    methods: {



    },
    created() {
      this.$store.dispatch('loadElementData');

      // TODO: Implement theme change with global Vuex
      // bus.$on('themeChanged', (data) => {
      //   this.themeType = data;
      // });
      // bus.$on('infoLocationChanged', (data) => {
      //   this.infoLocationType = data;
      // });
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
      ]),

    },
    methods: {
      ...mapMutations([
        'updateElementInfoAndDesc',
        'darkenElements',
        'setElementColor',
        'setElementColorForce',
        'setAllElementsColor',
        'lightenElements',
        'changeLabelColor',
        'maintenanceAfter',
        'clearLabelExcept',
        'clickElement',
        'labelClassToNone',
        'labelNoneToClass',
        'getPeriodGroupName',
        'periodNotification',
        'groupNotificatin'

      ]),
      updateElementInfoAndDesc(index) {
        this.$store.commit('updateElementInfoAndDesc', index);
      },
      darkenElements(index, prefix, type) {
        this.$store.commit('darkenElements', index, prefix, type);
      },
      setElementColor(index, shade) {
        this.$store.commit('setElementColor', index, shade);
      },

    },
    components: {
      Elements
    }
  }
</script>


<style lang="scss">
  @import 'Styles/variables.scss';
  @import './periodic-table.scss';
  @import './periodic-table-themes.scss';
  @import './generic-elements.scss';
</style>
