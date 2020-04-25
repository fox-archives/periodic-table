<template>
  <div id="trivia">
    <h1>Trivia</h1>
    <TriviaItem
      v-for="triviaItem in triviaItems"
      :key="triviaItem.name"
      :name="triviaItem[triviaItemsScoped]"
    >
      <TriviaItemsScoped
        v-for="triviaItemScoped in triviaItem.triviaItemsScoped"
        :key="triviaItemScoped.displayName"
        :trivia-item="triviaItemScoped"
      >
      </TriviaItemsScoped>
    </TriviaItem>
  </div>
</template>

<script>
import TriviaItem from "@/components/TriviaItem";
import TriviaItemsScoped from "@/components/TriviaItemsScoped";

export default {
  name: "TabTrivia",
  components: {
    TriviaItem,
    TriviaItemsScoped
  },
  data() {
    return {
      triviaItems: [
        {
          displayName: "Properties",
          triviaItemsScoped: [
            {
              displayName: "Atomic Weight",
              graphQlName: "atomicWeight",
              to: "trivia/properties/atomic-weight"
            },
            {
              displayName: "Density",
              graphQlName: "density",
              to: "/trivia/properties/density"
            },
            {
              displayName: "Boilint Point",
              graphQlName: "boilingPoint",
              to: "/trivia/properties/boiling-point"
            },
            {
              displayName: "Melting Point",
              graphQlName: "meltingPoint",
              to: "/trivia/properties/melting-point"
            }
          ]
        },
        {
          displayName: "Electrons",
          triviaItemsScoped: [
            {
              displayName: "Sound Speed",
              graphQlName: "soundSpeed",
              to: "/trivia/electrons/sound-speed"
            },
            {
              displayName: "Thermal Conductivity",
              graphQlName: "thermalConductivity",
              to: "/trivia/electrons/thermal-conductivity"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variables";
</style>
