import { useParams, Link } from 'react-router';
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark } from 'lucide-react';
import { getDiscussionById, getCommentsByDiscussionId } from '../data/mockData';
import { useState } from 'react';

export function DiscussionDetail() {
  const { id } = useParams<{ id: string }>();
  const discussion = id ? getDiscussionById(id) : undefined;
  const comments = id ? getCommentsByDiscussionId(id) : [];
  const [newComment, setNewComment] = useState('');

  if (!discussion) {
    return (
      <div className="bg-card border-2 border-foreground p-12 text-center">
        <h2 className="font-editorial mb-4">토론을 찾을 수 없습니다</h2>
        <Link to="/" className="text-primary font-bold hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        목록으로
      </Link>

      {/* Discussion Header */}
      <div className="bg-card border-4 border-foreground p-8">
        <div className="inline-block bg-foreground text-background px-3 py-1 text-xs font-bold tracking-wider uppercase mb-4">
          {discussion.category}
        </div>

        <h1 className="font-editorial text-foreground mb-6">
          {discussion.title}
        </h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
              {discussion.author.name[0]}
            </div>
            <div>
              <div className="font-bold">{discussion.author.name}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(discussion.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 font-bold hover:bg-foreground transition-colors active:scale-95">
              <ThumbsUp size={18} />
              {discussion.likes}
            </button>
            <button className="border-2 border-foreground px-4 py-2 font-bold hover:bg-foreground hover:text-background transition-colors active:scale-95">
              <Share2 size={18} />
            </button>
            <button className="border-2 border-foreground px-4 py-2 font-bold hover:bg-foreground hover:text-background transition-colors active:scale-95">
              <Bookmark size={18} />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {discussion.tags.map(tag => (
            <span
              key={tag}
              className="text-sm font-semibold bg-secondary px-3 py-1 border border-foreground/20"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed">{discussion.content}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-card border-2 border-foreground p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare size={24} />
          댓글 {comments.length}개
        </h3>

        {/* Comment Form */}
        <div className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성해주세요..."
            className="w-full border-2 border-foreground p-4 min-h-[120px] resize-none focus:border-primary focus:outline-none transition-colors"
          />
          <div className="flex justify-end mt-3">
            <button className="bg-primary text-primary-foreground px-6 py-3 font-bold tracking-wide hover:bg-foreground transition-colors active:scale-95">
              댓글 작성
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-l-4 border-primary pl-6 py-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center text-sm font-bold">
                    {comment.author.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{comment.author.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors">
                  <ThumbsUp size={14} />
                  {comment.likes}
                </button>
              </div>
              <p className="text-foreground/90 leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
