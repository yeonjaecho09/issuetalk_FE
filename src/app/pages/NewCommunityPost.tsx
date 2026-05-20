import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

export function NewCommunityPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('자유');

  const categories = ['활동후기', '정보공유', '모집', '행사안내', '모임', '자유'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, category });
    navigate('/community');
  };

  return (
    <div className="bg-secondary min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          to="/community"
          className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          취소
        </Link>

        <div className="bg-card border-4 border-foreground p-12 mb-8">
          <h1 className="font-editorial text-6xl mb-4">글쓰기</h1>
          <p className="text-xl font-medium text-muted-foreground">
            커뮤니티와 경험과 정보를 공유하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div className="bg-card border-2 border-foreground p-6">
            <label className="block mb-4">카테고리</label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-3 font-bold border-2 transition-all ${
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

          {/* Title */}
          <div className="bg-card border-2 border-foreground p-8">
            <label className="block mb-4">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
              className="w-full text-3xl font-bold border-b-4 border-foreground pb-4 focus:border-primary focus:outline-none transition-colors bg-transparent"
            />
          </div>

          {/* Content */}
          <div className="bg-card border-2 border-foreground p-8">
            <label className="block mb-4">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 작성해주세요..."
              required
              className="w-full border-2 border-foreground p-4 min-h-[400px] resize-none focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Image Upload (placeholder) */}
          <div className="bg-card border-2 border-foreground p-6">
            <label className="block mb-4">이미지 첨부 (선택)</label>
            <button
              type="button"
              className="w-full border-2 border-dashed border-foreground/30 p-8 hover:border-primary transition-colors flex flex-col items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <ImageIcon size={32} />
              <span className="font-semibold">클릭하여 이미지 업로드</span>
            </button>
          </div>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Link
              to="/community"
              className="border-2 border-foreground px-10 py-4 font-bold hover:bg-foreground hover:text-background transition-colors"
            >
              취소
            </Link>
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-10 py-4 font-bold tracking-wide hover:bg-foreground transition-colors"
            >
              게시하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
