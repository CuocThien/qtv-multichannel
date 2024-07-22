export interface Post {
  id: string;
  isDeleted: number;
  photoUrl: string | null;
  cover: string | null;
  description: string;
  content: string;
  title: string;
  scheduleAt: Date | null;
  isCreateNow: number;
  isFacebook: number;
  isInstagram: number;
  isZalo: number;
  facebookPostId: string | null;
  instagramPostId: string | null;
  zaloPostId: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  createdBy: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
}
