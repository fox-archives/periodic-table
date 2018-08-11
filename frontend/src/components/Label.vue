<template>
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
</template>

<script>
import GridElement from '../../mixins/GridElement.js';

export default {
  name: "Label",
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