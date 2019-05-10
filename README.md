# Running locally
## 1. ANALYTICS-UI
```shell
git clone https://github.com/carlosthe19916/analytics-ui.git
cd analytics-ui
yarn install
yarn start
```

## 2. INSIGHTS-CHROME

```shell
git clone https://github.com/carlosthe19916/insights-chrome.git
cd insights-chrome
yarn install
yarn start
```

## 3. INSIGHTS-PROXY
```shell
git clone https://github.com/RedHatInsights/insights-proxy.git
cd insights-proxy
yarn install
```
#### Setup the initial /etc/hosts entries (do this once)

```
$ sudo bash scripts/patch-etc-hosts.sh
```
#### Start proxy
Move to insight-chrome/build folder and then execute:
```shell
SPANDX_CONFIG=../../analytics-ui/profiles/local-frontend-and-api.js LOCAL_CHROME=true sh ../../insights-proxy/scripts/run.sh
```

## 4. JAXRS-UTIL-MOCKS
```shell
git clone https://github.com/carlosthe19916/jaxrs-util-mocks.git
cd jaxrs-util-mocks
./mvnw compile quarkus:dev
```

## 5. Open you browser
open your browser - [Analytics UI](https://ci.foo.redhat.com:1337/analytics/xavier/dashboard)

NOTE: It's important that all the projects are located next to each other