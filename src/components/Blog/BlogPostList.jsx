import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, DELETE_BLOG } from '../../queries';
import Sorting from './Sorting';
import BlogPostModal from './BlogPostModal';

function BlogPostList({ isEditMode }) {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [sortOptions, setSortOptions] = useState({ orderBy: 'title' });
  const [todayStatus, setTodayStatus] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteBlog] = useMutation(DELETE_BLOG);

  

  const handleDeletePost = (postId) => {
    console.log("Deleting post with ID:", postId);
    deleteBlog({ 
      variables: { id: postId },
      refetchQueries: [{ query: GET_POSTS }]
    })
    .then(response => {
      console.log('Post deleted:', response.data);
    })
    .catch(error => {
      console.error('Error deleting post:', error.message);
    });
  };
  
  const openPostModal = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  const categories = useMemo(() => {
    if (!data) return [];
    const allCategories = data.blogs.map(blog => blog.category);
    return [...new Set(allCategories)];
  }, [data]);

  const sortedBlogs = useMemo(() => {
    if (!data) return [];
    let blogs = [...data.blogs];
    
    if (todayStatus === 'today') {
      const today = new Date().toISOString().split('T')[0];
      blogs = blogs.filter(blog => blog.published.split('T')[0] === today);
    } 

    else if (todayStatus === 'previous') {
      const today = new Date().toISOString().split('T')[0];
      blogs = blogs.filter(blog => blog.published.split('T')[0] !== today);
    } 

    else if (sortOptions.category && sortOptions.category !== 'all') {
      blogs = blogs.filter(blog => blog.category === sortOptions.category);
    }

    if (searchTerm) {
      blogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  
    const isDate = sortOptions.orderBy === 'published';
    blogs.sort((a, b) => isDate ? new Date(b[sortOptions.orderBy]) - new Date(a[sortOptions.orderBy]) : a[sortOptions.orderBy].localeCompare(b[sortOptions.orderBy]));
    
    return blogs;
  }, [data, sortOptions, todayStatus, searchTerm]);

  const handleSort = (options) => {
    if (options.search !== undefined) {
      setSearchTerm(options.search);
    }
    setSortOptions(prevOptions => ({ ...prevOptions, ...options }));
  };
  

  const handleTodayToggle = () => { 
    setTodayStatus(prevStatus => prevStatus === 'today' ? 'all' : 'today');
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <p className="text-center text-xl text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
        <Sorting categories={categories} onSort={handleSort} todayToggle={handleTodayToggle} todayStatus={todayStatus} selectedCategory={sortOptions.category} />
        
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {sortedBlogs.map((post, index) => (
    <div key={index} className="bg-gray-800 text-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
    <h2 className="text-2xl font-semibold mb-2 text-gray-100 tracking-tight leading-snug">{post.title}</h2>
    <p className="text-amber-600 mb-2 font-semibold text-sm uppercase tracking-widest">{post.category}</p>
    <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider">{post.author}</p>
    <p className="text-gray-400 text-xs mb-2">{new Date(post.published).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}</p>
    <p className="text-gray-400 text-xs mb-4 overflow-ellipsis overflow-hidden" style={{ maxHeight: '50px' }}>
      {post.content.slice(0, 100)}...
    </p>
    <div className="mt-2 flex justify-between items-center">
      <button onClick={() => openPostModal(post)} className="text-amber-600 hover:text-amber-500 font-medium text-sm">Read more</button>
      {isEditMode && <button onClick={() => handleDeletePost(post.id)} className="text-red-400 hover:text-red-500 font-semibold text-sm">Delete</button>}
    </div>
  </div>
  
  
  ))}
</div>


         {isPostModalOpen && <BlogPostModal post={selectedPost} isOpen={isPostModalOpen} onRequestClose={closePostModal} />}
      
    </div>
);


}

export default BlogPostList;
