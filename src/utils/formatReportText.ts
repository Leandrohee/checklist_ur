import { ChecklistCategory, ChecklistState } from "@/types/checklist";
import { getItemList } from "@/services/checklist/getItemList";
import { calculateOverallProgress } from "@/services/checklist/calculateOverallProgress";

/**
 * Gera um relatório textual detalhado da conferência da viatura UR,
 * destacando itens pendentes para reposição imediata.
 */
export function formatReportText(
  categories: ChecklistCategory[],
  state: ChecklistState
): string {
  const progress = calculateOverallProgress(categories, state);
  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR");
  const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  let report = `========================================\n`;
  report += `RELATÓRIO DE CONFERÊNCIA DA UR\n`;
  report += `Data: ${dateStr} às ${timeStr}\n`;
  report += `Status Geral: ${progress.checked}/${progress.total} itens conferidos (${progress.percentage}%)\n`;
  report += `Situação da Viatura: ${progress.isComplete ? "PRONTA PARA ATENDIMENTO" : "PENDENTE DE REPOSIÇÃO"}\n`;
  report += `========================================\n\n`;

  const missingByCategory: { categoryTitle: string; items: { name: string; quantity: number | string }[] }[] = [];

  categories.forEach((cat) => {
    const items = getItemList(cat);
    const missing = items.filter((item) => !state[item.id]);
    if (missing.length > 0) {
      missingByCategory.push({
        categoryTitle: cat.title,
        items: missing.map((i) => ({ name: i.name, quantity: i.quantity })),
      });
    }
  });

  if (missingByCategory.length === 0) {
    report += `TODOS OS MATERIAIS FORAM CONFERIDOS COM SUCESSO!\n`;
  } else {
    report += `ITENS FALTANTES / PENDENTES:\n\n`;
    missingByCategory.forEach((catGroup) => {
      report += `[${catGroup.categoryTitle}]\n`;
      catGroup.items.forEach((item) => {
        report += ` - (Qtd: ${item.quantity}) ${item.name}\n`;
      });
      report += `\n`;
    });
  }

  report += `========================================\n`;
  return report;
}
