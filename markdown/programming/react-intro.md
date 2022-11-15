# Let's start a front-end web project.

🛠 Tools you will be adding to your repertoire:

- Git

- React

## Install Git, it comes with xcode on macos

```
xcode -select--install
```

## Create a react app named my-app

```
npx create-react-app my-app
cd my-app
```

## install dependencies

```
npm i
```

## run your app

```
npm start
```

Now that you have your first app running, let's make a simple app using react hooks. Hooks are functions that let you "hook into" a components state or life-cycle. In this case, we can replace the functional component create react app gives us with our own. Ours will have a hook for the count and a button to increment the count.

```javascript
import React from "react";
import "./App.css";
const { useState } = React;
// We can use an arrow function here as well.
// In react you create apps from components.
// These components can be functions as seen below
// Entire apps can be composed of "functional components"
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <p> {count} </p>
      <button onClick={() => setCount(count + 1)}>increment count </button>
    </div>
  );
};

export default App;
```

```javascript
// Here is an example of a react app using hooks that tells you the fifth of any note.

// App.jsx
import React from "react";
import "./App.css";
import { getFifth } from "./getFifth";
const { useState } = React;
const App = () => {
  const [fifth, setFifth] = useState("");
  return (
    <div className="App">
      <p> Fifth: {fifth} </p>
      <input onChange={(e) => setFifth(getFifth(e.target.value))} />
    </div>
  );
};
export default App;
```

```
// getFifth.js
export const getFifth = (note) => {
  console.log(note);
  if (!note) {
    return "";
  }
  const lowerCaseNote = note.toLowerCase();
  const fifth = {
    c: "g",
    g: "d",
    d: "a",
    a: "e",
    e: "b",
    b: "f#",
    "f#": "c#",
    gb: "db",
    "c#": "ab",
    db: "ab",
    ab: "eb",
    eb: "bb",
    bb: "f",
    f: "c",
  }[lowerCaseNote];
  if (!fifth) {
    return "";
  }
  const formattedNote = `${fifth.charAt(0).toUpperCase()}${fifth.slice(1)}`;
  return formattedNote;
};
```

Try to make an app for making a list of groceries, chores, mood-board, or something simple.

Hint: You can use useState with other data types like arrays and objects.

```
const [groceries, setGroceries] = useState([])
```

You can also "spread" old items with a new item to make a new array with all of the items. ... is the spread operator.

```
setGroceries([...groceries, newGroceryItem])
```

For more info on React, Check out the docs

Once you are happy with your app. Let's make sure your code is under version control for future updates and collaboration with other developers using Git. First sign-up or login to Github, https: //github.com/. Make a new repository for my-app.

```
## cd to your project
git init # initialize a git repo in your project
git checkout -b main

# add the remote to your local git repo

git remote add origin https://github.com/username/my-app

# make a .gitignore
touch .gitignore

# ignore your node_modules by adding node_modules to this file
echo node_modules >> .gitignore

# add your code to the staging area
git add --all

# commit your changes
git commit -m"initial commit"

# push your changes to Github
git push --set-upstream origin main
```

Congrats! You developed your first front-end project and put it under source control!
