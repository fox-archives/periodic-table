<template>
    <ul v-bind:class="options.themeType" id="popup-items">
      <li class="popup-item" id="simple-mobile">
        <type-icon class="icon feather-icon"></type-icon>
        <h2 class="heading">Simple</h2>
      </li>

      <li class="popup-item" id="properties-mobile">
        <list-icon class="icon feather-icon"></list-icon>
        <h2 class="heading">Properties</h2>
      </li>

      <li class="popup-item" id="electrons-mobile">
        <electrons class="icon custom-icon"></electrons>
        <h2 class="heading">Electrons</h2>
      </li>

      <li class="popup-item" id="orbitals-mobile">
        <orbitals2 class="icon custom-icon"></orbitals2>
        <h2 class="heading">Orbitals</h2>
      </li>

      <li class="popup-item" id="isotopes-mobile">
        <isotopes class="icon custom-icon"></isotopes>
        <h2 class="heading">Isotopes</h2>
      </li>

      <li class="popup-item" id="explore-mobile">
        <map-icon class="icon feather-icon"></map-icon>
        <h2 class="heading">Explore</h2> </li>

      <li class="popup-item" id="trivia-mobile">
        <check-icon class="icon feather-icon"></check-icon>
        <h2 class="heading">Trivia</h2>
      </li>
    </ul>
</template>

<script>
  import { mapGetters } from 'vuex';

  // Importing to-be-used SVG icons
  import { Type } from 'vue-feather-icon';
  import { List } from 'vue-feather-icon';
  import Electrons from '../../assets/svg/icons/electrons.svg';
  import Orbitals from '../../assets/svg/icons/orbitals.svg';
  import Orbitals2 from '../../assets/svg/icons/orbitals2.svg';
  import Isotopes from '../../assets/svg/icons/isotopes.svg';
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
  // Variables, mixins, and common components
  @import '../../styles/variables.scss';
  @import '../../styles/tags.scss';

  #popup-items, .popup-item, .heading {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }

  #popup-items {
    display: flex;
    flex-direction: column;
    overflow: auto;
    width: 100%;
    user-select: none;
  }

  .popup-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 9px 10px 9px 10px;
    border-radius: $border-radius;

    .icon {
      height: 24px;
      width: 24px;
    }

    .heading {
      font-family: robotolight;
      font-weight: normal;
      font-size: 1.375em;
      margin-left: 12px;
    }

  }

  .popup-item:hover {
    cursor: pointer;
  }

  .popup-item:active {
    transition: createTransitions((background-color));
  }

  .feather-icon {
    stroke-width: 1.125;
  }

  // @param 1  $menuItemHover  The background of each menu button on hover
  // @param 2  $menuItemClick  The background of each menu button on click (note, this uses CSS class :active, which is basically on click)
  // @param 3  $heading  The color of each heading text element
  // @param 4  $icon  The color of all icons

  // Purpose: To style each menu item, depending on hover and click of each menu item, and the theme
  @mixin menuThemeDefault($menuItemHover, $menuItemClick, $heading, $icon) {
    // Do not add .popup-items and set the background-color, as this should be taken care of by Vuesax

    .popup-item {
      .heading {
        color: $heading;
      }

      .custom-icon {
        color: $icon;
      }

      .feather-icon {
        // Should be able to remove stroke if vue-feather-icons updates to use latest version of Feather Icons
        stroke: $icon;
        color: $icon;
      }

    }

    .popup-item:hover {
      background-color: $menuItemHover;
    }

    .popup-item:active {
      background-color: $menuItemClick;
    }

  }

  .light-def {
    @include menuThemeDefault($oc-gray-2, $oc-gray-3, $oc-gray-7, $oc-gray-7);
  }

  .light-con {
    @include menuThemeDefault($oc-gray-3, $oc-gray-4, $oc-gray-8, $oc-gray-8);
  }

  .dark-def {
    @include menuThemeDefault($oc-gray-7, $oc-gray-6, $oc-gray-1, $oc-gray-1);
  }
</style>