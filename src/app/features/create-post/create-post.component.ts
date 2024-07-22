import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostService } from '../../core/services';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  // public Editor = ClassicEditor;
  // editorConfig: any;
  // editorData: string = '';
  postForm: FormGroup;
  fileList: NzUploadFile[] = [];
  imagePreview: string | null =
    'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
  cover: string | null = null;
  images: string[] = [];
  isSchedulePost = false;
  scheduleAt: Date | null = null;

  disabledDate = (current: Date): boolean => {
    // Can not select days before today
    const previousDate = moment().subtract(1, 'days').endOf('day').toDate();
    return current && current < previousDate;
  };

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private readonly postService: PostService,
    private router: Router,
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required]],
      cover: [null],
      photoUrls: [null],
      photoUrl: [null],
      isFacebook: [false],
      isInstagram: [false],
      isZalo: [false],
      isCreateNow: [true],
      scheduleAt: [null],
    });
    // this.editorConfig = {
    //   ckfinder: {
    //     uploadUrl: `${API_URL}/upload`, // Replace with your image upload URL
    //   },
    //   toolbar: ['imageUpload'],
    //   height: 300,
    // };
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('files', file, file.name);
      this.postService.uploadImages(formData).subscribe(
        (response) => {
          if (response) {
            this.imagePreview = response?.data?.url[0];
            this.cover = this.imagePreview;
          }
        },
        (error) => {
          console.log('🐼 => CreatePostComponent => error:', error);
        },
      );
    }
  }

  onFilesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = Array.from(input.files);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file, file.name);
      });
      this.postService.uploadImages(formData).subscribe(
        (response) => {
          if (response) {
            this.images = response?.data?.url;
          }
        },
        (error) => {
          console.log('🐼 => CreatePostComponent => error:', error);
        },
      );
    }
  }

  changeSchedulePost() {
    this.isSchedulePost = !this.isSchedulePost;
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.postForm.patchValue({
        cover: this.imagePreview,
        photoUrls: this.images,
        photoUrl: this.images[0],
        isCreateNow: !this.isSchedulePost,
      });
      this.postService.createPost(this.postForm.value).subscribe(
        (response: any) => {
          if (response) {
            this.msg.success(response.data.message);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.msg.error(error.error.message);
        },
      );
      console.log('Form Submitted!');
      // Handle form submission, e.g., send data to the server
    } else {
      this.msg.error('Please fill out the form correctly.');
    }
  }
}
