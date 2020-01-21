<template>
  <footer id="footer">
    <p>
      © 2020 Edwin Kofler
    </p>
    <!-- <a href="#">About</a> -->
    <!-- <a href="https://discord.gg/eZMuVnu">Discord</a> -->
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
@import "footer";

.light-def {
  p,
  a {
    color: $oc-gray-9;
  }

  a {
    text-decoration-color: $oc-gray-3;
  }

  #footer {
    background-color: white;
  }
}

.dark-def {
  p,
  a {
    color: $oc-gray-1;
  }

  a {
    text-decoration-color: $oc-gray-7;
  }

  #footer {
    background-color: $oc-gray-9;
  }
}
</style>
