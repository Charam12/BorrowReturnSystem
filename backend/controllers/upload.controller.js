const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `${process.env.UPLOAD_PATH}`);
  },
  filename: function (req, file, callback) {
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const basename = path.basename(originalname, extension);
    
    const uniqueFilename = `${basename}-${Date.now()}${extension}`;
    
    const filePath = path.join(`${process.env.UPLOAD_PATH}`, uniqueFilename);
    if (fs.existsSync(filePath)) {
      callback(null, `${basename}-${Date.now()}${extension}`);
    } else {
      callback(null, uniqueFilename);
    }
  },
});

const upload = multer({ storage });

const uploadController = (req, res) => {
  upload.single('file')(req, res, (err) => {

    if (err) {
      console.error('Error uploading file:', err);
      return res.json({ status: 'error', message: 'File upload failed' });
    }

    if (req.file) {
      const img_path = req.file.path;
      const parts = img_path.split('\\');
      const filename = parts[parts.length - 1];

      res.json(filename);
    } else {
      res.json({ status: 'error', message: 'No file uploaded' });
    }
  })
}

module.exports = { upload, uploadController }