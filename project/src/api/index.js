import axios from 'axios';

export const getInstaPostData = async (username, sessionID, csrfToken, proxy) => {
  const baseURL = proxy ? `http://${proxy}` : 'https://i.instagram.com/api/v1';
  const profileInfoEndpoint = `/users/web_profile_info/?username=${username}`;

  try {
    const data = await axios.get(baseURL + profileInfoEndpoint);
    if (data.graphql && data.graphql.user) {
      const { edge_owner_to_timeline_media } =  data.graphql.user.edge_owner_to_timeline_media;
      if (edge_owner_to_timeline_media.edges.length > 0) {
        const last12Posts = edge_owner_to_timeline_media.edges.slice(0, 12);
        const postURLs = last12Posts.map(
          (post) => `https://www.instagram.com/p/${post.node.shortcode}/`
        );
        console.log('Last 12 post URLs:', postURLs);
      } else {
        console.log('No posts found for this user.');
      }
    } else {
      console.log('User data not found.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
