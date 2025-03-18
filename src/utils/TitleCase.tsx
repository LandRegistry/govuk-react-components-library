export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function titleCaseNoSpace(str: string): string {
  return str
    .replace(/[&\\#,+()$~%.'":*?<>{}\- ]/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word: string) =>
      word ? word.charAt(0).toUpperCase() + word.slice(1) : "",
    )
    .join("");
}
