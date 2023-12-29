export const downloadOutput = async (output, name) => {
  // console.log("downloading", output);
  const image = await fetch(output);
  // console.log("image", image);
  const imageBlog = await image.blob();
  // console.log("imageBlog", imageBlog);
  const imageURL = URL.createObjectURL(imageBlog);
  // console.log("imageURL", imageURL);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
