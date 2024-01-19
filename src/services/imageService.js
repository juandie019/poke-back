const api = require("../api");

const fetchImage = async (src) => {
  const image = await api.get(src, {
    responseType: "arraybuffer",
  });

  return image.data;
};

module.exports = {
  fetchImage,
};
