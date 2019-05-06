## Running locally
- analytics-ui
```shell
git clone https://github.com/carlosthe19916/analytics-ui.git
cd analytics-ui
yarn install
yarn start
```

- insights-chrome

```shell
git clone https://github.com/carlosthe19916/insights-chrome.git
cd insights-chrome
yarn install
yarn start
```

- insights-proxy
```shell
git clone https://github.com/RedHatInsights/insights-proxy.git
cd insights-proxy
yarn install
```

Move to insight-chrome/build folder and then execute:
```shell
SPANDX_CONFIG=../../analytics-ui/config/spandx.config.js LOCAL_CHROME=true sh ../../insights-proxy/scripts/run.sh
```

### Open you browser
open your browser - [Analytics UI](https://ci.foo.redhat.com:1337/analytics/xavier/dashboard)
