<template>
  <aside class="info">
    <p class="heading">
      aPeriodicTable.com Information
    </p>
    <p
class="text" style="line-height: 125%">
      This application is undergoing a <b>complete redesign</b>. I have found
      the current strucutre makes it difficult to store and get data. The 'look'
      of the site will remain, but the code will undergo major refractoring. I
      estimate this major change will be complete in one month.
    </p>
    <br>

    <ul id="items">
      <p
style="line-height: 150%;" class="text">
        This websites uses technologies and information from
        <a class="link"
href="https://vuejs.org/">VueJS</a>,
        <a class="link"
href="https://lusaxweb.github.io/vuesax/">VueSax</a>,
        <a
class="link" href="https://feather-icons.com/">Feather Icons</a>, the
        <a class="link" href="http://www.rsc.org/periodic-table/"
          >Royal Society of Chemistry</a
        >, and
        <a
class="link" href="https://yeun.github.io/open-color/"
>Open Color</a>
      </p>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Info'
};
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
