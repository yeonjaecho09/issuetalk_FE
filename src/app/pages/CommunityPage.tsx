import { Link } from 'react-router';
import { MessageCircle, Eye, ThumbsUp, Pin, PenSquare } from 'lucide-react';
import { mockCommunityPosts } from '../data/mockData';
import { useState } from 'react';

export function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '활동후기', '정보공유', '모집', '행사안내', '모임', '자유'];

  const filteredPosts = selectedCategory === '전체'
    ? mockCommunityPosts
    : mockCommunityPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-secondary min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <div className="bg-card border-4 border-foreground p-12 mb-8">
            <h1 className="font-editorial text-6xl mb-4">커뮤니티</h1>
            <p className="text-xl font-medium text-muted-foreground">
              시민들의 자유로운 소통과 정보 공유의 공간
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 font-bold tracking-wide whitespace-nowrap transition-all text-sm ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border-2 border-foreground hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-3">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold text-muted-foreground">
                {filteredPosts.length}개의 게시글
              </div>
              <Link
                to="/community/new"
                className="bg-primary text-primary-foreground px-6 py-3 font-bold tracking-wide hover:bg-foreground transition-colors inline-flex items-center gap-2"
              >
                <PenSquare size={18} />
                글쓰기
              </Link>
            </div>

            {/* Posts List */}
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/community/${post.id}`}
                className="block bg-card border-2 border-foreground hover:border-primary transition-all group"
              >
                {post.isPinned && (
                  <div className="bg-primary text-primary-foreground px-4 py-1 text-xs font-bold tracking-wider flex items-center gap-1">
                    <Pin size={12} />
                    공지
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="inline-block bg-foreground text-background px-2 py-1 text-xs font-bold tracking-wider uppercase mb-2">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span>{post.author.name}</span>
                      <span>·</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Eye size={14} />
                        {post.views}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Posts */}
            <div className="bg-primary text-primary-foreground p-6">
              <h3 className="font-bold text-sm tracking-wider uppercase mb-4">
                인기 게시글
              </h3>
              <div className="space-y-3">
                {mockCommunityPosts.slice(0, 5).map((post, idx) => (
                  <Link
                    key={post.id}
                    to={`/community/${post.id}`}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="flex gap-3">
                      <span className="font-bold text-2xl opacity-50">{idx + 1}</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold line-clamp-2 mb-1">
                          {post.title}
                        </div>
                        <div className="text-xs opacity-75">
                          {post.likes} 좋아요
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-card border-2 border-foreground p-6">
              <h3 className="font-bold text-sm tracking-wider uppercase mb-4">
                커뮤니티 가이드
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 서로 존중하는 대화</li>
                <li>• 건설적인 비판</li>
                <li>• 근거 있는 주장</li>
                <li>• 혐오 표현 금지</li>
                <li>• 개인정보 보호</li>
              </ul>
            </div>

            {/* Active Users */}
            <div className="bg-card border-2 border-foreground p-6">
              <h3 className="font-bold text-sm tracking-wider uppercase mb-4">
                활동 통계
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">현재 접속자</span>
                  <span className="font-bold">342명</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">오늘 게시글</span>
                  <span className="font-bold">89개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">전체 회원</span>
                  <span className="font-bold">12,847명</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
