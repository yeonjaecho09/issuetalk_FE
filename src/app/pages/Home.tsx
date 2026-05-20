import { Link } from 'react-router';
import { MessageSquare, Eye, ThumbsUp, Pin } from 'lucide-react';
import { mockDiscussions } from '../data/mockData';

export function Home() {
  return (
    <div className="space-y-1">
      {/* Page Title with Dramatic Typography */}
      <div className="bg-card border-2 border-foreground p-8 mb-6">
        <h2 className="font-editorial text-foreground mb-2">
          최신 토론
        </h2>
        <p className="text-muted-foreground font-medium">
          개발자들이 나누는 기술 토론과 인사이트
        </p>
      </div>

      {/* Discussion Cards with Brutalist Design */}
      {mockDiscussions.map((discussion, index) => (
        <Link
          key={discussion.id}
          to={`/discussion/${discussion.id}`}
          className="block bg-card border-2 border-foreground hover:border-primary transition-all group relative overflow-hidden"
        >
          {discussion.isPinned && (
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 flex items-center gap-1 text-xs font-bold tracking-wider">
              <Pin size={12} />
              고정됨
            </div>
          )}

          <div className="p-6">
            {/* Category Badge */}
            <div className="inline-block bg-foreground text-background px-3 py-1 text-xs font-bold tracking-wider uppercase mb-3">
              {discussion.category}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {discussion.title}
            </h3>

            {/* Content Preview */}
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {discussion.content}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {discussion.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-foreground/60 border border-foreground/20 px-2 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="font-bold">{discussion.author.name}</span>
                <span className="text-muted-foreground">
                  {new Date(discussion.createdAt).toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-4 font-semibold">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={16} />
                  {discussion.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={16} />
                  {discussion.comments}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Eye size={16} />
                  {discussion.views}
                </span>
              </div>
            </div>
          </div>

          {/* Accent Bar */}
          <div className="h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </Link>
      ))}
    </div>
  );
}
