import { Link } from 'react-router';
import { MessageCircle, Users, Eye, ThumbsUp, Flame, TrendingUp } from 'lucide-react';
import { mockDebates } from '../data/mockData';
import { useState } from 'react';

export function DebatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '경제', '환경', '교육', '노동', '주거', '정치', '복지'];

  const filteredDebates = selectedCategory === '전체'
    ? mockDebates
    : mockDebates.filter(d => d.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <div className="bg-primary text-primary-foreground p-12 mb-8">
          <h1 className="font-editorial text-6xl mb-4">토론장</h1>
          <p className="text-xl font-medium opacity-90">
            사회 이슈에 대한 깊이 있는 토론과 다양한 관점을 나눠보세요
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 font-bold tracking-wide whitespace-nowrap transition-all ${
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

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <TrendingUp size={16} />
          <span>{filteredDebates.length}개의 토론</span>
        </div>
        <Link
          to="/debates/new"
          className="bg-primary text-primary-foreground px-6 py-3 font-bold tracking-wide hover:bg-foreground transition-colors inline-flex items-center gap-2"
        >
          새 토론 시작하기
        </Link>
      </div>

      {/* Debates List */}
      <div className="space-y-4">
        {filteredDebates.map((debate) => (
          <Link
            key={debate.id}
            to={`/debates/${debate.id}`}
            className="block bg-card border-2 border-foreground hover:border-primary transition-all group relative"
          >
            {/* Hot Badge */}
            {debate.isHot && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-2 flex items-center gap-1 font-bold">
                <Flame size={16} />
                HOT
              </div>
            )}

            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block bg-foreground text-background px-3 py-1 text-xs font-bold tracking-wider uppercase">
                      {debate.category}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      주제: {debate.topic}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {debate.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {debate.description}
                  </p>
                </div>
              </div>

              {/* Author & Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {debate.author.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{debate.author.name}</div>
                    {debate.author.role && (
                      <div className="text-xs text-muted-foreground">{debate.author.role}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6 font-semibold text-sm">
                  <span className="flex items-center gap-2">
                    <Users size={18} />
                    {debate.participants}명
                  </span>
                  <span className="flex items-center gap-2">
                    <MessageCircle size={18} />
                    {debate.comments}
                  </span>
                  <span className="flex items-center gap-2">
                    <ThumbsUp size={18} />
                    {debate.likes}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Eye size={18} />
                    {debate.views}
                  </span>
                </div>
              </div>
            </div>

            {/* Accent Bar */}
            <div className="h-2 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
        ))}
      </div>
    </div>
  );
}
