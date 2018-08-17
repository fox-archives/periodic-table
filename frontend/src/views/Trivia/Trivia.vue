<template>
    <ul id="trivias">
        <li class="trivia" v-for="trivia in trivias">
            <p class="title">{{ trivia.title }}</p>
            <p class="desc">{{ trivia.desc }}</p>
        </li>
    </ul>
</template>

<script>
  export default {
    name: 'Trivia',
    data() {
      return {
        trivias: [
          { title: 'Basic', desc: 'Know basic information about each element' },
          { title: 'Scientists', desc: 'Know which people invented different elements' },
          { title: 'Properties', desc: 'Know the properties of each element' },
          { title: 'Electron Levels', desc: 'Know the energy level of electrons' },
          { title: 'Isotopes', desc: 'Know the abundance of each isotope' },
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

#trivias {
    display: flex;
    list-style-type: none;
}

.trivia {
    margin: 0px 10px 10px 10px;
    border-radius: $border-radius;
    background-color: $oc-gray-0;
    height: 400px;
    width: 250px;
}

.trivia:hover {
    box-shadow: 2px 2px 4px $oc-gray-2;
    transition: all $transition-time ease-in-out;
}

.title {
    margin: 5px 0px 0px 5px;
    font-size: 1.5em;
}

.desc {
    margin: 5px 0px 0px 5px;
}
</style>