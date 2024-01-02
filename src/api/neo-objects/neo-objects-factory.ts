export const neoObjectsFactory = {
  neoObjects: ['neo-objects'],
  neoObjectById: (id: string) => [...neoObjectsFactory.neoObjects, id],
} as const;
