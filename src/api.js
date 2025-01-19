import axios from "axios";

const baseUrl = `https://abdiazizs-be-nc-news.onrender.com/api`;

export default async function getUsernames() {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data;
}

export async function getTopics() {
  try {
    const response = await axios.get(`${baseUrl}/topics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw new Error("Unable to fetch topics");
  }
}

export async function getArticleByTopic(topic, sort, order, page) {
  try {
    let topicQuery = `${baseUrl}/articles?topic=${topic}&&p=${page}`;
    if (sort) {
      topicQuery += `&&sort=${sort}`;
    }

    if (order) {
      topicQuery += `&&order=${order}`;
    }
    const response = await axios.get(topicQuery);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Unable to fetch articles");
  }
}

export async function getArticleById(id) {
  try {
    const response = await axios.get(`${baseUrl}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Error("Unable to fetch article");
  }
}

export async function getCommentsByArticle(id, page) {
  try {
    const response = await axios.get(
      `${baseUrl}/articles/${id}/comments?p=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Unable to fetch comments");
  }
}

export async function likeArticleVotesById(id) {
  try {
    const response = await axios.patch(`${baseUrl}/articles/${id}`, {
      inc_votes: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Error liking article:", error);
    throw new Error("Unable to like article");
  }
}

export async function dislikeArticleVotesById(id) {
  try {
    const response = await axios.patch(`${baseUrl}/articles/${id}`, {
      inc_votes: -1,
    });
    return response.data;
  } catch (error) {
    console.error("Error disliking article:", error);
    throw new Error("Unable to dislike article");
  }
}

export async function postCommentById(id, username, commentToPost) {
  try {
    const response = await axios.post(`${baseUrl}/articles/${id}/comments`, {
      username: username,
      body: commentToPost,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw new Error("Unable to post comment");
  }
}

export async function deleteCommentById(id) {
  try {
    const response = await axios.delete(`${baseUrl}/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw new Error("Unable to fetch topics");
  }
}

export async function getUserByUsername(username) {
  try {
    const response = await axios.get(`${baseUrl}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Unable to fetch user");
  }
}

export async function postArticle(username, title, description, topic, image) {
  try {
    const response = await axios.post(`${baseUrl}/articles`, {
      username: username,
      title: title,
      body: description,
      topic: topic,
      image: image,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting article:", error);
    throw new Error("Unable to post article");
  }
}

export async function deleteArticleById(id) {
  try {
    const response = await axios.delete(`${baseUrl}/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw new Error("Unable to delete article");
  }
}
