# Intro to Node.js and JavaScript: functions

These posts are designed to familiarize yourself with modern web development tools as well as teach you JavaScript. I will be using MacOS for these tutorials. Here is a list of tools for getting started.

> - The terminal app
> - homebrew
> - node and NPM
> - Your favorite text or code editor, sublime text or vscode for me

First install [homebrew](https://brew.sh) This is a package manager for MacOS.

Then, open the terminal app and type.

```
brew install node # installs node and npm
```

Install a text editor.

```
# install installer for apps
brew install caskroom / cask / brew - cask
# verify install
brew tap caskroom / versions
# install Sublime Text application
brew cask install sublime - text
```

or https://code.visualstudio.com/Download (I use this at work)

```
# makes a folder called programming, you can name this whatever you'd like.
mkdir programming
# changes directory so that you will be in your programming directory.
cd programming
# create a file named mynewfile.js.
touch mynewfile.js
```

There is one feature in programming that is powerful enough to do almost anything you would want, especially in JavaScript. This feature is called a function.

Functions are just how you remember them in math class, ie input => output

Let's write our first function.

```
// Functions can be as easy as add.
const add = (x, y) => x + y
// which is shorthand for
const add = (x, y) => {
    return x + y
}
// Here is how you can use it.
const sum = add(1, 2)
// this function will print our result
console.log(sum) // 3
```

Think of a topic that interests you. I like music theory so I am going to write a simple function that tells me the fifth of any note I put in. Here is the code!

Use your text editor to add this to mynewfile.js.

```
# mynewfile.js
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
node mynewfile.js
```

Open mynewfile.js, write your own function, and run again.

```
node mynewfile.js
```

✨ Congratulations! you have written your first function. Tomorrow we will cover making your first Web App.
