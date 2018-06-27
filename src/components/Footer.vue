<template>
  <footer id="footer" v-bind:class="themeType">
    <p id="name1">© 2018 Edwin Kofler</p>
    <p id="name2">© E. Kofler</p>
    <p id="name3">©</p>
    <a href="#">About</a>
    <a href="#">Feedback</a>
    <a href="https://discord.gg/eZMuVnu">Discord</a>
  </footer>
</template>

<script type="text/javascript">
  //import { bus } from "../index.js";
  import bus from "./bus.js";

  export default {
    name: 'Footer',
    data() {
      return {
        themeType: "light-def"
      }
    },
    // Fires when component is first created
    created() {
      bus.$on('themeChanged', (data) => {
        this.themeType = data;
      })
    }
  }
</script>
