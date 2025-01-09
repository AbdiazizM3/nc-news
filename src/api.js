import axios from "axios";

const baseUrl = `https://abdiazizs-be-nc-news.onrender.com/api`;

export default async function getUsernames() {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data;
}

export async function getTopics() {
  const response = await axios.get(`${baseUrl}/topics`);
  return response.data;
}

export async function getArticleByTopic(topic, sort, order, page) {
  let topicQuery = `${baseUrl}/articles?topic=${topic}&&p=${page}`;
  if (sort) {
    topicQuery += `&&sort=${sort}`;
  }

  if (order) {
    topicQuery += `&&order=${order}`;
  }
  const response = await axios.get(topicQuery);
  return response.data;
}

export async function getArticleById(id) {
  const response = await axios.get(`${baseUrl}/articles/${id}`);
  return response.data;
}

export async function getCommentsByArticle(id, page) {
  const response = await axios.get(
    `${baseUrl}/articles/${id}/comments?p=${page}`
  );
  return response.data;
}

export async function likeArticleVotesById(id) {
  const response = await axios.patch(`${baseUrl}/articles/${id}`, {
    inc_votes: 1,
  });
  return response.data;
}

export async function dislikeArticleVotesById(id) {
  const response = await axios.patch(`${baseUrl}/articles/${id}`, {
    inc_votes: -1,
  });
  return response.data;
}

export async function postCommentById(id, username, commentToPost) {
  const response = await axios.post(`${baseUrl}/articles/${id}/comments`, {
    username: username,
    body: commentToPost,
  });
  return response.data;
}

export async function deleteCommentById(id) {
  const response = await axios.delete(`${baseUrl}/comments/${id}`);
  return response.data;
}

export async function getUserByUsername(username) {
  const response = await axios.get(`${baseUrl}/users/${username}`);
  return response.data;
}
