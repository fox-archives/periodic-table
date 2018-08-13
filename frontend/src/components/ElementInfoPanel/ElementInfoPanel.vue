<template>
    <section v-if="options.infoLocationType !== 'info-exclude'" id="element-info-panel">
        <li id="element-symbol">
            <div id="element-symbol-inner" class="shadowReg">
                <p id="icon" v-bind:class="activeElement.color">{{ activeElement.abbreviation }}</p>
                <h3 id="element-name">{{ activeElement.name }}</h3>
            </div>
        </li>
        <li id="element-info">
            <ul id="element-info-left">
                <li class="shadowReg">
                    <h4>Atomic Number</h4>
                    <p>{{ activeElement.atomicNumber }}</p>
                </li>
                <li class="shadowReg">
                    <h4>Atomic Mass</h4>
                    <p>{{ activeElement.atomicMass }}</p>
                    <p>u</p>
                </li>
                <li class="shadowReg">
                    <h4>Discovered By</h4>
                    <p>{{ activeElement.discoveredBy }}</p>
                </li>
                <li class="shadowReg">
                    <h4>Discovery Date</h4>
                    <p>{{ activeElement.discoveryDate }}</p>
                </li>
            </ul>
        </li>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: "ElementInfoPanel",
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'options',
        'activeElement',
      ])
    }
  }
</script>

<style scoped lang="scss">
    @import '../../styles/variables.scss';
    @import '../../styles/common/_titles.scss';


    @import './element-info-panel.scss';
</style>