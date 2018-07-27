<template lang="html">
  <div>
    <Navigation></Navigation>
    <PeriodicTable></PeriodicTable>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from 'Components/Navigation/Navigation.vue'
import PeriodicTable from 'Components/PeriodicTable/PeriodicTable.vue'
import Footer from 'Components/Footer/Footer.vue'

export default {
  name: 'Main',
  data() {
    return {

    }
  },
  components: {
    Navigation,
    PeriodicTable,
    Footer
  }
}
</script>

<style lang="scss">
</style>
