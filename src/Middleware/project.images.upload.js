import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/Media/images')
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, uniqueSuffix + "." + file.mimetype.split("/")[1])
	}
})

const fileFilter = (req, file, cb) => {
	if ((file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg" || file.mimetype == "image/webp") && file) {
		cb(null, true);
	} else {
		return cb(new Error('Invalid mime type. Try to upload png, jpg, jpeg, svg or webp file'));
	}
}

const upload = multer({ storage: storage, fileFilter: fileFilter }).array('images');

// Get Project Image and upload
const fileHandle = ((req, res, next) => {
	if ((req.files && req.files[0]) || (req.method == "PUT" && req.files && req.files[0])) {
		const pImagesLink = [];

		// Get Uploaded Images Path
		req.files.map((file) => {
			pImagesLink.push({
				name: file.filename,
				originalName: file.originalname,
				preview: `${process.env.App_Rest_Api_Url}/images/${file.filename}`,
				size: file.size,
				type: file.mimetype
			})
		})

		req.imagesLink = pImagesLink;

		next();
	} else if (req.method == "PUT") {
		next();
	} else if (req.method == "POST") {
		res.status(400).send({
			"error": "You must have to upload project images !"
		})
	}
});


export { fileHandle, upload };

