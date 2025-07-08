import type { S3Client } from "@aws-sdk/client-s3";
import { createBucketIfNotExists } from "./lib/s3.js";

export async function init({ s3Client }: { s3Client: S3Client }) {
	await createBucketIfNotExists({
		client: s3Client,
		bucketName: process.env.S3_BUCKET,
	});
}
