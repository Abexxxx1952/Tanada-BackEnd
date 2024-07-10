import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { CreateSignedUploadUrlResult } from './types/createSignedUploadUrlResult';

@Injectable()
export class ExternalStorageService {
  private supabaseClient: SupabaseClient;
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.supabaseClient = this.createSupabaseClient();
  }

  async createSignedUploadUrl(
    fileName: string,
  ): Promise<CreateSignedUploadUrlResult> {
    try {
      if (!this.extensionCheck(fileName)) {
        throw new Error('Invalid file extension');
      }

      const fileNameWithTimestamp = this.addTimestampToImageName(fileName);

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
    const url = new URL(urlParam);

    const pathnameParts = url.pathname.split('/');

    const fileName: string = pathnameParts
      .slice(pathnameParts.length - 2, pathnameParts.length)
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

  private extensionCheck(fileName: string): boolean {
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
