export type scanType = {
  foodId: string;
  label: string;
  nutrients: {
    ENERC_KCAL: number;
    FAT: number;
    SUGAR: number;
    PROCNT: number;
  };
  date: string;
  userId: string;
};
