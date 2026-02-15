require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("./models/Event");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  await Event.deleteMany();

  const user = await User.findOne();

  await Event.insertMany([
    {
      name: "Tech Innovation Summit 2026",
      organizer: "Bellcorp",
      location: "New York",
      date: new Date("2026-04-20"),
      description: "A future-focused innovation summit.",
      capacity: 200,
      category: "Conference",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      createdBy: user._id
    },
    {
      name: "AI & Web Workshop",
      organizer: "Bellcorp Labs",
      location: "San Francisco",
      date: new Date("2026-03-10"),
      description: "Hands-on AI integration workshop.",
      capacity: 100,
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      createdBy: user._id
    },
    {
      name: "Global AI & Automation Expo 2026",
      organizer: "Bellcorp",
      location: "San Francisco",
      date: new Date("2026-06-15"),
      description: "An international expo showcasing cutting-edge AI and automation technologies.",
      capacity: 500,
      category: "Expo",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      createdBy: user._id
    },
    {
      name: "Creative Media Festival 2026",
      organizer: "Bellcorp",
      location: "London",
      date: new Date("2026-09-10"),
      description: "A festival celebrating innovation in film, design, and digital storytelling.",
      capacity: 300,
      category: "Festival",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      createdBy: user._id
    }
  ]);

  console.log("Seeded successfully!");
  process.exit();
};

seed();
