import { User } from "@clerk/nextjs/dist/api";

declare module "@clerk/nextjs/dist/api" {
  interface User {
    mapToClientUserType(): {
      id: string;
      username: string;
      profileImageUrl: string;
    };
  }
}

User.prototype.mapToClientUserType = function () {
  return {
    id: this.id,
    username: this.username!,
    profileImageUrl: this.profileImageUrl,
  };
};
