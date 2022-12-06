const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "https://sonarqube.mypepsico.com",
    token: "f14449553af0d83f95bb36624d1e37690d5b8111",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.js",
      "sonar.tests": "./src",
      "sonar.test.inclusions": "**/*.test.js",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/TEST-RESULTS.xml",
    },
  },
  () => {}
);
