import axios from "axios";

export const uploadFile = async (
  file: File,
  onProgress: (percent: number) => void
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("http://localhost:3000/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      const percent = Math.round((event.loaded * 100) / (event.total || 1));
      onProgress(percent);
    },
  });

  return response.data.downloadUrl;
};
