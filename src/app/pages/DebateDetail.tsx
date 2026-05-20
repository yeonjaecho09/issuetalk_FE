import { useParams, Link } from 'react-router';
import { ArrowLeft, ThumbsUp, MessageCircle, Share2, Bookmark, Users } from 'lucide-react';
import { getDebateById, getDebateComments } from '../data/mockData';
import { useState } from 'react';

export function DebateDetail() {
  const { id } = useParams<{ id: string }>();
  const debate = id ? getDebateById(id) : undefined;
  const comments = id ? getDebateComments(id) : [];
  const [newComment, setNewComment] = useState('');
  const [stance, setStance] = useState<'agree' | 'disagree' | 'neutral'>('neutral');

  if (!debate) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-card border-2 border-foreground p-12 text-center">
          <h2 className="font-editorial text-4xl mb-4">토론을 찾을 수 없습니다</h2>
          <Link to="/debates" className="text-primary font-bold hover:underline">
            토론 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Link
        to="/debates"
        className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        토론 목록
      </Link>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Debate Content */}
        <div className="col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-card border-4 border-foreground p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-primary text-primary-foreground px-3 py-1 text-xs font-bold tracking-wider uppercase">
                {debate.category}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                주제: {debate.topic}
              </span>
            </div>

            <h1 className="font-editorial text-5xl mb-6 leading-tight">
              {debate.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                {debate.author.name[0]}
              </div>
              <div>
                <div className="font-bold text-lg">{debate.author.name}</div>
                {debate.author.role && (
                  <div className="text-sm text-muted-foreground">{debate.author.role}</div>
                )}
              </div>
            </div>

            <p className="text-lg leading-relaxed text-foreground/90 mb-6">
              {debate.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold hover:bg-foreground transition-colors">
                <ThumbsUp size={18} />
                공감 {debate.likes}
              </button>
              <button className="border-2 border-foreground px-6 py-3 font-bold hover:bg-foreground hover:text-background transition-colors">
                <Share2 size={18} />
              </button>
              <button className="border-2 border-foreground px-6 py-3 font-bold hover:bg-foreground hover:text-background transition-colors">
                <Bookmark size={18} />
              </button>
            </div>
          </div>

          {/* Stance Selector */}
          <div className="bg-secondary border-2 border-foreground p-6">
            <h3 className="font-bold text-sm tracking-wider uppercase mb-4">
              당신의 입장은?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setStance('agree')}
                className={`p-4 font-bold border-2 transition-all ${
                  stance === 'agree'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-foreground/20 hover:border-foreground'
                }`}
              >
                찬성
              </button>
              <button
                onClick={() => setStance('neutral')}
                className={`p-4 font-bold border-2 transition-all ${
                  stance === 'neutral'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-foreground/20 hover:border-foreground'
                }`}
              >
                중립
              </button>
              <button
                onClick={() => setStance('disagree')}
                className={`p-4 font-bold border-2 transition-all ${
                  stance === 'disagree'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-foreground/20 hover:border-foreground'
                }`}
              >
                반대
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-card border-2 border-foreground p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle size={24} />
              의견 {comments.length}개
            </h3>

            {/* Comment Form */}
            <div className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="토론에 참여해보세요. 건설적인 의견을 나눠주세요..."
                className="w-full border-2 border-foreground p-4 min-h-[150px] resize-none focus:border-primary focus:outline-none transition-colors"
              />
              <div className="flex justify-end mt-3">
                <button className="bg-primary text-primary-foreground px-8 py-3 font-bold tracking-wide hover:bg-foreground transition-colors">
                  의견 게시
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-primary pl-6 py-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center font-bold">
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-primary text-primary-foreground p-6 sticky top-24">
            <h3 className="font-bold text-sm tracking-wider uppercase mb-4">
              토론 통계
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold mb-1">{debate.participants}</div>
                <div className="text-sm opacity-90">참여자</div>
              </div>
              <div className="border-t border-primary-foreground/20 pt-4">
                <div className="text-2xl font-bold mb-1">{debate.comments}</div>
                <div className="text-sm opacity-90">의견</div>
              </div>
              <div className="border-t border-primary-foreground/20 pt-4">
                <div className="text-2xl font-bold mb-1">{debate.views}</div>
                <div className="text-sm opacity-90">조회</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
