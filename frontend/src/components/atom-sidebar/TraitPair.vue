<template>
  <div class="trait-pair">
    <!-- {{ traitPair }} -->
    <p
      v-if="
        typeof traitPair[1] === 'number' || typeof traitPair[1] === 'string'
      "
      class="atom-stat-text"
    >
      <span class="b">{{ traitPair[0] }}</span
      >:
      {{ traitPair[1] }}
      {{ unit(traitPair[0]) }}
    </p>
    <p v-if="typeof traitPair[1] === 'object'" class="atom-status-text">
      <label for="atom-select"></label>
      <select
        id="atom-select"
        v-model="selected"
        name="atom-selector"
        class="select-menu"
        @change="updateTraitPairValue($event)"
      >
        <option v-for="(value, name) in traitPair[1]" :key="name" :value="name">
          {{ name }}
        </option>
      </select>
      {{ finalValue }} {{ currentUnit }}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    traitPair: {
      type: Array,
      default: () => ["Atomic Number", 9999]
    }
  },
  data() {
    return {
      selected: "bravo",
      finalValue: "delta", // final value used in case traitPair[1] is an object,
      traitPairCategory: "alfa", // traitPairCategory is something like 'Abundance'. For example, if the prop traitPair is an array, it would be the value of [traitPair[0]]
      currentUnit: "currentUnit"
    };
  },
  watch: {
    atomTraitsActive() {
      if (typeof this.traitPair[1] === "object") {
        this.updateTraitPairValue();
      }
    }
  },
  created() {
    if (typeof this.traitPair[1] === "object") {
      this.traitPairCategory = this.traitPair[0]; // this is only used if traitPair[1] is an object
      this.selected = Object.entries(this.traitPair[1])[0][0];
      this.updateTraitPairValue();
    }
  },
  computed: {
    ...mapState("mainAtomTable", ["atomTraitsUnits", "atomTraitsActive"])
  },
  methods: {
    unit(traitName) {
      return this.atomTraitsUnits[traitName].unit;
    },
    updateTraitPairValue(event) {
      let traitPairName = event ? event.target.value : this.selected;
      this.finalValue = this.atomTraitsActive[this.traitPairCategory][
        traitPairName
      ];

      // update unit for dropdown
      this.currentUnit = this.atomTraitsUnits[traitPairName].unit;
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
@import "traitPair";
</style>
