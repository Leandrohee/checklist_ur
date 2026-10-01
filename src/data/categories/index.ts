import { ChecklistCategory } from "@/types/checklist";

import bolsaDeTrauma from "./01-bolsa-de-trauma.json";
import bolsaDeClinico from "./02-bolsa-de-clinico.json";
import maletaDeSinaisVitais from "./03-maleta-de-sinais-vitais.json";
import bolsaO2 from "./04-bolsa-o2.json";
import balcaoDaUr from "./05-balcao-da-ur.json";
import gaveta1 from "./06-gaveta-1.json";
import gaveta2 from "./07-gaveta-2.json";
import compartimentoSuperiorAberto from "./08-compartimento-superior-aberto.json";
import compartimentoSuperiorFechado from "./09-compartimento-superior-fechado.json";
import compartimentoEmbaixoBanco from "./10-compartimento-embaixo-banco.json";

export const checklistCategories: ChecklistCategory[] = [
  bolsaDeTrauma as ChecklistCategory,
  bolsaDeClinico as ChecklistCategory,
  maletaDeSinaisVitais as ChecklistCategory,
  bolsaO2 as ChecklistCategory,
  balcaoDaUr as ChecklistCategory,
  gaveta1 as ChecklistCategory,
  gaveta2 as ChecklistCategory,
  compartimentoSuperiorAberto as ChecklistCategory,
  compartimentoSuperiorFechado as ChecklistCategory,
  compartimentoEmbaixoBanco as ChecklistCategory,
];
