<template>
    <ul v-bind:class="options.themeType" id="nav-popup">
      <li class="nav-item" id="simple-mobile">
        <type-icon class="nav-icon feather-icon"></type-icon>
        <h2 class="heading">Simple</h2>
      </li>

      <li class="nav-item" id="properties-mobile">
        <list-icon class="nav-icon feather-icon"></list-icon>
        <h2 class="heading">Properties</h2>
      </li>

      <li class="nav-item custom-icon" id="electrons-mobile">
        <electrons></electrons>
        <h2 class="heading">Electrons</h2>
      </li>

      <li class="nav-item custom-icon" id="orbitals-mobile">
        <orbitals2></orbitals2>
        <h2 class="heading">Orbitals</h2>
      </li>

      <li class="nav-item custom-icon" id="isotopes-mobile">
        <isotopes></isotopes>
        <h2 class="heading">Isotopes</h2>
      </li>

      <li class="nav-item" id="explore-mobile">
        <map-icon class="nav-icon feather-icon"></map-icon>
        <h2 class="heading">Explore</h2> </li>

      <li class="nav-item" id="trivia-mobile">
        <check-icon class="nav-icon feather-icon"></check-icon>
        <h2 class="heading">Trivia</h2>
      </li>
    </ul>
</template>

<script>
  import { mapGetters } from 'vuex';

  // Importing to-be-used SVG icons
  import { Type } from 'vue-feather-icon';
  import { List } from 'vue-feather-icon';
  import Electrons from '../svg/Electrons.vue';
  import Orbitals from '../svg/Orbitals.vue';
  import Orbitals2 from '../svg/Orbitals2.vue';
  import Isotopes from '../svg/Isotopes.vue';
  import { Map } from 'vue-feather-icon'; // Explore
  import { Check } from 'vue-feather-icon'; // Trivia
  import { Info } from 'vue-feather-icon';
  import { Settings } from 'vue-feather-icon';
  import { Search } from 'vue-feather-icon';

  export default {
    name: "Menu",
    methods: {
      ...mapGetters([
        'options'
      ])
    },
    components: {
      // Icon Components
      TypeIcon: Type.default,
      ListIcon: List.default,
      Electrons,
      Orbitals,
      Orbitals2,
      Isotopes,
      MapIcon: Map.default, // Explore
      CheckIcon: Check.default, // Trivia
      InfoIcon: Info.default,
      SettingsIcon: Settings.default,
      SearchIcon: Search.default,
    }
  }
</script>

<style scoped lang="scss">
#nav-popup {
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
}
</style>