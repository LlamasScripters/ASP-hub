import multer from "multer";
import multerS3 from "multer-s3";
import { createBucketIfNotExists, s3Client } from "./s3.js";

export const upload = async ({
	key,
	validMimeTypes,
}: {
	key: string;
	validMimeTypes: string[];
}) => {
	const { bucketName } = await createBucketIfNotExists({
		client: s3Client,
		bucketName: process.env.S3_BUCKET,
	});

	return multer({
		storage: multerS3({
			s3: s3Client,
			bucket: bucketName,
			key: (_req, _file, cb) => {
				cb(null, key);
			},
			contentType: (req, file, cb) => {
				if (!validMimeTypes.includes(file.mimetype)) {
					cb(new Error("Invalid mime type"));
					return;
				}

				cb(null, file.mimetype);
			},
			contentDisposition: (req, file, cb) => {
				cb(null, "inline");
			},
		}),
	});
};
