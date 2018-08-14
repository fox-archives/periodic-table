<template>
<aside class="nav-info">
  <em>Tools</em>
  <br>
  <ul>
    <li> <p>Logic from <a href="https://vuejs.org/">VueJS</a></p> </li>
    <li> <p>U.I. elements from <a href="https://lusaxweb.github.io/vuesax/">VueSax</a></p> </li>
    <li> <p>Icons from <a href="https://feather-icons.com/">Feather Icons</a></p> </li>
    <li> <p>Data from <a href="http://www.rsc.org/periodic-table/">Royal Society of Chemistry</a></p> </li>
    <li> <p>Colors from  <a href="https://yeun.github.io/open-color/">Open Color</a></p> </li>
  </ul>
  <br>
  <em>Note</em>
  <br>
  <p>Note that this version of the web application is not the latest version.</p>
</aside>
</template>

<script>
export default {
  name: 'Info'
}
</script>

<style scoped lang="scss">
.nav-info ul {
    list-style-type: none;
}

.nav-info li {
    padding-bottom: 10px;
}
</style>