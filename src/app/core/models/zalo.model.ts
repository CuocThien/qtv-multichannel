interface ZaloBody {
  type: string;
  content: string;
}

interface ZaloCover {
  cover_type: string;
  photo_url: string;
  status: string;
}

export interface ZaloPost {
  id: string;
  type: string;
  title: string;
  author: string;
  cover: ZaloCover;
  description: string;
  status: string;
  body: ZaloBody[];
  related_medias: [];
  comment: string;
  cite: object;
  link_view: string;
}
