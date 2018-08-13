export default {
  methods: {
    // This adds a class to each VueX notification, so that they blur when user clicks to open a Popup
    // menu. This is required because Vuex notifications are not a child of the #content div element
    addClassToNotif: function(classesAdd, classesRemove) {
      // For all notification div elements found
      let maxElements = document.getElementsByClassName('vs-notifications');
      for(let i = 0; i < maxElements.length; i++) {
        let element = document.getElementsByClassName('vs-notifications')[i];

        // Add all classes in classAdd array
        for(let j = 0; j < classesAdd.length; j++) {
          element.classList.add(classesAdd[j]);
        }

        // Remove all classes in classRemove array
        for(let j = 0; j < classesRemove.length; j++) {
          element.classList.remove(classesRemove[j]);
        }
      }
    }
  }
}