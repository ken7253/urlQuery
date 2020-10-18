import urlQueryUtil from "../dist/urlQueryUtil.js";


// taget: urlQueryUtil.data() function
function testDataFunc() {
  const dataArr = ["string", "array", "object"];
  dataArr.forEach((el) => {
    const result = urlQueryUtil.data(el);
    console.debug(`${el}: `,result);
  });
}
testDataFunc();

// taget: urlQueryUtil.setCssVar function
urlQueryUtil.setCssVar(["all"]);
