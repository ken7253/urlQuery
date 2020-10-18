interface queryDataObj {
    [key: string]: string;
}
declare type dataInputType = "string" | "array" | "object";
declare type dataReturnType = string | string[] | queryDataObj;
declare const urlQueryUtil: {
    data: <T extends dataReturnType = queryDataObj>(dataType?: dataInputType) => T;
    setCssVar: (tagetProp: string[], opt_taget?: string) => void;
};
export default urlQueryUtil;
//# sourceMappingURL=urlQueryUtil.d.ts.map