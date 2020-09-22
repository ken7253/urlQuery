// Constant
const URL_QUERY_PARAMETER: string = decodeURIComponent(window.location.search);
const ERROR_TEXT_ARGS: string = "This function argument is not a valid value."

// Interface
interface anyObj {
  [Array: string]: any;
};

// Function
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
      throw new Error(ERROR_TEXT_ARGS);
  }
  return result;
};

const setCssVar = (
  tagetProp: Array<string>,
  opt_taget: string = ":root"
): void => {
  const appendCssEl = document.createElement("style");
  // need fix
  const getDataObj: object = data("object");
  const docHead = document.head;

  // Determine if the argument is "all"
  function createCssText(taget:Array<string>) {
    const isTagetAll: boolean = taget === ["all"] || taget === ["All"];
    return isTagetAll ? processAllProps() : processSomeProps();
  };

  // (isTagetAll === ture) tagetProp if "all" || "All"
  function processAllProps(): string {
    const result = convCssFormat(getDataObj);
    return result;
  };

  // (isTagetAll === fales) tagetProp if [prop_1,prop_2 ...]
  function processSomeProps() {
    const result = convCssFormat(propFilter()); 
    return result;
  };

  // getDataObj => filtered by tagetProp :Array
  function propFilter() {
    const filteredProp: anyObj = {};
    // Comparing data("object") and tagetProp
    for (let [key, value] of Object.entries(getDataObj)) {
      for (let item of tagetProp) {
        if (key === item) {
          filteredProp[key] = value;
          break;
        }
      };
    };
    return filteredProp;
  };

  // Convert object :object => css file :string
  function convCssFormat(importData :object): string {
    let innerCssText: string = `${opt_taget} {`;
    for (const [key, value] of Object.entries(importData)) {
      innerCssText += ` --${key}: ${value};`;
    };
    innerCssText += " }";
    return innerCssText;
  };

  // append css file => HTML head
  appendCssEl.innerText = createCssText(tagetProp);
  docHead.insertBefore(appendCssEl, docHead.firstElementChild);
};

// Export object
const urlQuery = {
  data,
  setCssVar,
};

export default urlQuery;
