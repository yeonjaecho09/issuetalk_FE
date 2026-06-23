import { useState } from 'react';
import { useNavigate } from 'react-router';
import { communityCategories, createCommunityPost } from '../data/communityData';
import { useAuth } from '../features/auth/useAuth';
import { NewCommunityPostContent } from '../features/community-write/components/NewCommunityPostContent';

export function NewCommunityPostPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const categories = communityCategories.slice(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0] ?? communityCategories[0]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody || selectedCategory === '전체') {
      return;
    }

    const post = createCommunityPost({
      title: trimmedTitle,
      body: trimmedBody,
      category: selectedCategory,
      author: currentUser?.nickname || currentUser?.name,
    });

    navigate(`/community/${post.id}`);
  };

  return (
    <NewCommunityPostContent
      categories={categories}
      selectedCategory={selectedCategory}
      title={title}
      body={body}
      onSelectCategory={setSelectedCategory}
      onChangeTitle={setTitle}
      onChangeBody={setBody}
      onSubmit={handleSubmit}
    />
  );
}
