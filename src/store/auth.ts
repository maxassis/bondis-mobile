import { create } from 'zustand'

type tokenExistsType = {
  token: string
  setToken: (tk: string) => void
  removeToken: () => void
}


const tokenExists = create<tokenExistsType>((set) => ({
  token: "",
  setToken: (tk: string) => set({ token: tk }),
  removeToken: () => set({ token: "" }),
}))

export default tokenExists