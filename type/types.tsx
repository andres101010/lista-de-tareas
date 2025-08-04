import { Tareas } from "@/interface/interface"

// archivo: types/title.ts
export type TitleProp = string

export type IdProp = {
  id: string
}


export type Props = {
  params: Promise<{
    id: string;
  }>;
};


export type NewTarea = Pick<Tareas, "date" | "content" | "link">;
