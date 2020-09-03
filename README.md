# BraintreeReactExpress

POC of React with Express backend integration with Braintree.

## Environment

Set braintree env variables. Go to https://sandbox.braintreegateway.com/ -> `API` -> `Keys` and get your keys.

## Starting dev server

Run:

* `yarn nx serve api` - Express application is available on port 3333 
* `yarn nx serve` - React application is available on port 4200

## Workflow

### Apps

Apps are just orchestrators - there should be as little code in apps as possible. They should import code from libs.

To generate:

* React App: `nx g @nrwl/react:app my-app`
* Express App: `nx g @nrwl/express:app my-app`

### Libs

This is where most of the code is situated.

> In the place of `lib` use `@nrwl/react:lib` or `@nrwl/node:lib`

#### App specific code

App specific code should be in sub-directory prefixed with `@@`. To generate app specific lib:

* `nx g lib lib-name --directory @@app-name`

Example:

```
nx g @nrwl/node:lib config --directory @@api
```

#### Feature specific code

Feature specific code should be prefixed with single `@`. To generate feature specific lib:

* `nx g lib lib-name --directory @feature-name`

Example:

```
nx g @nrwl/react:lib service --directory @payment
```

It is possible to create sub-features like:

```
nx g @nrwl/node:lib model --directory @user/@details
```

### Conceptually related code

Conceptually related code should be prefixed with single `#`. 
That code is not a feature, but a group of related concepts like `#state`, `#shared`.
To generate conceptually related lib:

* `nx g lib lib-name --directory #group-name`

Examples:

```
nx g @nrwl/node:lib date --directory #shared

nx g @nrwl/react:lib reducer --directory @user/#state
nx g @nrwl/react:lib actions --directory @user/#state
nx g @nrwl/react:lib selectors --directory @user/#state
nx g @nrwl/react:lib epics --directory @user/#state
```
