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

function trimString(s, c) {
  if (c === "]") c = "\\]";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}

const csvToJson = (str, headerList, quotechar = '"', delimiter = ",") => {
  const cutlast = (_, i, a) => i < a.length - 1;
  // const regex = /(?:[\t ]?)+("+)?(.*?)\1(?:[\t ]?)+(?:,|$)/gm; // no variable chars
  const regex = new RegExp(
    `(?:[\\t ]?)+(${quotechar}+)?(.*?)\\1(?:[\\t ]?)+(?:${delimiter}|$)`,
    "gm"
  );
  const lines = str.split("\n");
  let headers =
    headerList || lines.splice(0, 1)[0].match(regex).filter(cutlast);

  headers = headers.map((header) => trimString(header, ","));

  const list = [];

  for (const line of lines) {
    const val = {};
    for (const [i, m] of [...line.matchAll(regex)].filter(cutlast).entries()) {
      // Attempt to convert to Number if possible, also use null if blank
      val[headers[i]] = m[2].length > 0 ? Number(m[2]) || m[2] : null;
    }
    list.push(val);
  }

  return { headers: headers, data: list };
};

export { getPopoverAlignment, csvToJson };
