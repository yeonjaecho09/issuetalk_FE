import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function NewDebate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('경제');
  const [topic, setTopic] = useState('');
  const [stance, setStance] = useState<'agree' | 'disagree' | 'neutral'>('neutral');

  const categories = ['경제', '환경', '교육', '노동', '주거', '정치', '복지', '문화'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, category, topic, stance });
    navigate('/debates');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        to="/debates"
        className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        취소
      </Link>

      <div className="bg-primary text-primary-foreground p-12 mb-8">
        <h1 className="font-editorial text-6xl mb-4">새 토론 시작</h1>
        <p className="text-xl font-medium opacity-90">
          사회 이슈에 대한 당신의 생각을 나눠주세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-card border-2 border-foreground p-8">
          <label className="block mb-4">토론 주제</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="명확하고 간결한 토론 주제를 입력하세요"
            required
            className="w-full text-3xl font-bold border-b-4 border-foreground pb-4 focus:border-primary focus:outline-none transition-colors bg-transparent"
          />
        </div>

        {/* Category & Topic */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-card border-2 border-foreground p-6">
            <label className="block mb-4">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 border-foreground p-3 font-bold focus:border-primary focus:outline-none transition-colors"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="bg-card border-2 border-foreground p-6">
            <label className="block mb-4">이슈 태그</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="예: 기본소득, 주 4일제"
              required
              className="w-full border-2 border-foreground p-3 font-semibold focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border-2 border-foreground p-8">
          <label className="block mb-4">토론 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="토론의 배경과 핵심 쟁점을 자세히 설명해주세요..."
            required
            className="w-full border-2 border-foreground p-4 min-h-[250px] resize-none focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Stance */}
        <div className="bg-secondary border-2 border-foreground p-8">
          <label className="block mb-4">당신의 입장</label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setStance('agree')}
              className={`p-5 font-bold border-2 transition-all ${
                stance === 'agree'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-foreground/20 hover:border-foreground'
              }`}
            >
              찬성
            </button>
            <button
              type="button"
              onClick={() => setStance('neutral')}
              className={`p-5 font-bold border-2 transition-all ${
                stance === 'neutral'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-foreground/20 hover:border-foreground'
              }`}
            >
              중립적 제안
            </button>
            <button
              type="button"
              onClick={() => setStance('disagree')}
              className={`p-5 font-bold border-2 transition-all ${
                stance === 'disagree'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-foreground/20 hover:border-foreground'
              }`}
            >
              반대
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4 justify-end">
          <Link
            to="/debates"
            className="border-2 border-foreground px-10 py-4 font-bold hover:bg-foreground hover:text-background transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-10 py-4 font-bold tracking-wide hover:bg-foreground transition-colors"
          >
            토론 시작하기
          </button>
        </div>
      </form>
    </div>
  );
}
