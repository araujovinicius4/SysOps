import { useApp } from "./useApp";
export function useProfessional() {
  const {
    professionalRecords,
    saveProfessionalRecord,
    deleteProfessionalRecord,
  } = useApp();
  return {
    records: professionalRecords,
    save: saveProfessionalRecord,
    remove: deleteProfessionalRecord,
  };
}
