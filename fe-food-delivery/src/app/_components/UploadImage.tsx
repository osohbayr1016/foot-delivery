export const UploadImage = async (file: File) => {
  if (!file) {
    return null;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_present", "FoodDelivery");

  try {
    const response = await fetch(
      " https://api.cloudinary.com/v1_1/djvjsyzgw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    return result.secure_url;
  } catch (error: unknown) {
    return { error: "Failed to upload image" };
  }
};
