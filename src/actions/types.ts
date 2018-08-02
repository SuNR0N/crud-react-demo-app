export type FunctionType = (...args: any[]) => any;
export interface IActionCreatorsMapObject { 
  [actionCreator: string]: FunctionType;
}

export type ActionsUnion<A extends IActionCreatorsMapObject> = ReturnType<A[keyof A]>; 