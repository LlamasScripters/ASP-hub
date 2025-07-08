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

export async function createBucketIfNotExists({
	client,
	bucketName,
}: {
	client: S3Client;
	bucketName: string;
}) {
	const buckets = await client.send(new ListBucketsCommand());
	const bucket = buckets.Buckets?.find((bucket) => bucket.Name === bucketName);

	if (bucket) {
		return {
			bucketName,
		};
	}

	await client.send(
		new CreateBucketCommand({
			Bucket: bucketName,
		}),
	);

	return {
		bucketName,
	};
}
