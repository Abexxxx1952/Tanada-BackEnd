import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

export type CreateSignedUploadUrlResult =
  | {
      data: { signedUrl: string; token: string; path: string };
      error: null;
    }
  | {
      data: null;
      error: Error;
    };
@Injectable()
export class ExternalStorageService {
  private supabaseClient = this.createSupabaseClient();
  constructor(private readonly configService: ConfigService) {}

  async createSignedUploadUrl(
    fileName: string,
  ): Promise<CreateSignedUploadUrlResult> {
    try {
      if (!this.extensionСheck(fileName)) {
        throw new Error('Invalid file extension');
      }

      const fileNameWithTimestamp = this.addTimestampToImageName(fileName);

      if (!this.supabaseClient) {
        this.supabaseClient = this.createSupabaseClient();
      }

      const { data, error }: CreateSignedUploadUrlResult =
        await this.supabaseClient.storage
          .from(this.configService.getOrThrow<string>('SUPABASE_BUCKET_NAME'))
          .createSignedUploadUrl(
            `${this.configService.getOrThrow<string>(
              'SUPABASE_BUCKET_FOLDER',
            )}/${fileNameWithTimestamp}`,
          );

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      throw err;
    }
  }

  async deletePhoto(urlParam: string): Promise<string> {
    if (!this.supabaseClient) {
      this.supabaseClient = this.createSupabaseClient();
    }
    const url = new URL(urlParam);
    const pathnameParts = url.pathname.split('/');
    const fileName: string = pathnameParts
      .slice(pathnameParts.length - 2, pathnameParts.length - 1)
      .join('/');

    try {
      const { data, error } = await this.supabaseClient.storage
        .from(this.configService.getOrThrow<string>('SUPABASE_BUCKET_NAME'))
        .remove([fileName]);

      if (error) {
        throw error;
      }
      return 'DELETED';
    } catch (err) {
      throw err;
    }
  }

  private createSupabaseClient(): SupabaseClient {
    return createClient(
      this.configService.getOrThrow<string>('SUPABASE_URL'),
      this.configService.getOrThrow<string>('SUPABASE_KEY'),
    );
  }

  private extensionСheck(fileName: string): boolean {
    const extension = fileName.split('.').pop();
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.svg',
      '.webp',
    ];

    return imageExtensions.includes(`.${extension}`);
  }
  private addTimestampToImageName(fileName: string): string {
    const timestamp = new Date().getTime();

    const [name, extension] = fileName.split('.');

    return timestamp + '_' + name + '.' + extension;
  }
}
