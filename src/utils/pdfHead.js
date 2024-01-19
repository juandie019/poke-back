const getPdfHead = (contentLength, fileName) => {
  return {
    "Content-Length": contentLength,
    "Content-Type": "application/pdf",
    "Content-disposition": `attachment;filename=${fileName}.pdf`,
  };
};

module.exports = {
  getPdfHead,
};
