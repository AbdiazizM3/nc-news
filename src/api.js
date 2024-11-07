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

export async function getArticleByTopic(topic) {
  const response = await axios.get(`${baseUrl}/articles?topic=${topic}`);
  return response.data;
}

export async function getArticleById(id) {
  const response = await axios.get(`${baseUrl}/articles/${id}`);
  return response.data;
}

export async function getCommentsByArticle(id) {
  const response = await axios.get(`${baseUrl}/articles/${id}/comments`);
  return response.data;
}

export async function updateArticleVotesById(id) {
  const response = await axios.patch(`${baseUrl}/articles/${id}`, {
    inc_votes: 1,
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
