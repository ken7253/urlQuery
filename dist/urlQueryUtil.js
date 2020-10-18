// Constant
var URL_QUERY_PARAMETER = decodeURIComponent(window.location.search);
var ERROR_TEXT_ARGS = "This function argument is not a valid value.";
// Function
var data = function (dataType) {
    if (dataType === void 0) { dataType = "object"; }
    var result;
    switch (dataType) {
        case "string":
            result = URL_QUERY_PARAMETER;
            break;
        case "array":
            result = URL_QUERY_PARAMETER.slice(1).split("&");
            break;
        case "object":
            // fix: + => space
            var arr = URL_QUERY_PARAMETER.slice(1).split("&");
            var obj_1 = {};
            arr.forEach(function (el) {
                var tmpArr = el.split("=");
                obj_1[tmpArr[0]] = tmpArr[1];
            });
            result = obj_1;
            break;
        default:
            throw new Error(ERROR_TEXT_ARGS);
    }
    return result;
};
var setCssVar = function (tagetProp, opt_taget) {
    if (opt_taget === void 0) { opt_taget = ":root"; }
    var appendCssEl = document.createElement("style");
    var getDataObj = data("object");
    var docHead = document.head;
    // Determine if the argument is "all"
    function createCssText(taget) {
        var isTagetAll = taget.some(function (str) { return str === "all" && taget.length === 1; });
        return isTagetAll ? processAllProps() : processSomeProps();
        // isTagetAll === ture
        function processAllProps() {
            var result = convCssFormat(getDataObj);
            return result;
        }
        // isTagetAll === fales
        function processSomeProps() {
            var result = convCssFormat(propFilter());
            return result;
        }
    }
    // getDataObj => filtered by tagetProp :Array
    function propFilter() {
        var filteredProp = {};
        // Comparing data("object") and tagetProp
        for (var _i = 0, _a = Object.entries(getDataObj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            for (var _c = 0, tagetProp_1 = tagetProp; _c < tagetProp_1.length; _c++) {
                var item = tagetProp_1[_c];
                if (key === item) {
                    filteredProp[key] = value;
                    break;
                }
            }
        }
        return filteredProp;
    }
    // Convert object :object => css file :string
    function convCssFormat(importData) {
        var innerCssText = opt_taget + " {";
        for (var _i = 0, _a = Object.entries(importData); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            innerCssText += " --" + key + ": " + value + ";";
        }
        innerCssText += " }";
        return innerCssText;
    }
    // append css file => HTML head
    appendCssEl.innerText = createCssText(tagetProp);
    docHead.insertBefore(appendCssEl, docHead.firstElementChild);
};
// Export object
var urlQueryUtil = {
    data: data,
    setCssVar: setCssVar,
};
export default urlQueryUtil;
//# sourceMappingURL=urlQueryUtil.js.map