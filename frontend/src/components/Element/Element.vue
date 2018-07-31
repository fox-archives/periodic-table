<template>
  <!-- DUPLICATED ELEMENTS FROM PERIODIC TABLE -->
  <div class="element-outer"
       v-for="(ePlacement, index) in ePlacements"
       v-on:mouseover="[setElementColor(index, 'dark-'), changeLabelColor(index, 'true'), updateElementInfoAndDesc(index)]"
       v-on:mouseleave="[setElementColor(index, ''), changeLabelColor(index, 'false'), updateElementInfoAndDesc(index)]"
       v-on:click="[clickElement(index), updateElementInfoAndDesc(index)]"
       v-bind:class="[ePlacement.column, ePlacement.row, ePlacement.period, ePlacement.group, eColors[index].color]"
  >
    <div v-cloak class="element-inner">
      <p class="element-atomicNumber element-secondary-info">{{ simpleData[index].eLabel }}</p>
      <p class="element-abbreviation element-primary-info">{{ simpleData[index].abbreviation }}</p>
      <p class="element-name element-secondary-info">{{ simpleData[index].name }}</p>
      <p class="element-atomicMass element-secondary-info">{{ simpleData[index].atomicMass }}</p>
    </div>
  </div>
</template>

<script>
  import GridElement from '../../mixins/GridElement.js';

  export default {
    name: "Element",
    data() {
      return {

      }
    },
    mixins: [
      GridElement
    ]
  }
</script>

<style scoped>

</style>