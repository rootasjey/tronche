export const db = {
  transaction: async () => {},
  select: () => ({ from: () => ({ where: () => ({ get: async () => null }) }) }),
  insert: () => ({ values: () => ({ onConflictDoUpdate: () => ({ run: async () => {} }) }) }),
};
