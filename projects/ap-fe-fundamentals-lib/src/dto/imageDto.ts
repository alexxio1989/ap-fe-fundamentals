import { CoreDto } from "./core/coreDto";

export class ImageDto extends CoreDto{
    url:string;
    base64?: string | null;
}