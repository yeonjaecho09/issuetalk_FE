export function hasHtmlMarkup(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

export function sanitizeCommunityHtml(content: string) {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return content
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, '')
      .replace(/\son\w+='[^']*'/gi, '');
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const blockedTags = new Set(['script', 'style', 'iframe', 'object', 'embed']);

  doc.body.querySelectorAll('*').forEach(element => {
    const tagName = element.tagName.toLowerCase();

    if (blockedTags.has(tagName)) {
      element.remove();
      return;
    }

    [...element.attributes].forEach(attribute => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();

      if (name.startsWith('on')) {
        element.removeAttribute(attribute.name);
        return;
      }

      if ((name === 'href' || name === 'src') && value.startsWith('javascript:')) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return doc.body.innerHTML;
}
