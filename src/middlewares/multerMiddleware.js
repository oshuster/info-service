import multer from "multer";

export const upload = multer({
  dest: "uploads/", // Директорія для збереження файлів
  limits: { fileSize: 5 * 1024 * 1024 }, // Максимальний розмір файлу: 5MB
});
