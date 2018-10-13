<template>
  <aside>
    <ul id="options">
      <li class="option">
        <p>Group Labels</p>
        <vs-select label="groupTypes" v-model="groupType">
          <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in groupTypes" />
        </vs-select>
      </li>
      <li class="option">
        <p>Decimal Count</p>
        <vs-select label="decimalCountTypes" v-model="decimalCountType">
          <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in decimalCountTypes" />
        </vs-select>
      </li>
      <li class="option">
        <p>Transitions and Effects</p>
        <vs-select label="transitionTypes" v-model="transitionType" v-bind:options="transitionTypes">
          <vs-select-item :key="index" :vs-value="item.value" :vs-text="item.text" v-for="(item, index) in transitionTypes" />
        </vs-select>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: "AdvancedOptions",
    data() {
      return {
        groupType: 1,
        groupTypes: [
          { text: 'I.U.P.A.C.', value: 1 },
          { text: 'Mendeleev', value: 2 },
          { text: 'CAS', value: 3 },
          { text: 'Trivial Name', value: 4 },
          { text: 'By Element Name', value: 5 }
        ],

        decimalCountType: 1,
        decimalCountTypes: [
          { text: '2', value: 1 },
          { text: '3', value: 2 },
          { text: '4', value: 3 },
          { text: 'Maximum', value: 4 },
        ],
        transitionType: 1,
        transitionTypes: [
          { text: 'Advanced', value: 1 },
          { text: 'Basic', value: 2 },
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
// Format each option
@import '../../styles/common/options.scss';

</style>