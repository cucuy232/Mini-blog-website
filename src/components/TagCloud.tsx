
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { mockPosts } from '@/data/mockData';

const TagCloud: React.FC = () => {
  // Get unique tags
  const allTags = mockPosts.flatMap(post => post.tags);
  const uniqueTags = Array.from(new Set(allTags));

  // Count occurrences of each tag
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort by count (descending)
  const sortedTags = uniqueTags.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map(tag => (
          <Link key={tag} to={`/tag/${tag.toLowerCase()}`}>
            <Badge variant="outline" className="hover:bg-blog-accent hover:text-white cursor-pointer">
              {tag} ({tagCounts[tag]})
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
