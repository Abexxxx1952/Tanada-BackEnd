export class CreateSignedUploadUrlResultData {
  signedUrl: string;

  token: string;

  path: string;
}

export class CreateSignedUploadUrlResult {
  data: CreateSignedUploadUrlResultData | null;

  error: null | Error;
}
