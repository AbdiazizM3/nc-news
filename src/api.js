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
