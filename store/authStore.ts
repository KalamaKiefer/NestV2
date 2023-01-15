import create from "zustand";
import axios from "axios";
import { persist, devtools } from "zustand/middleware";
import { userProps } from "../utils/types";

interface StoreProps {
  userProfile: userProps | null;
  uploadPage: boolean;
  addUser: (user: userProps) => void;
  removeUser: () => void;
  setUploadPage: (value: boolean) => void;
}

const useAuthStore = create<StoreProps>()(
  devtools(
    persist((set) => ({
      userProfile: null,
      uploadPage: false,

      addUser: (user: userProps) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),
      setUploadPage: (value: boolean) => set({ uploadPage: value }),
    }))
  )
);

export default useAuthStore;
