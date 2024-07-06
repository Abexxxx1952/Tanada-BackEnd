export class UpdateResult {
  raw: any;

  affected?: number;

  generatedMaps: {
    [key: string]: any;
  }[];
}
