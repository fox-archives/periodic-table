// Sets the color of a label manually, rather than by CSS hover (
function setLabelColor(index, isMouseOver) {
  // isMouseOver is true when the moues is entering an element. isMouesOver is false when the mouse is leaving an element
  // The element that the mouse is entering or leaving is determined by its index in the Vue v-for loop

  // Get the period.json or group value corresponding to the hovered over element (ex. c-11, p-5)
  let periodFull = this.atomPlacements[index].period;
  let groupFull = this.atomPlacements[index].group;

  // Concatenate period.json or group values to a number (ex. 11, 5)
  let period = this.labelClassToNone(periodFull);
  let group = this.labelClassToNone(groupFull);

  // When changing a label color, make sure all others are turned off first
  this.clearLabelExcept({
    periodExclude: -1,
    groupExclude: -1
  });

  // Only darken the period / group label if the element actually has a valid period.json number (within the actual range of the periodic table)
  // Recall Act. and Lan. have period.json of 0, and they don't have period.json / group labels
  if (period > 0) {
    // Darken the labels if the mouse is entering an element
    if (isMouseOver === "true") {
      this.labelPeriodPlacement[period - 1].color = "dark";
    }
    // Lighten the labels if the mouse is leaving an element
    else if (isMouseOver === "false") {
      this.labelPeriodPlacement[period - 1].color = "light";
    } else {
      console.warn(
        "Unexpected parameter for isMouseOver passed through setLabelColor."
      );
    }
  }
  // Only darken the period / group label if the element actually has a valid group number (within the actual range of the periodic table)
  // Recall Act. and Lan. have group of 0, and they don't have period.json / group labels
  if (group > 0) {
    // Darken the labels if the mouse is entering an element
    if (isMouseOver === "true") {
      this.labelGroupPlacement[group - 1].color = "dark";
    }
    // Lighten the labels if the moues is leaving an element
    else if (isMouseOver === "false") {
      this.labelGroupPlacement[group - 1].color = "light";
    } else {
      console.warn(
        "Unexpected parameter for isMouseOver passed through setLabelColor."
      );
    }
  }
}

export { setLabelColor };
