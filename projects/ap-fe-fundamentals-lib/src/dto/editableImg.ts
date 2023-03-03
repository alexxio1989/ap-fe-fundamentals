import { ImageDto } from "./imageDto"


export class EditableImg extends ImageDto{
    edit:boolean
    imageChangedEvent: any
    showCropper = false;
}