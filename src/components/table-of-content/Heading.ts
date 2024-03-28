export interface Heading {
  slug: string;
  text: string;
  depth: number;
  subheadings?: Heading[];
}

export function buildHierarchy(headings: any) {
  const toc: any[] = [];
  const parentHeadings = new Map();

  if (!headings) return toc;
  headings.forEach((h: any) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    if (heading.depth <= 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });
  return toc;
}
