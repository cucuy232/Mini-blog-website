
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Reply } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Comment } from '@/types/blog';

interface BlogCommentProps {
  comment: Comment;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const BlogComment: React.FC<BlogCommentProps> = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
      if (disliked) {
        setDisliked(false);
        setDislikes(dislikes - 1);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikes(dislikes - 1);
    } else {
      setDisliked(true);
      setDislikes(dislikes + 1);
      if (liked) {
        setLiked(false);
        setLikes(likes - 1);
      }
    }
  };

  return (
    <div className="border-b border-gray-100 py-6">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{comment.author.name}</h4>
              <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
            </div>
          </div>
          <div className="mt-2 text-gray-700">
            <p>{comment.content}</p>
          </div>
          <div className="mt-3 flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center text-sm ${liked ? 'text-blog-primary' : 'text-gray-500 hover:text-blog-primary'}`}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{likes}</span>
            </button>
            <button 
              onClick={handleDislike}
              className={`flex items-center text-sm ${disliked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{dislikes}</span>
            </button>
            <button 
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center text-sm text-gray-500 hover:text-blog-primary"
            >
              <Reply className="h-4 w-4 mr-1" />
              <span>Reply</span>
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-4">
              <textarea 
                className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blog-primary"
                rows={3}
                placeholder="Write your reply..."
              ></textarea>
              <div className="mt-2 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  className="bg-blog-primary hover:bg-blog-secondary"
                >
                  Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
