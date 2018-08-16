<template>
  <nav id="nav" v-bind:class="options.themeType">
    <ul id="nav-content">
      <ul id="logo-container">
        <li id="logo"><a href="/simple"><img src="../../assets/placeholder.png" height="30px"></a></li>
      </ul>
      <ul id="nav-elements">
        <li class="nav-item" id="simple-wide">
        <router-link class="nav-item-body link" to="/simple">
          <type-icon class="icon feather-icon"></type-icon>
          <h2 class="heading"> Simple </h2>
        </router-link>
        </li>

        <li class="nav-item" id="properties-wide">
        <router-link class="nav-item-body link" to="/properties">
          <list-icon class="icon feather-icon"></list-icon>
          <h2 class="heading">Properties</h2>
        </router-link>
        </li>

        <li class="nav-item" id="electrons-wide">
        <router-link class="nav-item-body link" to="/electrons">
          <electrons class="icon custom-icon"></electrons>
          <h2 class="heading">Electrons </h2>
        </router-link>
        </li>

        <li class="nav-item" id="orbitals-wide">
        <router-link class="nav-item-body link" to="/orbitals">
          <orbitals class="icon custom-icon"></orbitals>
          <h2 class="heading">Orbitals</h2>
        </router-link>
        </li>

        <li class="nav-item" id="isotopes-wide">
        <router-link class="nav-item-body link" to="/isotopes">
          <isotopes class="icon custom-icon"></isotopes>
          <h2 class="heading"> Isotopes </h2>
        </router-link>
        </li>

        <li class="nav-item" id="explore-wide">
        <router-link class="nav-item-body link" to="/explore">
          <map-icon class="icon feather-icon"></map-icon>
          <h2 class="heading"> Explore </h2>
        </router-link>
        </li>

        <li class="nav-item" id="trivia-wide">
        <router-link class="nav-item-body link" to="/trivia">
          <check-icon class="icon feather-icon"></check-icon>
          <h2 class="heading"> Trivia </h2>
        </router-link>
        </li>


        <li class="nav-item nav-item-body" id="info" v-on:click="infoPopup('on')">
          <info-icon class="icon feather-icon"></info-icon>
        </li>

        <li class="nav-item nav-item-body" id="settings" v-on:click="optionsPopup('on')">
          <settings-icon class="icon feather-icon"></settings-icon>
        </li>

        <li class="nav-item nav-item-body" id="search">
          <search-icon class="icon feather-icon"></search-icon>
        </li>

        <li class="nav-item nav-item-body" id="menu-mobile" v-on:click="menuPopup('on')">
          <menu-icon class="icon feather-icon"></menu-icon>
        </li>

      </ul>
    </ul>

    <!-- POPUP FOR INFO -->
    <vs-popup title="Information" :active.sync="infoPopupActive" v-on:vs-cancel="infoPopup('off')">
      <InfoPopup/>
    </vs-popup>

    <!-- POPUP FOR HAMBURGER NAV (MENU)-->
    <vs-popup title="Choose a View" :active.sync="menuPopupActive" v-on:vs-cancel="menuPopup('off')">
      <MenuPopup/>
    </vs-popup>

    <!-- POPUP FOR SETTINGS / OPTIONS -->
    <vs-popup title="Options" :active.sync="settingsPopupActive" v-on:vs-cancel="optionsPopup('off')">
      <OptionsPopup/>
    </vs-popup>
  </nav>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';
  import blurBackground from '../../mixins/blurBackground.js';


  // Importing to-be-used SVG icons
  import { Type } from 'vue-feather-icon';
  import { List } from 'vue-feather-icon';
  import Electrons from '../../assets/svg/icons/electrons.svg'
  import Orbitals from '../../assets/svg/icons/orbitals.svg';
  import Orbitals2 from '../../assets/svg/icons/orbitals2.svg';
  import Isotopes from '../../assets/svg/icons/isotopes.svg';
  import { Map } from 'vue-feather-icon'; // Explore
  import { Check } from 'vue-feather-icon'; // Trivia
  import { Info } from 'vue-feather-icon';
  import { Settings } from 'vue-feather-icon';
  import { Search } from 'vue-feather-icon';
  import { Menu } from 'vue-feather-icon';

  // Import Popups
  import InfoPopup from '../Popups/Info.vue';
  import MenuPopup from '../Popups/Menu.vue';
  import OptionsPopup from '../Popups/Options.vue';

  export default {
    name: 'Navigation',
    data() {
      return {
        // DATA FOR POPUPS
        menuPopupActive: false,
        infoPopupActive: false,
        settingsPopupActive: false,
      }
    },
    methods: {
      infoPopup: function(state) {
        // TODO: Add blur (Try to use Vuesax event for popup close, if it exists)
        if(state === "on") {
          this.options.blurType = 'blur';
          this.infoPopupActive = true;
          // this.addClassToNotif(['blur'], ['no-blur', 'blur-large']);
        }
        else if(state === "off") {
          this.options.blurType = 'no-blur';
          this.infoPopupActive = false;
          // this.addClassToNotif(['no-blur'], ['blur', 'blur-large']);
        }
      },
      menuPopup: function(state) {
        if(state === "on") {
          this.options.blurType = 'blur';
          this.menuPopupActive = true;
          // this.addClassToNotif(['blur'], ['no-blur', 'blur-large']);
        }
        else if(state === "off") {
          this.options.blurType = 'no-blur';
          this.menuPopupActive = false;
          // this.addClassToNotif(['no-blur'], ['blur', 'blur-large']);
        }
      },
      optionsPopup: function(state) {
        if(state === "on") {
          this.options.blurType = 'blur';
          this.settingsPopupActive = true;
          // this.addClassToNotif(['blur'], ['no-blur', 'blur-large']);
        }
        else if(state === "off") {
          this.options.blurType = 'no-blur';
          this.settingsPopupActive = false;
          // this.addClassToNotif(['no-blur'], ['blur', 'blur-large']);
        }
      }
    },
    computed: {
      ...mapGetters([
        'options'
      ]),
    },
    components: {
      // Component Popups
      InfoPopup,
      MenuPopup,
      OptionsPopup,

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
      MenuIcon: Menu.default,
    },
    mixins: [
      blurBackground
    ]
  }
