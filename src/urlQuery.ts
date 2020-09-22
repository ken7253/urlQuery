const URL_QUERY_PARAMETER: string = decodeURIComponent(window.location.search);

interface anyObj {
  [Array: string]: any;
};

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
      const obj: anyObj = {};
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
  tagetProp: Array<string>,
  opt_taget: string = ":root"
): void => {
  const appendCssEl = document.createElement("style");
  const getDataObj: object = data("object");

  function isTagetPropAll(taget:Array<string>) {
    const isTagetAll: boolean = taget === ["all"] || taget === ["All"];
    return isTagetAll ? processAllProps() : processSomeProps();
  };

  // (isTagetAll === ture) tagetProp if "all" || "All"
  function processAllProps(): string {
    const result = processProps();
    return result;
  };

  // (isTagetAll === fales) tagetProp if [prop_1,prop_2 ...]
  function processSomeProps() {
    propFilter();
    const result = processProps(); 
    return result;
  };

  // getDataObj => filtered by tagetProp :Array
  function propFilter() {
    const filteredProp: anyObj = {};
    for (let [key, value] of Object.entries(getDataObj)) {
      for (let item of tagetProp) {
        if (key === item) {
          filteredProp[key] = value;
          break;
        }
      };
    };
  };

  function processProps(priorityData: object): string = getDataObj {
    let convertCssFormat: string = `${opt_taget} {`;
    for (const [key, value] of Object.entries(getDataObj)) {
      convertCssFormat += ` --${key}: ${value};`;
    };
    convertCssFormat += " }";
    return convertCssFormat;
  };
};

const urlQuery = {
  data,
  setCssVar,
};
export default urlQuery;
