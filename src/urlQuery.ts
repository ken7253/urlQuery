const URL_QUERY_PARAMETER: string = decodeURIComponent(window.location.search);

const data = (dataType: string): string | Array<string> | object => {
  let result: string | Array<string> | object = "";

  switch (dataType) {
    case "string":
      result = URL_QUERY_PARAMETER;
      break;
    case "array":
      result = URL_QUERY_PARAMETER.slice(1).split("&");
      break;
    case "object":
      const arr = URL_QUERY_PARAMETER.slice(1).split("&");
      const obj: queryObj = {};
      interface queryObj {
        [tmpArr: string]: any;
      }
      arr.forEach((el) => {
        const tmpArr: Array<string> = el.split("=");
        obj[tmpArr[0]] = tmpArr[1];
      });
      result = obj;
      break;
    default:
      throw new Error("urlQuery.data argument is not a valid value.");
  }
  return result;
};

const setCssVar = (
  tagetProp: Array<string> | string,
  opt_taget: string = ":root"
): void => {
  const appendCssEl = document.createElement("style");
  const getDataObj: object = data("object");

  function isTagetPropAll(taget: string | Array<string>) {
    const isTagetAll: boolean = (taget === "all" || taget === "All");
    return isTagetAll ? processAllProps() : processSomeProps(tagetProp);
  };

  // tagetProp => "all" || "All" (isTagetAll === ture)
  function processAllProps():string {
    // getDataObj全部処理
    let convertCssFormat :string = `${opt_taget} {`;
    for (const [key, value] of Object.entries(getDataObj)) {
      convertCssFormat += `--${key}: ${value};\n`;
    };
    convertCssFormat += '}';
    return convertCssFormat;
  };

  // tagetProp => [prop_1,prop_2 ...] (isTagetAll === fales)
  function processSomeProps(tagetProp: Array<string>) {
    tagetProp.forEach((el) => {
      // targetPropに指定されたもののみgetDataObjから抽出して処理

    });
  };
  isTagetPropAll(tagetProp);
};

const urlQuery = {
  data,
  setCssVar,
};
export default urlQuery;
