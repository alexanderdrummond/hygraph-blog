import { gql } from '@apollo/client';

export const GET_POSTS = gql`
query GetBlogs {
  blogs {
    title
    author
    published
    category
    slug
    content
  }
}
  
`;
