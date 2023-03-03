import { CoreDto } from "./core/coreDto";

export class TokenDto extends CoreDto{
    accessToken:string;
    tokenType:string;
    expiresInSeconds:number;
    refreshToken:string;
    scope:string;
    dateCreation:Date;
    dateExiration:Date;
    provider:string;
}