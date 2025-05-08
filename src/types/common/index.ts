import type { IconType } from "@react-icons/all-files";

export interface ApiFetchOptions {
  cookie?: string;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export interface PagenationParams {
  limit?: number;
  offset?: number;
}

export interface EmojiCatgories {
  emoji: string;
  text: string;
}

export interface NavTypes {
  Icon: IconType;
  href: string;
  text: string;
}
