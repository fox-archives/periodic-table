<template>
<aside class="info">
  <p class="heading">Note</p>
  <p class="text">Note that this application is in a very early stage; it is far from any 'Alpha' or 'Beta' stage.</p>
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