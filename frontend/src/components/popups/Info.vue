<template>
<aside class="info">
  <p class="heading">Tools</p>
  <ul id="items">
    <li class="item"> <p class="text">Logic from <a class="link" href="https://vuejs.org/">VueJS</a></p> </li>
    <li class="item"> <p class="text">U.I. elements from <a class="link" href="https://lusaxweb.github.io/vuesax/">VueSax</a></p> </li>
    <li class="item"> <p class="text">Icons from <a class="link" href="https://feather-icons.com/">Feather Icons</a></p> </li>
    <li class="item"> <p class="text">Data from <a class="link" href="http://www.rsc.org/periodic-table/">Royal Society of Chemistry</a></p> </li>
    <li class="item"> <p class="text">Colors from  <a class="link" href="https://yeun.github.io/open-color/">Open Color</a></p> </li>
  </ul>
  <br>
  <p class="heading">Note</p>
  <p class="text">Note that this application is in alpha stage; it is far from appearing complete.</p>
</aside>
</template>

<script>
export default {
  name: 'Info'
}
</script>

<style scoped lang="scss">
  @import '../../styles/variables.scss';
  @import '../../styles/tags.scss';

  // TODO: Fix this formatting and add classes to relevant html
  /*.info, .heading, .items, .item, .text, .link {*/
    /*margin: 0px;*/
    /*padding: 0px;*/
    /*outline: 0px;*/
    /*box-sizing: border-box;*/
  /*}*/

  .heading {
    font-size: 1.125em;
    font-family: latoregular;
    font-style: normal;
    margin-bottom: 7px;
  }

  #items {
      list-style-type: none;
  }

  .item {
    padding-bottom: 10px;
  }

  .link {
    font-family: latolight;
    font-size: 1em;
    text-decoration-line: underline;
  }

  .text {
    font-family: latolight;
    font-weight: normal;
    font-size: 1em;
  }
</style>