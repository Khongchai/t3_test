import { User } from "@clerk/nextjs/dist/api";

declare module "@clerk/nextjs/dist/api" {
  interface User {
    filterUserForClient(): {
      id: string;
      username: string;
      profileImageUrl: string;
    };
  }
}

User.prototype.filterUserForClient = function () {
  return {
    id: this.id,
    username: this.username!,
    profileImageUrl: this.profileImageUrl,
  };
};
