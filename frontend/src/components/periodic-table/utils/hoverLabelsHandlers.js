// functions that update the highlighting of the atoms of the periodic table

// @param #String 'type' can be:
//   'period'  Want to darken a period
//   'group'  Want to darken a group
function highlightLabelSection(index, type) {
  // Before highlighting the elements, make sure that the period / group labels are not highlighted
  this.clearLabelExcept({
    periodExclude: -1,
    groupExclude: -1
  });

  if (type === 'period') {
    let period = index + 1;
    this.setColorOfAllButOnePeriod({
      prefix: 'light-', // want this to be light
      exclude: period
    });
    this.setColorOfOnePeriod({
      prefix: 'dark-', // want this to be dark
      include: period
    });
  }
  if (type === 'group') {
    let group = index + 1;
    this.setColorOfAllButOneGroup({
      prefix: 'light-', // want this to be  light
      exclude: group
    });
    this.setColorOfOneGroup({
      prefix: 'dark-', // want this to be dark
      include: group
    });
  }
}

// @param #String 'type' can be:
//   'period'  Want to darken a period
//   'group'  Want to darken a group
function unhighlightLabelSection(index, type) {
  if (type === 'period') {
    let period = index + 1;
    this.setColorOfAllButOnePeriod({
      prefix: '', // want this to be light
      exclude: period
    });
    this.setColorOfOnePeriod({
      prefix: '', // want this to be dark
      include: period
    });
  }
  if (type === 'group') {
    let group = index + 1;
    this.setColorOfAllButOneGroup({
      prefix: '', // want this to be light
      exclude: group
    });
    this.setColorOfOneGroup({
      prefix: '', // want this to be dark
      include: group
    });
  }

  // OTHER STUFF TO DO ON UNHIGHLIGHT
  // By 'click' being active, mean that the user clicked on an element, and wants to display that element, even if mouse moves away from element
  // If click is active, on mouse leave of label, show the previous element that was clicked on (because it got 'erased' on mouseover of label)
  if (this.clickedAtom.active === true) {
    // Recall that this.clickedAtom.period and this.clickedAtom.group are NOT indexes; they are actual values
    // We don't want to change color when this.clickedAtom.period / group is 0 that value is for groupless elements (lanth. and act. elements)
    // Nor do we want to change color when this.clickedAtom.period / group is -1, because that occurs when this.clickedAtom.active is false (I think this is already covered, but just a precaution)
    if (this.clickedAtom.period > 0) {
      this.atomLabelPeriods[this.clickedAtom.period - 1].color = 'dark';
    }
    if (this.clickedAtom.group > 0) {
      this.atomLabelGroups[this.clickedAtom.group - 1].color = 'dark';
    }

    this.setColorOfOneAtom({
      prefix: 'supdark-',
      i: this.clickedAtom.index
    });
  }
}

export { highlightLabelSection, unhighlightLabelSection };
