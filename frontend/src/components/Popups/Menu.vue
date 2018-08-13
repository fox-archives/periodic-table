<template>
    <ul v-bind:class="options.themeType" id="nav-popup">
      <li class="navitem" id="simple-mobile">
        <type-icon class="navIcon featherIcon"></type-icon>
        <h2 class="navText">Simple</h2>
      </li>

      <li class="navitem" id="properties-mobile">
        <list-icon class="navIcon featherIcon"></list-icon>
        <h2 class="navText">Properties</h2>
      </li>

      <li class="navItem custom-icon" id="electrons-mobile">
        <electrons></electrons>
        <h2 class="navText">Electrons</h2>
      </li>

      <li class="navItem custom-icon" id="orbitals-mobile">
        <orbitals2></orbitals2>
        <h2 class="navText">Orbitals</h2>
      </li>

      <li class="navItem custom-icon" id="isotopes-mobile">
        <isotopes></isotopes>
        <h2 class="navText">Isotopes</h2>
      </li>

      <li class="navitem" id="explore-mobile">
        <map-icon class="navIcon featherIcon"></map-icon>
        <h2 class="navText">Explore</h2> </li>

      <li class="navitem" id="trivia-mobile">
        <check-icon class="navIcon featherIcon"></check-icon>
        <h2 class="navText">Trivia</h2>
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

</style>