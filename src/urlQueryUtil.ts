// Constant
const URL_QUERY_PARAMETER = decodeURIComponent(window.location.search);
const ERROR_TEXT_ARGS = 'This function argument is not a valid value.';

// Interface
interface queryDataObj {
  [key: string]: string;
}
type dataInputType = 'string' | 'array' | 'object';
type dataReturnType = string | string[] | queryDataObj;

// Function
const data = <T extends dataReturnType = queryDataObj>(
  dataType: dataInputType = 'object'
): T => {
  let result: T;

  switch (dataType) {
    case 'string':
      result = URL_QUERY_PARAMETER as T;
      break;
    case 'array':
      result = URL_QUERY_PARAMETER.slice(1).split('&') as T;
      break;
    case 'object':
      // fix: + => space
      const arr = URL_QUERY_PARAMETER.slice(1).split('&');
      const obj: queryDataObj = {};
      arr.forEach((el) => {
        const tmpArr: string[] = el.split('=');
        obj[tmpArr[0]] = tmpArr[1];
      });
      result = obj as T;
      break;
    default:
      throw new Error(ERROR_TEXT_ARGS);
  }
  return result;
};

const setCssVar = (targetProp: string[], opt_target = ':root'): void => {
  const appendCssEl = document.createElement('style');
  const getDataObj = data('object');
  const docHead = document.head;

  // Determine if the argument is "all"
  function createCssText(target: string[]) {
    const isTargetAll = target.some(
      (str) => str === 'all' && target.length === 1
    );
    return isTargetAll ? processAllProps() : processSomeProps();

    // isTargetAll === true
    function processAllProps(): string {
      const result = convCssFormat(getDataObj);
      return result;
    }

    // isTargetAll === false
    function processSomeProps() {
      const result = convCssFormat(propFilter());
      return result;
    }
  }

  // getDataObj => filtered by targetProp :Array
  function propFilter() {
    const filteredProp: queryDataObj = {};
    // Comparing data("object") and targetProp
    for (const [key, value] of Object.entries(getDataObj)) {
      for (const item of targetProp) {
        if (key === item) {
          filteredProp[key] = value;
          break;
        }
      }
    }
    return filteredProp;
  }

  // Convert object :object => css file :string
  function convCssFormat(importData: queryDataObj): string {
    let innerCssText = `${opt_target} {`;
    for (const [key, value] of Object.entries(importData)) {
      innerCssText += ` --${key}: ${value};`;
    }
    innerCssText += ' }';
    return innerCssText;
  }

  // append css file => HTML head
  appendCssEl.innerText = createCssText(targetProp);
  docHead.insertBefore(appendCssEl, docHead.firstElementChild);
};

// Export object
const urlQueryUtil = {
  data,
  setCssVar,
};

export default urlQueryUtil;
