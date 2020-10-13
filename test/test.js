import urlQuery from "../dist/urlQuery.js";


// taget: urlQuery.data() function
function testDataFunc() {
  const dataArr = ["string", "array", "object"];
  dataArr.forEach((el) => {
    const result = urlQuery.data(el);
    console.debug(`${el}: `,result);
  });
}
testDataFunc();

// taget: urlQuery.setCssVar function
urlQuery.setCssVar(["all"]);
