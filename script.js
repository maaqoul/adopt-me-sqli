import fs from "node:fs";

fs.readFile("./db.json", "utf8", (err, data) => {
  if (err) {
    console.log("error");
  }

  const generateImages = (originalUrl, totalImages) => {
    let additionalImages = [];
    for (let i = 0; i < totalImages; i++) {
      const newUrl = originalUrl.replace(
        /(\d+)(?!.*\d)/,
        (match) => parseInt(match) + i
      );
      additionalImages.push(newUrl);
    }
    return additionalImages;
  };
  const dataSet = JSON.parse(data);

  dataSet.pets.forEach((pet) => {
    const originalImageUrl = pet.image;
    pet.images = generateImages(originalImageUrl, 5);
    delete pet.image;
  });

  const newJson = JSON.stringify(dataSet, null, 2);

  fs.writeFile("./newDb.json", newJson, "utf8", (err) => {
    if (err) console.log(err);
    console.log("file has been saved");
  });
});
