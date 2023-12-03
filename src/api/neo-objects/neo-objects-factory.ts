export const neoObjectsFactory = {
  neoObjects: ['neo-objects'],
  neoObjectById: (id: number) => [...neoObjectsFactory.neoObjects, id],
} as const;
