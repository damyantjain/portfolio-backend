import * as dao from "./dao.js";

export default function AnalyticsRoutes(app) {
  const updateHomeVisitorCount = async (req, res) => {
    try {
      const response = await dao.updateHomeVisitorCount();
      if (response) {
        res.status(200).send("Visitor count updated");
      } else {
        res.status(500).send("Error updating visitor count");
      }
    } catch (error) {
      console.error("Error updating home visitor count:", error);
      res.status(500).send("Error updating visitor count");
    }
  };

  const updateBlogVisitorCount = async (req, res) => {
    try {
      const response = await dao.updateBlogVisitorCount();
      if (response) {
        res.status(200).send("Visitor count updated");
      } else {
        res.status(500).send("Error updating visitor count");
      }
    } catch (error) {
      console.error("Error updating blog visitor count:", error);
      res.status(500).send("Error updating visitor count");
    }
  };

  app.post("/api/analytics/home-visitor-count", updateHomeVisitorCount);
  app.post("/api/analytics/blog-visitor-count", updateBlogVisitorCount);
}
