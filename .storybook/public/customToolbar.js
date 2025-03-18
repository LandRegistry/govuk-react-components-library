let sheet = (function () {
  let style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);
  return style.sheet;
})();

function editToolBar() {
  const urlSearchParams = new URLSearchParams(
    document.location.search.substring(1),
  );
  const documentName = urlSearchParams.get("document_name");
  const documentNameColour = urlSearchParams.get("document_name_colour");
  const toolbar = urlSearchParams.get("toolbar");
  const file = urlSearchParams.get("file");
  // console.log(file);

  if (toolbar.startsWith("minimal")) {
    // Adding elements to right part of toolbar
    addElemFromSecondaryToPrimary("pageRotateCw", "toolbarViewerRight"); // Move Rotate Clockwise to main toolbar
    addElemFromSecondaryToPrimary("pageRotateCcw", "toolbarViewerRight"); // Move Rotate Anti-Clockwise to main toolbar
    addVerticalToolbarSeparator("pageRotateCcw");

    // Removing excess separators
    removeHorizontalToolbarSeparator(1);

    // Removing unnecessary buttons
    removeElement("openFile");
    removeElement("secondaryOpenFile");
    removeElement("editorModeButtons");
    removeElement("editorModeSeparator");
    removeElement("download");
    removeElement("secondaryDownload");
    removeElement("viewBookmark");
  }

  if (documentName !== "undefined" && documentName.length > 0) {
    const hasDocumentNameColour =
      documentNameColour !== "undefined" && documentNameColour.length > 0;
    // Add Document Name to toolbar
    const element = document.createElement("p");
    element.innerHTML = documentName;
    element.style.fontSize = "16px";
    element.style.margin = "2px 1px";
    element.style.padding = "5px 6px";
    element.style.color = hasDocumentNameColour ? documentNameColour : "White";
    element.id = "documentName";
    const parent = document.getElementById("viewFind");
    parent.before(element);
    addVerticalToolbarSeparator("documentName");
  }

  // Remove Print button if document has Hide print toolbar function
  if (toolbar && toolbar.endsWith("HidePrint")) {
    removeElement("secondaryPrint");
    removeElement("print");
    // Make sense to hide save button if printing is now allowed
    removeElement("download");
    removeElement("secondaryDownload");
    // Removing excess separators
    removeElement("editorModeSeparator");
  } else {
    // now that print is allowed
    // might wanna Add Record Print Audit to Print function
    window.print = function print() {
      var imageSrc = `${file}#toolbar=0`;
      openAndPrint(imageSrc); // Replace PDF.js print function with our own
    };
  }
}

/**
 * Changes the icon of the given element displayed on the viewer
 * @param {string} elemID The ID of the element whose icon is being changed
 * @param {string} iconUrl URL of the image being used as the icon
 */
function changeIcon(elemID, iconUrl) {
  let element = document.getElementById(elemID);
  let classNames = element.className;
  classNames = elemID.includes("Toggle")
    ? "toolbarButton#" + elemID
    : classNames.split(" ").join(".");
  classNames = elemID.includes("view")
    ? "#" + elemID + ".toolbarButton"
    : "." + classNames;
  classNames += "::before";
  addCSSRule(sheet, classNames, `content: url(${iconUrl}) !important`, 0);
}

/**
 * Moves items from the secondary toolbar into the primary toolbar. If element is being added to the `toolbarViewerRight` region, it will be placed before the secondaryToolbarToggle button
 * @param {string} elemID The ID of the element being moved
 * @param {string} parentID The ID of the region the element is being moved to. There are 3 primary regions (`toolbarViewerLeft`, `toolbarViewerMiddle`, `toolbarViewerRight`)
 */
function addElemFromSecondaryToPrimary(elemID, parentID) {
  let element = document.getElementById(elemID);
  let parent = document.getElementById(parentID);
  element.classList.remove("secondaryToolbarButton");
  element.classList.add("toolbarButton");
  element.innerHTML = "";
  // Place elements before the secondaryToolbarToggle button
  if (parentID === "toolbarViewerRight") {
    parent.lastElementChild.before(element);
  } else {
    parent.append(element);
  }
  updateTabIndex(parentID);
  updateTabIndex("secondaryToolbarButtonContainer");
}

/**
 * Moves items from the primary toolbar into the secondary toolbar
 * @param {string} elemID The ID of the element being moved
 * @param {string} elemLabel The text being displayed on the secondary toolbar with the item
 */
function addElemFromPrimaryToSecondary(elemID, elemLabel) {
  let element = document.getElementById(elemID);
  let elementParent = element.parentElement;
  let parent = document.getElementById("secondaryToolbarButtonContainer");
  element.classList.remove("toolbarButton");
  element.classList.add("secondaryToolbarButton");
  element.innerHTML = elemLabel;
  parent.append(element);
  updateTabIndex("secondaryToolbarButtonContainer");
  updateTabIndex(elementParent.id);
}

/**
 * Adds a new vertical separator to the toolbar
 * @param {string} precedingParentID The ID of the element the new separator will be added after
 */
