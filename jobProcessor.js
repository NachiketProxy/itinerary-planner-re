// jobProcessor.js
import { marked } from 'marked';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const processJob = async (job) => {
  const { number_of_people, number_of_days, average_budget, travel_dates, starting_location } = job.data;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Create a ${number_of_days}-day itinerary for a trip to ${starting_location} for ${number_of_people} people with an average budget of ₹${average_budget} per person. The trip starts on ${travel_dates.start}. The itinerary should include major attractions, activities, and recommendations for accommodations and meals.`;

  const result = await model.generateContent([prompt]);
  const text = result.response.text(); 
  const htmlContent = marked(text);

  return htmlContent;
};
