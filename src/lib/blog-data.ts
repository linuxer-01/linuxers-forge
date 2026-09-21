import founderStory from "@/assets/founder-story.jpg";
import linuxWorkshop from "@/assets/linux-workshop.jpg";
import linuxersLab from "@/assets/linuxers-lab.jpg";
import roboticsStory from "@/assets/robotics-story.jpg";

export const categories = ["All", "Startups", "Deep Tech", "Linux", "Campus Ventures", "Case Studies", "Events"];

export const posts = [
  {
    slug: "campus-innovation",
    title: "The Architecture of Campus-Led Innovation Units",
    excerpt: "How small, decentralized student teams turn technical curiosity into ventures built for the real world.",
    category: "Deep Tech",
    author: "Aarav Menon",
    date: "18 Sep 2026",
    readTime: "12 min read",
    image: linuxersLab,
    featured: true,
  },
  {
    slug: "robotics-prototype",
    title: "From Breadboard to Field Test in Four Weeks",
    excerpt: "A candid field log from the team behind an affordable indoor navigation robot.",
    category: "Campus Ventures",
    author: "Diya Nair",
    date: "14 Sep 2026",
    readTime: "8 min read",
    image: roboticsStory,
  },
  {
    slug: "linux-workshop",
    title: "Why Open Source Is a Founder’s Unfair Advantage",
    excerpt: "The tools, communities, and habits helping first-time builders move with confidence.",
    category: "Linux",
    author: "Rohan Iyer",
    date: "09 Sep 2026",
    readTime: "7 min read",
    image: linuxWorkshop,
  },
  {
    slug: "founder-discovery",
    title: "A Better First Question Than ‘What Should We Build?’",
    excerpt: "Five days of customer discovery changed the direction of a campus hardware team.",
    category: "Startups",
    author: "Meera Joseph",
    date: "02 Sep 2026",
    readTime: "9 min read",
    image: founderStory,
  },
  {
    slug: "signal-not-noise",
    title: "Signal, Not Noise: Our Demo Day Selection Framework",
    excerpt: "A practical scorecard for identifying clear thinking, genuine insight, and founder velocity.",
    category: "Case Studies",
    author: "Linuxers Editorial",
    date: "28 Aug 2026",
    readTime: "6 min read",
    image: linuxersLab,
  },
  {
    slug: "build-night",
    title: "Inside Build Night: 70 Makers, One Relentless Evening",
    excerpt: "People, prototypes, and the productive chaos of our largest community build yet.",
    category: "Events",
    author: "Nikhil Das",
    date: "20 Aug 2026",
    readTime: "5 min read",
    image: linuxWorkshop,
  },
];
