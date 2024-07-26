interface AttachmentItem {
  media: {
    image: {
      height: number;
      src: string;
      width: number;
    };
  };
  type: string;
}

interface Attachments {
  data: AttachmentItem[];
}

export interface FacebookPost {
  id: string;
  message: string;
  attachments: Attachments;
  permalink_url: string;
}

export interface FacebookComment {
  created_time: string;
  message: string;
  id: string;
}

export interface FacebookReact {
  type: string;
  count: number;
}
