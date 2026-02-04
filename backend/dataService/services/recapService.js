import recapRepository from "../repo/recapRepository.js";
import { imgbbUploader } from "../../sharedService/upload/imgbbUploader.js";
import githubRecapService from "./githubRecapService.js";

const recapService = {
  async fetchByYear(year) {
    return recapRepository.getByYear(year);
  },

  async refresh(data, file) {
    // Fetch fresh GitHub data using the provided token
    const githubData = await githubRecapService.fetchGitHubRecapData(
      data.username,
      data.githubToken,
      data.year,
    );

    // Handle optional image upload
    let imageUrl = data.imageUrl;
    if (file) {
      const upload = await imgbbUploader(file.buffer, file.originalname);
      imageUrl = upload.url;
    }

    // Save to database with GitHub data as payload
    return recapRepository.upsertByYear(data.year, {
      title: data.title || `${data.username}'s ${data.year} GitHub Recap`,
      payload: githubData,
      imageUrl,
    });
  },

  async purge() {
    return recapRepository.purgeAll();
  },

  async deleteByYear(year) {
    return recapRepository.deleteByYear(year);
  },
};

export default recapService;
