---
title: playground
date: 2024-05-26T12:24:14.000Z
duration: 3min
---

# playground

```
public-hoist-pattern[]=['*eslint*', '*prettier*']
```

```ini filename=".npmrc"
public-hoist-pattern[]=['*eslint*', '*prettier*']
```

![](./images/1.png)

```json filename=".vscode/settings.json"
{
  "javascript.validate.enable": false,
  "typescript.validate.enable": false,
  "flow.enabled": true,
  "flow.useNPMPackagedFlow": true
}
```

<Sandpack template="react">

```js filename="App.js"
import React from "react";

export default function App() {
  return <div>hi</div>;
}
```

```js filename="t.js"
console.log(112);
```

</Sandpack>
