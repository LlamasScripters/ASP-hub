import {
	CreateBucketCommand,
	ListBucketsCommand,
	S3Client,
} from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	},
	forcePathStyle: true,
});

export async function createBucketIfNotExists(client: S3Client) {
	const buckets = await client.send(new ListBucketsCommand());
	const isBucketExists =
		Array.isArray(buckets.Buckets) &&
		buckets.Buckets.some((bucket) => bucket.Name === process.env.S3_BUCKET);

	if (!isBucketExists) {
		await client.send(
			new CreateBucketCommand({
				Bucket: process.env.S3_BUCKET,
			}),
		);
	}
}
