**RUN TEST**

**Local Machine**

Use commands from package.json, e.g.

_testEnv=dev npm run test:firefox_

_testEnv=stage npm run test:chrome:headless_

**Docker** 

_testEnv=qa npm run test:docker_

Change variable testEnv to qa, stage or prod. Default is qa.


**REPORT**

HTML report is placed under report folder.

**DOCUMENTATION**

https://devexpress.github.io/testcafe/documentation/getting-started/