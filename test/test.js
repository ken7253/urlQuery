import urlQueryUtil from "../dist/urlQueryUtil.js";


// target: urlQueryUtil.data() function
function testDataFunc() {
  const dataArr = ["string", "array", "object"];
  dataArr.forEach((el) => {
    const result = urlQueryUtil.data(el);
    console.debug(`${el}: `,result);
  });
}
testDataFunc();

// target: urlQueryUtil.setCssVar function
urlQueryUtil.setCssVar(["all"]);
