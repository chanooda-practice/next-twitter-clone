import { Twit, User } from "@prisma/client";

export interface defaultResponse<T = undefined> {
  ok: boolean;
  data?: T;
}

export interface TwitResponse extends Twit {
  user: User;
  isLike: boolean;
}

export interface TwitsResponse extends Twit {
  user: User;
  _count: {
    Like: number;
  };
}
