export function compareElementPosition(elem1: Element, elem2: Element) {
  // Use compareDocumentPosition to determine the relative position
  const position = elem1.compareDocumentPosition(elem2);

  // If elem1 precedes elem2 in the document
  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    return 1;
  }

  // If elem1 follows elem2 in the document
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
    return -1;
  }

  // If they are the same node or there is no positional relationship
  return 0;
}

export function getDomain(link: string) {
  return new URL(link).hostname.replace('www.', '');
}
