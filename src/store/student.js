import { create } from "zustand";
import { persist } from "zustand/middleware";


const studentStore = create(persist((set) => ({
   student:null,
   token:null,
   login:(student ,token) => {
    set({
        student,
        token
    })
   },
   logOut: () => {
    set({
        student:null,
        token:null
    })
   }

}),{
    name:"use-store"
}))

export default studentStore;
export const authToken = studentStore.getState().token;