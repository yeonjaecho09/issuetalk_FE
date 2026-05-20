import { useParams, Link } from 'react-router';
import { ArrowLeft, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { getCommunityPostById, getCommunityComments } from '../data/mockData';
import { useState } from 'react';

export function CommunityDetail() {
  const { id } = useParams<{ id: string }>();
  const post = id ? getCommunityPostById(id) : undefined;
  const comments = id ? getCommunityComments(id) : [];
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-card border-2 border-foreground p-12 text-center">
          <h2 className="font-editorial text-4xl mb-4">게시글을 찾을 수 없습니다</h2>
          <Link to="/community" className="text-primary font-bold hover:underline">
            커뮤니티로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <Link
          to="/community"
          className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          커뮤니티
        </Link>

        {/* Post Content */}
        <div className="bg-card border-4 border-foreground p-10 mb-6">
          <div className="inline-block bg-foreground text-background px-3 py-1 text-xs font-bold tracking-wider uppercase mb-4">
            {post.category}
          </div>

          <h1 className="font-editorial text-5xl mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-border">
            <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
              {post.author.name[0]}
            </div>
            <div className="flex-1">
              <div className="font-bold">{post.author.name}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 font-bold hover:bg-foreground transition-colors">
                <ThumbsUp size={16} />
                {post.likes}
              </button>
              <button className="border-2 border-foreground px-5 py-2 font-bold hover:bg-foreground hover:text-background transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-card border-2 border-foreground p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle size={24} />
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
              <button className="bg-primary text-primary-foreground px-6 py-3 font-bold tracking-wide hover:bg-foreground transition-colors">
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
                      <div className="font-bold text-sm">{comment.author.name}</div>
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
    </div>
  );
}
