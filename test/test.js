import urlQueryUtil from "../dist/urlQuery.js";


// taget: urlQuery.data() function
function testDataFunc() {
  const dataArr = ["string", "array", "object"];
  dataArr.forEach((el) => {
    const result = urlQueryUtil.data(el);
    console.debug(`${el}: `,result);
  });
}
testDataFunc();

// taget: urlQuery.setCssVar function
urlQueryUtil.setCssVar(["all"]);
