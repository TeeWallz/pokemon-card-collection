import React from "react";
import { User, userClass } from "./pages/user/User.type";
import { Collection, collectionClass } from "./pages/collection/Collection.type";

// Users
export interface PostsContextData {
  user: User;
  updateUser: (user: User) => void;
}

export const postsContextDefaultValue: PostsContextData = {
  user: userClass,
  updateUser: () => null,
};

export const PostsContext = React.createContext<PostsContextData>(
  postsContextDefaultValue
);

export interface CollectionsContextData {
  collection: Collection;
  updateCollection: (collection: Collection) => void;
}

export const collectionsContextDefaultValue: CollectionsContextData = {
  collection: collectionClass,
  updateCollection: () => null,
};

export const CollectionsContext = React.createContext<CollectionsContextData>(
  collectionsContextDefaultValue
);
