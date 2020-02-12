// When element is clicked, darken it, or undarken it
function updateClickedAtom(index) {
  // Change element info and label color (in case the mouse does not movein or moveout the element)
  this.setLabelColor(index, "true");
  this.updateActiveAtom(index);

  // What to do if clicking for the first time, or clicking on a different element
  // Save the index (element index, period.json index, and group index) of the clicked on element
  if (this.clickedAtom.index === -1 || this.clickedAtom.index !== index) {
    this.setAtomLocked(true);

    this.setClickedAtom({
      active: true,
      index: index,
      period: this.labelClassToNone(this.atomPlacements[index].period),
      group: this.labelClassToNone(this.atomPlacements[index].group)
    });

    // Sets color of all elements in periodic table
    this.setColorOfAllButOneAtom({
      prefix: "",
      exclude: index
    });
    this.setColorOfOneAtom({
      prefix: "supdark-",
      i: index
    });
  }
  // If clicking on the same element twice, cancel the 'supdark-' prefix and element hold
  else if (this.clickedAtom.index === index) {
    this.setAtomLocked(false);

    this.setClickedAtom({
      active: false,
      index: -1,
      period: -1,
      group: -1
    });

    // Sets color of all elements in periodic table
    this.setColorOfAllButOneAtom({
      prefix: "",
      exclude: index
    });
    this.setColorOfOneAtom({
      prefix: "dark-",
      i: index
    });
  }
}

export { updateClickedAtom };
