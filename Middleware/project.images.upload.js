const multer = require('multer');
const path = require('path');
const { Api_Url } = require('../config');
const { unlink } = require('node:fs');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './Media/images')
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		const fileNameArr = file.originalname.split(".");
		const extention = fileNameArr[fileNameArr.length - 1];

		cb(null, uniqueSuffix + "." + extention)
	}
})

const fileFilter = (req, file, cb) => {
	if ((file.mimetype.match(/image\//g)) && file) {
		cb(null, true);
	} else {
		return cb("Invalid mime type. Try to upload png, jpg, jpeg, svg or webp file");
	}
}

const upload = multer({ storage: storage, fileFilter: fileFilter }).array('images');

// Get Project Image and upload
const fileHandle = ((req, res, next) => {
	if ((req.files && req.files[0]) || (req.method == "PUT" && req.files && req.files[0])) {
		const pImagesLink = [];

		// Get Uploaded Images Path
		req.files.map((file) => {
			const fileNameArr = file.originalname.split(".");
			const fileName = file.filename.split(".")[0];
			const fileExtention = fileNameArr[fileNameArr.length - 1];

			const convertapi = require('convertapi')('UcWX4Kk3NgiIpUiK');

			convertapi.convert('svg', {
				File: `${path.join(__dirname, '..', 'Media/images/')}${file.filename}`,
				FileName: fileName
			}, fileExtention).then(function (result) {
				result.saveFiles(`${path.join(__dirname, '..', 'Media/images')}`);

				pImagesLink.push({
					name: file.filename,
					originalName: file.originalname,
					preview: `${process.env.App_Rest_Api_Url}/images/${fileName}.svg`,
					size: file.size,
					type: file.mimetype
				})

				// After converting user uploaded image into svg delete user uploaded image
				unlink(`${path.join(__dirname, '..', 'Media/images/')}${file.filename}`, (err) => {
					if (err) console.log(`Error occured when deleting ${file.filename} !!`);
					console.log(`${file.filename} is deleted`);
				});

				req.imagesLink = pImagesLink;

				next();
			});
		})

	} else if (req.method == "PUT") {
		next();
	} else if (req.method == "POST") {
		res.status(400).send({
			"error": "You must have to upload project images !"
		})
	}
});


module.exports = { fileHandle, upload };

