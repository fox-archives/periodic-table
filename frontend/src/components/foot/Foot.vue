<template>
  <footer id="footer">
    <p id="name-lg">
      © 2019 Edwin Kofler
    </p>
    <p id="name-md">
      © E. Kofler
    </p>
    <p id="name-sm">
      ©
    </p>
    <!-- <a href="#">About</a> -->
    <a href="https://discord.gg/eZMuVnu">Discord</a>
  </footer>
</template>

<script>
export default {
  name: "Foot"
};
</script>

<style scoped lang="scss">
@import "foot";

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
