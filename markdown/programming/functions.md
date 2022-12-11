# 1. Setup a Node.JS environment and write your first function

These posts are designed to familiarize yourself with modern web development tools as well as teach you JavaScript. I will be using MacOS for these tutorials. Here is a list of tools for getting started.

> - The terminal app
> - homebrew
> - NVM, node, and NPM
> - Your favorite text or code editor, sublime text or vscode for me

Install [homebrew](https://brew.sh) This is a package manager for MacOS.


open the terminal app and type.

```shell
# current homebrew install command, may take a minute
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# installs node version manager, it may give you additional steps to follow.
brew install nvm 
nvm install --lts # installs latest node and npm
# which node will tell you if node is in the correct path
# it should include nvm in the output
which node
```

Install a text editor.

[vscode](https://code.visualstudio.com/Download) (I use this at work usually)

```shell
# makes a folder called programming, you can name this whatever you'd like.
mkdir programming
# changes directory so that you will be in your programming directory.
cd programming
# create a file named add.js.
touch add.js
```

There is one feature in programming that is powerful enough to do almost anything you would want, especially in JavaScript. This feature is called a function.

Functions are just how you remember them in math class, ie input => output

Let's write our first function.

```javascript
// Functions can be as easy as add.
const add = (x, y) => x + y;
// which is shorthand for
const add = (x, y) => {
    return x + y;
}
// or
function add(x, y) { 
    return x + y;
}
// it usually comes down to personal preference
// or sometimes performance

// Here is how you can use it.
const sum = add(1, 2);
// this function will print our result
console.log(sum) // 3
// you can also export functions so other files can see them
export add;
```

Think of a topic that interests you. I like music theory so I am going to write a simple function that tells me the fifth of any note I put in. Here is the code!

```
# create the file using your terminal, or text editor
touch musicTheory.js
```

Open the file in vscode or an editor of your choice.

```javascript
# musicTheory.js
const getFifth = (note) => {
    // make the input note lowercase
    const lowerCaseNote = note.toLowerCase()
    // make a JS object of every input mapped to every output
    // plug your key in to get the value for the key
    const fifth = {
        c: 'g',
        g: 'd',
        d: 'a',
        a: 'e',
        e: 'b',
        b: 'f#',
        'f#': 'c#',
        gb: 'db',
        'c#': 'ab',
        db: 'ab',
        ab: 'eb',
        eb: 'bb',
        bb: 'f',
        f: 'c'
    }[lowerCaseNote]
    // format your output
    // to look like a note
    // ex Bb
    const formattedNote = `${
        fifth.charAt(0).toUpperCase()
    }${
        fifth.slice(1)
    }`
    // return your result
    return formattedNote
}

// how to use your function
const fifthOfGb = getFifth('gb')
// print to console
console.log(`The fifth of Gb is ${fifthOfGb}`)
```

Run node in your terminal to run the program.

```
node musicTheory.js # or whatever file name you chose
```

✨ Congratulations! you have written your first function. Tomorrow we will cover making your first Web App.
