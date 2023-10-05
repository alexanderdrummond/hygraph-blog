import { gql } from '@apollo/client';

export const GET_POSTS = gql`
query GetBlogs {
  blogs {
    id
    title
    author
    published
    category
    content
    
  }
}
  
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog($data: BlogCreateInput!) {
    createBlog(data: $data) {
      id
      title
      author
      category
      content
    }
  }
`;


export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(where: { id: $id }) {
      id
      title
    }
  }
`;


export const PUBLISH_BLOG = gql`
  mutation PublishBlog($where: BlogWhereUniqueInput!, $to: [Stage!]! = [PUBLISHED]) {
    publishBlog(where: $where, to: $to) {
      id
      title
      author
      category
      content
      published
    }
  }
`;