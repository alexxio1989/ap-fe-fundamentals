import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageDto } from '../dto/imageDto';
import { EditableImg } from '../dto/editableImg';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { defaultImg } from './default-img';

@Component({
  selector: 'app-images-editor',
  templateUrl: './images-editor.component.html',
  styleUrls: ['./images-editor.component.scss'],
})
export class ImagesEditorComponent implements OnInit {

  @Input() images: ImageDto[] = [];
  @Output() imagesEmitter = new EventEmitter<ImageDto[]>();
  imagesEditable: EditableImg[] = [];
  
  imgSelected: ImageDto;
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  edited = false;

  constructor() {}

  ngOnInit(): void {
    this.images.forEach(element => {
      let editdableImg = new EditableImg()
      editdableImg.id = element.id
      editdableImg.base64 = element.base64
      editdableImg.url = element.url
      this.imagesEditable.push(editdableImg)
    });
  }

  set(){
    this.imagesEditable = []
    this.images.forEach(element => {
      let editdableImg = new EditableImg()
      editdableImg.id = element.id
      editdableImg.base64 = element.base64
      editdableImg.url = element.url
      editdableImg.edit = false;
      editdableImg.showCropper = false;
      this.imagesEditable.push(editdableImg)
    });
  }

  fileChangeEvent(event: any , img:EditableImg): void {
    img.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent , img:EditableImg) {
    img.base64 = event.base64;
    console.log(event, base64ToFile(event.base64));
  }

  imageLoaded(img:EditableImg) {
    img.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions , img:EditableImg) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  addAction() {
    let newImg = new EditableImg()
    newImg.base64 = defaultImg.emptyImg;
    let id = ''+this.imagesEditable ? this.imagesEditable.length + 1 : 1;
    newImg.id = 'TEMP_0' + id;
    this.imagesEditable.push(newImg)
  }

  removeAction(imgRemoved:EditableImg){
    let filtred = this.imagesEditable.filter(img => img.id !== imgRemoved.id);
    this.imagesEditable = filtred
    this.emit()
  }

  emit() {
    let newImagesArray :ImageDto[] = []
    this.edited = false;
    this.imagesEditable.forEach(element => {
      let img = new ImageDto()
      img.id = element.id.startsWith('TEMP') ? null : element.id
      img.base64 = element.base64
      img.url = element.url
      newImagesArray.push(img)
    });
    //this.set()
    this.imagesEmitter.emit(newImagesArray);
  }
}
