export function gcsToHttps(gcsUri: string): string {
  if (!gcsUri || !gcsUri.startsWith('gs://')) {
    return gcsUri;
  }
  const bucketName = gcsUri.split('/')[2];
  const objectName = gcsUri.split('/').slice(3).join('/');
  return `https://storage.googleapis.com/${bucketName}/${objectName}`;
}