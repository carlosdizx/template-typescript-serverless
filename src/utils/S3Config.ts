import AWS from "aws-sdk";
const s3 = new AWS.S3();
const bucketName = process.env.AWS_BUCKET_NAME;

export const upload = async (params: any) =>
{
    console.time("Upload File");
    return await s3.upload({...params, Bucket: bucketName }).promise();
}
