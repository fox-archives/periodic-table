<template>
  <div>
    <div class="boundary">
      <h3 class="title">
        Trivia
      </h3>
      <ul id="trivia">
        <li v-for="trivia in trivias" :key="trivia" class="trivia">
          <div class="trivia-inner">
            <p class="subtitle">
              {{ trivia.title }}
            </p>
            <p class="text">
              {{ trivia.desc }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabTrivia'
};
</script>

<style scoped lang="scss">
@import '../styles/variables';

.boundary {
  margin: 0 10px 0 10px;
}

.boundary {
  .title {
    font-family: robotoregular, serif;
    font-size: 2em;
  }
  .subtitle {
    font-family: latobold, serif;
    margin-bottom: 10px;
    font-size: 1.5em;
  }
  .text {
    font-family: latolight, serif;
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
