import { useState } from 'react';
import { useParams } from 'react-router';
import { getCommentsByPostId, getPostById } from '../data/mockDataSelectors';
import { PostDetailContent } from '../features/post-detail/components/PostDetailContent';

export function PostDetail() {
  const { id = '' } = useParams();
  const post = getPostById(id);
  const [commentBody, setCommentBody] = useState('');
  const comments = getCommentsByPostId(id);

  const handleSubmitComment = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <PostDetailContent
      post={post ?? null}
      comments={comments}
      commentBody={commentBody}
      onChangeComment={setCommentBody}
      onSubmitComment={handleSubmitComment}
    />
  );
}
