import * as multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, transformFileNames(file.originalname));
  },
});

const transformFileNames = (file) => {
  file = file.replace(/[^a-zA-Z0-9.]/g, "_");

  file = file.toLowerCase();

  //add timestamp
  file = `${Date.now()}-${file}`;

  return file;
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });

export default uploads;
