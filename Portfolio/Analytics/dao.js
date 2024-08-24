import model from "./model.js";

export const updateHomeVisitorCount = async () => {
  try {
    const analytics = await model.findOne({ name: "visitorCount" });
    if (analytics) {
      analytics.home += 1;
      return await analytics.save();
    } else {
      console.error("Analytics document for 'home' not found");
    }
  } catch (error) {
    console.error("Error updating home visitor count:", error);
  }
}

export const updateBlogVisitorCount = async () => {
  try {
    const analytics = await model.findOne({ name: "visitorCount" });
    if (analytics) {
      analytics.blog += 1;
      return await analytics.save();
    } else {
      console.error("Analytics document for 'blog' not found");
    }
  } catch (error) {
    console.error("Error updating blog visitor count:", error);
  }
}