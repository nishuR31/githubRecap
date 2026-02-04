import dataClient from "../src/prisma.js";

const recapRepository = {
  async getByYear(year) {
    return dataClient.recapData.findUnique({
      where: { year },
    });
  },

  async upsertByYear(year, data) {
    return dataClient.recapData.upsert({
      where: { year },
      update: data,
      create: { year, ...data },
    });
  },

  async deleteByYear(year) {
    return dataClient.recapData.delete({
      where: { year },
    });
  },

  async purgeAll() {
    return dataClient.recapData.deleteMany({});
  },
};

export default recapRepository;
