"use server";
import { useSupabaseServer } from "@/supabase/server";
import { TClassDatesRow } from "./types";

export async function readClasses() {
  const server = await useSupabaseServer();
  const { data, error } = await server.from("classes").select("*");
  if (error) throw error;
  return data;
}

export async function readClassDatesByClassId(classId: string) {
  const server = await useSupabaseServer();
  const { data, error } = await server
    .from("classDates")
    .select("*")
    .eq("classId", classId);
  if (error) throw error;
  const sortedData = data.sort((a: TClassDatesRow, b: TClassDatesRow) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return sortedData as TClassDatesRow[];
}
