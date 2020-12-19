import { CONSTANTS } from "./constants";

const getPopoverAlignment = (anchorEl) => {
  let alignment = CONSTANTS.POPOVER.ALIGN_CENTER_RIGHT;
  if (anchorEl) {
    let outerDiv = document.getElementById("root").getBoundingClientRect();
    let bounds = anchorEl.getBoundingClientRect();
    const anchorX = bounds.x;

    if (anchorX >= outerDiv.right / 2) {
      alignment = CONSTANTS.POPOVER.ALIGN_CENTER_LEFT;
    }
  }
  return alignment;
};

export { getPopoverAlignment };
