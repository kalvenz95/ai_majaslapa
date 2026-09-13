/** Kopienas tipi — kopīgi serverim un klientam. */

export type CommunityAuthor = {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  joinedAt?: string | Date;
  /** Iegādātā paka — profila plāksnītei */
  plan?: string | null;
  isStaff?: boolean;
};

export type CommunityMedia = {
  id?: string;
  type: "IMAGE" | "VIDEO" | "LINK";
  url: string;
  thumbnailUrl?: string | null;
  title?: string | null;
  description?: string | null;
};

export type CommunityPost = {
  id: string;
  title: string;
  body: string;
  category: string;
  pinned: boolean;
  isAnnouncement: boolean;
  createdAt: string | Date;
  editedAt?: string | Date | null;
  author: CommunityAuthor;
  media: CommunityMedia[];
  likeCount: number;
  commentCount: number;
  liked: boolean;
  saved: boolean;
};

export type CommunityComment = {
  id: string;
  body: string;
  parentId: string | null;
  createdAt: string | Date;
  editedAt?: string | Date | null;
  author: CommunityAuthor;
};

export type CommunityCategoryDef = {
  slug: string;
  label: string;
  emoji: string;
  color: string;
  order: number;
  adminOnly: boolean;
  hint?: string;
};

/** Pašreizējais skatītājs — tikai tas, kas drīkst nonākt klientā. */
export type CommunityMe = {
  id: string;
  name: string;
  avatarUrl: string | null;
  isStaff: boolean;
  canPost: boolean;
  restrictedReason: string | null;
  plan: string | null;
};
