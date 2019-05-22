<template>
  <ul id="popup-items" :class="options.themeType">
    <li id="properties-mobile" class="popup-item">
      <list-icon class="icon feather-icon" />
      <h2 class="heading">
        Properties
      </h2>
    </li>

    <li id="electrons-mobile" class="popup-item">
      <electrons class="icon custom-icon" />
      <h2 class="heading">
        Electrons
      </h2>
    </li>

    <li id="orbitals-mobile" class="popup-item">
      <orbitals2 class="icon custom-icon" />
      <h2 class="heading">
        Orbitals
      </h2>
    </li>

    <li id="isotopes-mobile" class="popup-item">
      <isotopes class="icon custom-icon" />
      <h2 class="heading">
        Isotopes
      </h2>
    </li>

    <li id="explore-mobile" class="popup-item">
      <map-icon class="icon feather-icon" />
      <h2 class="heading">
        Explore
      </h2>
    </li>

    <li id="trivia-mobile" class="popup-item">
      <check-icon class="icon feather-icon" />
      <h2 class="heading">
        Trivia
      </h2>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

// Importing to-be-used SVG icons
import Type from 'vue-feather-icon/components/type.vue';
import List from 'vue-feather-icon/components/list.vue';
import Electrons from '../../assets/svg/icons/electrons.svg';
import Orbitals from '../../assets/svg/icons/orbitals.svg';
import Orbitals2 from '../../assets/svg/icons/orbitals2.svg';
import Isotopes from '../../assets/svg/icons/isotopes.svg';
import Map from 'vue-feather-icon/components/map.vue'; // Explore
import Check from 'vue-feather-icon/components/check.vue'; // Trivia
import Info from 'vue-feather-icon/components/info.vue';
import Settings from 'vue-feather-icon/components/settings.vue';
import Search from 'vue-feather-icon/components/search.vue';

export default {
  name: 'Menu',
  methods: {
    ...mapGetters(['options'])
  },
  components: {
    // Icon Components
    TypeIcon: Type,
    ListIcon: List,
    Electrons,
    Orbitals,
    Orbitals2,
    Isotopes,
    MapIcon: Map, // Explore
    CheckIcon: Check, // Trivia
    InfoIcon: Info,
    SettingsIcon: Settings,
    SearchIcon: Search
  }
};
</script>

<style scoped lang="scss">
// Variables, mixins, and common components
@import '../../styles/variables.scss';
@import '../../styles/tags.scss';

#popup-items,
.popup-item,
.heading {
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
