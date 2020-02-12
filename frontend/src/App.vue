<template>
  <div id="content" :class="[options.themeType, options.panelLayout]">
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";

export default {
  components: {
    Navigation,
    Footer
  },
  watch: {
    $route() {
      if (
        this.$route.name === "Orbitals" ||
        this.$route.name === "Isotopes" ||
        this.$route.name === "Explore" ||
        this.$route.name === "Trivia"
      ) {
        this.setReady(false);
      }
    }
  },
  computed: {
    ...mapState("mainAtomTable", ["options"])
  },
  methods: {
    ...mapMutations("mainAtomTable", ["setReady"])
  }
};
</script>

<style lang="scss">
@import "styles/variables";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "lato", Arial, sans-serif;
  font-weight: lighter;
}

html,
body {
  width: 100%;
  height: 100%;
}

// The top three templates have the following IDs respectively: #nav, #display, #foot
#content {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  height: 100%;
}

#content.dark-def {
  background-color: $oc-gray-9;
}
</style>
