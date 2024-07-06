export type CreateSignedUploadUrlResult =
  | {
      data: { signedUrl: string; token: string; path: string };
      error: null;
    }
  | {
      data: null;
      error: Error;
    };