function addVerticalToolbarSeparator(precedingParentID) {
  let parent = document.getElementById(precedingParentID);
  let element = document.createElement("div");
  element.className = "verticalToolbarSeparator";
  parent.after(element);
}

/**
 * Adds a new horizontal separator to the toolbar
 * @param {string} precedingParentID The ID of the element the new separator will be added after
 */
function addHorizontalToolbarSeparator(precedingParentID) {
  let parent = document.getElementById(precedingParentID);
  let element = document.createElement("div");
  element.className = "horizontalToolbarSeparator";
  parent.after(element);
}

/**
 * Removes the separator element from the primary toolbar
 * @param {string} parentID The ID of the region the separator is on. There are 3 primary regions (`toolbarViewerLeft`, `toolbarViewerMiddle`, `toolbarViewerRight`)
 * @param {string} index The index of the separator element being removed. Note - After removing a separator, the index of the remaining separators will change
 */
function removeVerticalToolbarSeparator(parentID, index) {
  let element = document.querySelectorAll(`#${parentID} div`)[index];
  if (element) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Removes the separator element from the secondary toolbar
 * @param {string} index The index of the separator element being removed. Note - After removing a separator, the index of the remaining separators will change
 */
function removeHorizontalToolbarSeparator(index) {
  let element = document.querySelectorAll(
    "#secondaryToolbarButtonContainer div",
  )[index];
  if (element) {
    console.log(element);
    element.parentNode.removeChild(element);
  }
}

/**
 * Removes an element from the PDF Viewer toolbar
 * @param {string} elemID The ID of the element being removed
 */
function removeElement(elemID) {
  let element = document.getElementById(elemID);
  if (!element) {
    return;
  }
  let elementParent = element.parentElement;
  element.parentNode.removeChild(element);
  updateTabIndex(elementParent.id);
}

/**
 * When the page is resized, the viewer hides and move some buttons around.
 * Forcibly show all buttons so none of them disappear or re-appear on page resize
 */
function removeGrowRules() {
  addCSSRule(sheet, ".hiddenSmallView *", "display:block !important");
  addCSSRule(sheet, ".hiddenMediumView", "display:block !important");
  addCSSRule(sheet, ".hiddenLargeView", "display:block !important");
  addCSSRule(sheet, ".visibleSmallView", "display:block !important");
  addCSSRule(sheet, ".visibleMediumView", "display:block !important");
  addCSSRule(sheet, ".visibleLargeView", "display:block !important");
}

/**
 * Adds new CSS rule to the PDF Viewer's CSS Stylesheet
 * @param {function} sheet The CSS sheet function defined at start of script
 * @param {string} selector The HTML selector ID of the CSS rule being added
 * @param {string} rules The contents of the new CSS rule
 * @param {number} index The index to insert the new rule at. If not provided, rule is inserted at end of list
 */
function addCSSRule(sheet, selector, rules, index) {
  if ("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", index);
  } else if ("addRule" in sheet) {
    sheet.addRule(selector, rules, index);
  }
}

/**
 * Reorganizes the tabindex of all the elements in a group, selecting the first element's tabindex and incrementing from there
 * @param {string} parentID The ID of the parent element that contains the items that need updating
 */
function updateTabIndex(parentID) {
  let parent = document.getElementById(parentID);
  let startingTabIndex = parseInt(
    parent.firstElementChild.getAttribute("tabindex"),
  );
  for (const element of parent.children) {
    if (element.hasAttribute("tabindex")) {
      element.setAttribute("tabindex", startingTabIndex);
      startingTabIndex++;
    }
  }
}

/**
 * Adds a class to an existing element
 * @param {string} elemID The ID of the element being altered
 * @param {string} className Name of class to be added to element
 */
function addClassToElement(elemID, className) {
  let element = document.getElementById(elemID);
  element.classList.add(className);
}

/**
 * Removes a class from an existing element
 * @param {string} elemID The ID of the element being altered
 * @param {string} className Name of class being removed from element
 */
function removeClassFromElement(elemID, className) {
  let element = document.getElementById(elemID);
  element.classList.remove(className);
}

/**
 * Adds an attribute to an element. If attribute already exists on element, then it is updated
 * @param {string} elemID The ID of the element being altered
 * @param {string} attributeName The name of the attribute being added
 * @param {string} attributeValue The value of the attribute
 */
function addAttributeToElement(elemID, attributeName, attributeValue) {
  let element = document.getElementById(elemID);
  element.setAttribute(attributeName, attributeValue);
}

/**
 * Removes an attribute from an element
 * @param {string} elemID The ID of the element being altered
 * @param {string} attributeName The name of the attribute being removed
 */
function removeAttributeToElement(elemID, attributeName) {
  let element = document.getElementById(elemID);
  element.removeAttribute(attributeName);
}

/**
 * Opens the PDF file in a separate window and opens print dialog before closing separate window
 * @param {String} url The file data to be printed
 */
function openAndPrint(url) {
  const myWindow = window.open(url, "_blank");
  myWindow.onafterprint = (event) => {
    myWindow.close();
  };
  myWindow.onload = () => {
    myWindow.print();
  };
}

window.onload = editToolBar;
