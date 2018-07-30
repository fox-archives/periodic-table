export default {
  methods: {
    setBlur: function(blurType) {
      // Could make this similar to addClassToNotif function below, but will not
      if(blurType === "no-blur") {
        document.getElementById('content').classList.add('no-blur');
        document.getElementById('content').classList.remove('blur');
        document.getElementById('content').classList.remove('blur-large');

        // There's probably a better way to do this with VueJS
        this.addClassToNotif(['no-blur'], ['blur', 'blur-large']);

      }
      else if(blurType === "blur") {
        document.getElementById('content').classList.remove('no-blur');
        document.getElementById('content').classList.add('blur');
        document.getElementById('content').classList.remove('blur-large');

        this.addClassToNotif(['blur'], ['no-blur', 'blur-large']);
      }
      else if(blurType === "blur-large") {
        document.getElementById('content').classList.remove('no-blur');
        document.getElementById('content').classList.remove('blur');
        document.getElementById('content').classList.add('blur-large');

        this.addClassToNotif(['blur-large'], ['no-blur', 'blur']);
      }
    },
    addClassToNotif: function(classesAdd, classesRemove) {
      // For all notification div elements found
      let maxElements = document.getElementsByClassName('vs-noti-contenedor');
      for(let i = 0; i < maxElements.length; i++) {
        let element = document.getElementsByClassName('vs-noti-contenedor')[i];

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