import AWS from 'aws-sdk'

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KYE!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
})

export const Uploader = async (
  file: any,
  id: number | undefined,
  folderName: string,
) => {
  const { filename, createReadStream } = await file
  const Filename = `${folderName}/${id}-${Date.now()}-${filename}`
  const readStream = createReadStream()
  const FILE = await new AWS.S3()
    .upload({
      Bucket: 'imran-instalclone-bucket',
      Key: Filename,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise()
  return FILE.Location
}
