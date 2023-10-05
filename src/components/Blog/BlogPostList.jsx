import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../../queries';
import Sorting from './Sorting';
import BlogPostModal from './BlogPostModal';

function BlogPostList() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [sortOptions, setSortOptions] = useState({ orderBy: 'title' });
  const [todayStatus, setTodayStatus] = useState('all'); 
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    } else if (todayStatus === 'previous') {
      const today = new Date().toISOString().split('T')[0];
      blogs = blogs.filter(blog => blog.published.split('T')[0] !== today);
    } else if (sortOptions.category && sortOptions.category !== 'all') {
      blogs = blogs.filter(blog => blog.category === sortOptions.category);
    }
    
    const isDate = sortOptions.orderBy === 'published';
    blogs.sort((a, b) => isDate ? new Date(b[sortOptions.orderBy]) - new Date(a[sortOptions.orderBy]) : a[sortOptions.orderBy].localeCompare(b[sortOptions.orderBy]));
    return blogs;
  }, [data, sortOptions, todayStatus]);

  const handleSort = (options) => {
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
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h2 className="text-lg font-bold mb-2 text-gray-800">{post.title}</h2>
                    <p className="text-gray-600 mb-2">By {post.author}</p>
                    <p className="text-gray-500 text-sm mb-2">{new Date(post.published).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="text-blue-500 mb-2 font-semibold">{post.category}</p>
                    <div className="mt-4">
                    <button onClick={() => openModal(post)} className="text-blue-500 font-bold">Read more</button> 
                    </div>
                </div>
            ))}
        </div>
        {selectedPost && <BlogPostModal post={selectedPost} isOpen={isModalOpen} onRequestClose={closeModal} />} 
    </div>
);


}

export default BlogPostList;
