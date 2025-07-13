export function stripNonCloneable(action: any): any {
   const { meta, ...rest } = action;

   return {
      ...rest,
      meta: {
         ...meta,
         baseQueryMeta: {
            ...meta?.baseQueryMeta,
            request: undefined, // 💥 удаляем несериализуемые
            response: undefined, // 💥
         },
      },
   };
}
