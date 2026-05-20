import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Plus, X } from 'lucide-react';

export function NewDiscussion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('프론트엔드');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const categories = ['프론트엔드', '백엔드', '언어', '개발도구', 'AI/ML', '기타'];

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    console.log({ title, content, category, tags });
    navigate('/');
  };

  return (
    <div className="max-w-4xl">
      {/* Back Navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        취소
      </Link>

      {/* Form Header */}
      <div className="bg-primary text-primary-foreground p-8 mb-6">
        <h1 className="font-editorial text-5xl mb-2">새 토론 작성</h1>
        <p className="text-lg font-medium opacity-90">
          커뮤니티와 지식을 공유하세요
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-card border-2 border-foreground p-6">
          <label className="block mb-3">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="토론 주제를 입력하세요"
            required
            className="w-full text-2xl font-bold border-b-4 border-foreground pb-3 focus:border-primary focus:outline-none transition-colors bg-transparent"
          />
        </div>

        {/* Category */}
        <div className="bg-card border-2 border-foreground p-6">
          <label className="block mb-3">카테고리</label>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`p-3 font-bold border-2 transition-all active:scale-95 ${
                  category === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary border-foreground/20 hover:border-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-card border-2 border-foreground p-6">
          <label className="block mb-3">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="토론 내용을 자세히 작성해주세요..."
            required
            className="w-full border-2 border-foreground p-4 min-h-[300px] resize-none focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Tags */}
        <div className="bg-card border-2 border-foreground p-6">
          <label className="block mb-3">태그 (최대 5개)</label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="태그 입력 후 Enter"
              disabled={tags.length >= 5}
              className="flex-1 border-2 border-foreground px-4 py-2 focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={tags.length >= 5}
              className="bg-foreground text-background px-4 py-2 font-bold hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95 disabled:opacity-50"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 bg-secondary border-2 border-foreground px-3 py-1 font-semibold"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-destructive"
                >
                  <X size={16} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4 justify-end">
          <Link
            to="/"
            className="border-2 border-foreground px-8 py-4 font-bold hover:bg-foreground hover:text-background transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-8 py-4 font-bold tracking-wide hover:bg-foreground transition-colors active:scale-95"
          >
            토론 게시하기
          </button>
        </div>
      </form>
    </div>
  );
}