</script>

<style scoped lang="scss">
  // Variables, mixins, and common components
  @import '../../styles/variables.scss';
  @import '../../styles/common/_titles.scss';

  @import '../../styles/tags.scss';

  // Structure
  @import './navigation.scss';
  @import './navigation-theme-mixin.scss';

  // navigationThemeTemplate parameters
  // @param 1  $background  Background color of the navigation bar
  // @param 2  $shadow  Shadow that appears below the navigation bar (no hover)
  // @param 3  $shadowHover  Shadow that appears below the navigation bar (on hover)
  // @param 4  $navItemHover  The background of each navigation button on hover

  // @param 5  $navItemClick  The background of each navigation button on click (note, this uses CSS class :active, which is basically on click)
  // @param 6  $navItemActive  The background of each navigation button when selected, and page redirects according to the nav button that was pressed
  // @param 7  $heading  The color of each heading text element
  // @param 8  $icon  The color of all icons
  //
  // Note: There is no $navItem because the background of this will be the same as $background, or the background of the nav bar as a whole

  .light-def {
    @include navigationThemeTemplate($oc-gray-0, $oc-gray-2, $oc-gray-3, $oc-gray-2,
                                     $oc-gray-3, $oc-gray-2, $oc-gray-7, $oc-gray-7)
  }

  .light-con {
    @include navigationThemeTemplate($oc-gray-1, $oc-gray-3, $oc-gray-4, $oc-gray-3,
            $oc-gray-4, $oc-gray-3, $oc-gray-8, $oc-gray-8)
  }

  .dark-def {
    @include navigationThemeTemplate($oc-gray-8, $oc-gray-7, $oc-gray-7, $oc-gray-7,
                                     $oc-gray-6, $oc-gray-7, $oc-gray-1, $oc-gray-1)
  }
</style>
