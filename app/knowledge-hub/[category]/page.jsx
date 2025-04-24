const categories = {
  "Mindfulness & Self-Awareness":
    "Discover practices to cultivate present-moment awareness and deeper self-understanding.",
  "Mental Resilience & Regulation": "Build mental strength and learn techniques to regulate thoughts and emotions.",
  "Body & Nervous System": "Explore the mind-body connection and somatic practices for wellbeing.",
  "Wisdom & Philosophy": "Delve into timeless wisdom traditions and philosophical insights for modern life.",
  "Daily Practices & Tools": "Practical techniques and tools to integrate mindfulness into everyday living.",
  "Emotions & Inner Patterns": "Understand emotional intelligence and transform limiting patterns.",
  "Integration & Alignment": "Bring all aspects of your practice together for wholeness and purpose.",
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category: category.replace(/ & /g, " and ").replace(/ /g, "-"),
  }))
}

import CategoryPageWrapperClient from "./CategoryPageWrapperClient"

export default function CategoryPageWrapper({ params }) {
  return <CategoryPageWrapperClient params={params} />
}
