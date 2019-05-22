<template>
  <div>
    <div class="boundary">
      <h3 class="title">Trivia</h3>
      <ul id="trivias">
        <li v-for="trivia in trivias" class="trivia" :key="trivia">
          <div class="trivia-inner">
            <p class="subtitle">{{ trivia.title }}</p>
            <p class="text">{{ trivia.desc }}</p>
          </div>
        </li>
      </ul>
      <!-- <vs-row vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-card class="cardx">
          <div slot="header">
            <h3>Thing here</h3>
          </div>
        </vs-card>
      </vs-col>
      </vs-row>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Trivia',
  data() {
    return {
      trivias: [
        {
          title: 'Properties',
          desc: 'Memorize properties various properties of elements'
        },
        {
          title: 'Electron Levels',
          desc: 'Know the electron levels of elements'
        },
        { title: 'Orbitals', desc: 'Learn the structure of quantum orbitals' },
        {
          title: 'Isotopes',
          desc: 'Know the abundance and other facts of each isotope'
        },
        {
          title: 'Scientists',
          desc: 'Learn which scientists discovered which elements'
        },
        {
          title: 'Graphs',
          desc: 'Identify the variuos graphs of the periodic table'
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

.boundary {
  margin: 0px 10px 0px 10px;
}

.boundary {
  .title {
    font-family: robotoregular;
    font-size: 2em;
  }
  .subtitle {
    font-family: latobold;
    margin-bottom: 10px;
    font-size: 1.5em;
  }
  .text {
    font-family: latolight;
    font-size: 1em;
    line-height: 1.25em;
  }
}

#trivias {
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
}

@include shadow('.trivia', true, $oc-gray-2, $oc-gray-4);
.trivia {
  margin: 0px 20px 10px 0px;
  border-radius: $border-radius;
  background-color: $oc-gray-1;
  height: 300px;
  width: 250px;
  transition: createTransitions((box-shadow, background-color));
}

.trivia:hover {
  transition: createTransitions((box-shadow, background-color));
}

.trivia-inner {
  margin: 15px;
}
</style>
