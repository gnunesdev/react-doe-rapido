export const CompanyNeedsMap = {
  1: 'Roupas',
  2: 'Higiene pessoal',
  3: 'Alimentos',
  4: 'Brinquedos',
};

export type CompanyValueType<CompanyNeedsMap> = CompanyNeedsMap[keyof CompanyNeedsMap];
