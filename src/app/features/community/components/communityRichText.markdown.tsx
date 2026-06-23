import { Fragment, type ReactNode } from 'react';

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|`[^`]+`|\[[^\]]+\]\((https?:\/\/[^)\s]+)\))/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  match = pattern.exec(text);
  while (match) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    const token = match[0];
    const key = `${match.index}-${token}`;

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith('~~') && token.endsWith('~~')) {
      nodes.push(<s key={key}>{token.slice(2, -2)}</s>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
      if (linkMatch) {
        nodes.push(
          <a key={key} href={linkMatch[2]} target="_blank" rel="noreferrer">
            {linkMatch[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    }

    cursor = match.index + token.length;
    match = pattern.exec(text);
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function flushList(items: string[], keyPrefix: string) {
  if (items.length === 0) return null;

  return (
    <ul key={`${keyPrefix}-list`}>
      {items.map((item, index) => (
        <li key={`${keyPrefix}-${index}`}>{renderInline(item)}</li>
      ))}
    </ul>
  );
}

export function renderMarkdownLikeContent(content: string) {
  const blocks: ReactNode[] = [];
  const lines = content.split(/\r?\n/);
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = (keyPrefix: string) => {
    if (paragraphLines.length === 0) return;
    blocks.push(
      <p key={`${keyPrefix}-paragraph`}>
        {paragraphLines.map((line, index) => (
          <Fragment key={`${keyPrefix}-${index}`}>
            {index > 0 ? <br /> : null}
            {renderInline(line)}
          </Fragment>
        ))}
      </p>,
    );
    paragraphLines = [];
  };

  const flushPending = (keyPrefix: string) => {
    flushParagraph(keyPrefix);
    const list = flushList(listItems, keyPrefix);
    if (list) blocks.push(list);
    listItems = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    const imageMatch = line.match(/^!\[(.*?)\]\((data:image\/[^)\s]+|https?:\/\/[^)\s]+)\)$/);

    if (!line) {
      flushPending(`blank-${index}`);
      return;
    }

    if (imageMatch) {
      flushPending(`image-${index}`);
      blocks.push(<img key={`image-${index}`} src={imageMatch[2]} alt={imageMatch[1] || '泥⑤? ?대?吏'} />);
      return;
    }

    if (line.startsWith('### ')) {
      flushPending(`h3-${index}`);
      blocks.push(<h3 key={`h3-${index}`}>{renderInline(line.slice(4))}</h3>);
      return;
    }

    if (line.startsWith('## ')) {
      flushPending(`h2-${index}`);
      blocks.push(<h2 key={`h2-${index}`}>{renderInline(line.slice(3))}</h2>);
      return;
    }

    if (line.startsWith('# ')) {
      flushPending(`h1-${index}`);
      blocks.push(<h1 key={`h1-${index}`}>{renderInline(line.slice(2))}</h1>);
      return;
    }

    if (line.startsWith('> ')) {
      flushPending(`quote-${index}`);
      blocks.push(<blockquote key={`quote-${index}`}>{renderInline(line.slice(2))}</blockquote>);
      return;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph(`list-start-${index}`);
      listItems.push(line.slice(2));
      return;
    }

    if (listItems.length > 0) {
      const list = flushList(listItems, `list-end-${index}`);
      if (list) blocks.push(list);
      listItems = [];
    }

    paragraphLines.push(rawLine);
  });

  flushPending('final');

  return <>{blocks}</>;
}
