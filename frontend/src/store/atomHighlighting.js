import Vue from 'vue';

// Purpose: To set a variant of the default color to any one element
// @param #object 'payload' contains properties:
//   (req) .i  ith term to change the color of (starts at 0)
//   (req) .prefix  Prefix to prefix to the color
function setColorOfOneAtom(state, payload) {
  let defaultColor = state.atomColors[payload.i].defaultColor;
  Vue.set(state.atomColors[payload.i], 'color', payload.prefix + defaultColor);
}

// Purpose: To set a variant of the default color to any one group
// @param #object 'payload' contains properties:
//   (req) .prefix  Prefix to be added before the original color of element
//   (req) .include  Group to be included setting the color of
function setColorOfOneGroup(state, payload) {
  for (let i = 0; i < state.atomPlacements.length; i++) {
    // elementGroup represents the group number of a given periodic table element
    let elementGroup = state.atomPlacements[i].group.substring(2);

    // defaultColor represents default color of a given periodic table element
    let defaultColor = state.atomColors[i].defaultColor;

    // If the element group is excluded (from @param 'payload')
    // Allow type coercion (so '1' == 1)
    if (elementGroup == payload.include) {
      Vue.set(state.atomColors[i], 'color', payload.prefix + defaultColor);
    }
  }
}

// Purpose: To set a variant of the default color to any one period
// @param #object 'payload' contains properties:
//   (req) .prefix  Prefix to be added before the original color of element
//   (req) .include  Period to include setting the color of
function setColorOfOnePeriod(state, payload) {
  for (let i = 0; i < state.atomPlacements.length; i++) {
    // elementPeriod represents the period number of a given periodic table element
    let elementPeriod = state.atomPlacements[i].period.substring(2);

    // defaultColor represents default color of a given periodic table element
    let defaultColor = state.atomColors[i].defaultColor;

    // If the element period is excluded (from @param 'payload')
    // Allow type coercion (so '1' == 1)
    if (elementPeriod == payload.include) {
      Vue.set(state.atomColors[i], 'color', payload.prefix + defaultColor);
    }
  }
}

// Purpose: To set a variant of the default color to all elements
// @param #object 'payload' contains properties:
//   (req) .prefix  Prefix to be added before the original color of element
function setColorOfAllAtoms(state, payload) {
  for (let i = 0; i < state.atomPlacements.length; i++) {
    // defaultColor represents default color of a given periodic table element
    let defaultColor = state.atomColors[i].defaultColor;

    Vue.set(state.atomColors[i], 'color', payload + defaultColor);
  }
}

// Purpose: To set a variant of the default color to all but one element
// @param #object 'payload' contains properties:
//   (req) .prefix  Prefix to be added before the original color of element
//   (req) .exclude  Element to be excluded setting the color of (index)
function setColorOfAllButOneAtom(state, payload) {
  for (let i = 0; i < state.atomPlacements.length; i++) {
    // defaultColor represents default color of a given periodic table element
    let defaultColor = state.atomColors[i].defaultColor;

    // If the element group is excluded (from @param 'payload')
    // Allow type coercion (so '1' == 1)

    // i represents the index of the element to be excluded
    if (i != payload.exclude) {
      Vue.set(state.atomColors[i], 'color', payload.prefix + defaultColor);
    }
  }
}

// Purpose: To set a variant of the default color to all but one period
// @param #object 'payload' contains properties:
//   (req) .prefix  Prefix to be added before the original color of element
//   (req) .exclude  Period to exclude setting the color of
function setColorOfAllButOnePeriod(state, payload) {
  for (let i = 0; i < state.atomPlacements.length; i++) {
    // elementPeriod represents the period number of a given periodic table element
    let elementPeriod = state.atomPlacements[i].period.substring(2);

    // defaultColor represents default color of a given periodic table element
    let defaultColor = state.atomColors[i].defaultColor;

    // If the element period is excluded (from @param 'payload')
    // Allow type coercion (so '1' == 1)
    if (elementPeriod != payload.exclude) {
      Vue.set(state.atomColors[i], 'color', payload.prefix + defaultColor);
    }
  }
}

// Purpose: To set a variant of the default color to all but one group
// @param #object 'payload' contains properties:
//   (req) .prefix  Prefix to be added before the original color of element
//   (req) .exclude  Group to be excluded setting the color of
function setColorOfAllButOneGroup(state, payload) {
  for (let i = 0; i < state.atomPlacements.length; i++) {
    // elementGroup represents the group number of a given periodic table element
    let elementGroup = state.atomPlacements[i].group.substring(2);

    // defaultColor represents default color of a given periodic table element
    let defaultColor = state.atomColors[i].defaultColor;

    // If the element group is excluded (from @param 'payload')
    // Allow type coercion (so '1' == 1)
    if (elementGroup != payload.exclude) {
      Vue.set(state.atomColors[i], 'color', payload.prefix + defaultColor);
    }
  }
}

export {
  setColorOfOneAtom,
  setColorOfOneGroup,
  setColorOfOnePeriod,
  setColorOfAllAtoms,
  setColorOfAllButOneAtom,
  setColorOfAllButOnePeriod,
  setColorOfAllButOneGroup
};
