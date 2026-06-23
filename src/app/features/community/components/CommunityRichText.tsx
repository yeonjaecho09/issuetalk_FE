import { hasHtmlMarkup, sanitizeCommunityHtml } from './communityRichText.html';
import { renderMarkdownLikeContent } from './communityRichText.markdown';
import type { CommunityRichTextProps } from './communityRichText.types';

export function CommunityRichText({ content }: CommunityRichTextProps) {
  if (hasHtmlMarkup(content)) {
    return <div dangerouslySetInnerHTML={{ __html: sanitizeCommunityHtml(content) }} />;
  }

  return renderMarkdownLikeContent(content);
}
