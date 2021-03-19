# Ambassador App

Social marketing platform that allows users to make money off their network as simple as sharing a photo on Instagram.

## Setup

Windows is not supported, period.

Install React Native by following the instructions on the [official website](https://facebook.github.io/react-native/docs/getting-started.html) (React Native CLI Quickstart).
For Android dev we suggest you to use `Pixel 3 XL` with `Android Oreo (API 28) or higher` as simulator device.

On MacOS, update your `/etc/hosts` file with:

```
127.0.0.1   backend.ambassador.localhost
127.0.0.1   phpmyadmin.ambassador.localhost
```

Next run the following command:

```bash
$ make up
```

### Backend

Go to [http://backend.ambassador.localhost](http://backend.ambassador.localhost) and create a doctrine user.

Then go to `Utils > Patches management > View patches list` and run all database patches (including `test_data`).

Next build the back office source code using:

```bash
$ make backend-bash
$ yarn dev
```

**Note:** a watcher is also available: `yarn watch`!

### Mobile application

Go to `sources/app` and run the following commands:

```bash
$ yarn install
$ cp App/Config/index.dev.js App/Config/index.js
$ react-native link
```

Then inside `App/Config/index.js`, change `X.X.X.X` to your local IP address.

#### iOS

On MacOS, launch your emulator with Xcode.

Finally, build your app and start it with:

```bash
$ yarn start
```
and
```bash
$ react-native run-ios
```

#### Android

On Linux, launch your emulator with Android Studio, **OR** using the following command:

```bash
$ emulator -list-avds
$ emulator @Pixel_3_XL_API_28 &
```

Finally, build your app and start it with:

```bash
$ yarn start
```
and
```bash
$ react-native run-android
```

## Testing

Simply run the following command:

```bash
$ make test
```

Or the following commands if you want to run tests separately (see `Makefile` for more info) :

```bash
$ make test-front
$ make test-back
```

// TODO unit tests?
