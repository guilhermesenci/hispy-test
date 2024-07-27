import supabase from "@/lib/supabaseClient";

export interface Investigation {
  id: number;
  nome: string;
  descricao: string;
  link: string;
  created_at: string;
}

export const getAllInvestigationData = async (): Promise<Investigation[]> => {
  try {
    const { data, error } = await supabase
      .from("investigacoes")
      .select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error)
    return []
  }
};
