import { setColorOfOneAtom } from "@/store/modules/mainAtomTable/atomHighlighting";

// after switching some of the data, we need to do cleanup, since previous data was overwritten
function switchAtomTabCleanup({ state, commit }) {
  // after switching, we have to replace the data we just fetched
  if (state.clickedAtom.index === -1) {
    commit("updateActiveAtom", state.hoveredAtom.index);
  } else {
    commit("updateActiveAtom", state.clickedAtom.index);

    // the user clicked an element, but when fetching resources, the color data
    // was overwritten recolor the highlighted atom. (this is not in the 'if'
    // block because if `state.clickedAtom.index` is -1, it means the currently
    // selected atom was only hovered (not clicked)
    commit("setColorOfOneAtom", {
      prefix: "supdark-",
      i: state.clickedAtom.index
    });
  }
}

export default switchAtomTabCleanup;
