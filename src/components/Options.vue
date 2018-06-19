<template>
  <aside id="display-options">
    <ul>
      <li>
        <p class="option-text">Theme</p>
        <vs-select style="width: 70px;" class="option-theme" label="themes" v-model="theme" v-bind:options="themes"></vs-select>
      </li>
      <li>
        <p class="option-text">Information</p>
        <vs-select style="width: 110px;" class="option-theme" label="theme" v-model="informationLocation" v-bind:options="informationLocations"></vs-select>
      </li>
    </ul>

  </aside>
</template>

<script>
  export default {
    name: 'Options',
    data() {
      return {
        theme: 1,
        themes: [
          { text: 'Light', value: 1 },
          { text: 'Dark', value: 2 }
        ],

        informationLocation: 2,
        informationLocations: [
          { text: 'Unobtrusive', value: 1 },
          { text: 'Intrusive', value: 2 },
          { text: 'Excluded', value: 3 }
        ],
        popInfo: false
      }
    }
  }
</script>
