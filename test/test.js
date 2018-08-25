require.config({
  baseUrl: `./`,
  paths: {
    'lib': `../lib`,
    'chai': `./testDeps/chai`
  }
});

const allTests = [
  `tests/gridInterceptor`,
  `tests/interceptorHelperFunctions.js`,
  `tests/textInterceptorFunctions.js`
];

require(allTests, () => {
  /*  global mocha */
  mocha.run();
});