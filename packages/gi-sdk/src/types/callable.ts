/**
 * 可回调值
 */
export type CallableValue<Returns, Param = Returns> = Returns | ((args: Param) => Returns);
