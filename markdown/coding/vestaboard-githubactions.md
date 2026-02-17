# Ascend with Automation: Vestaboard and GitHub Actions Inspired Consistency in My Rock Climbing Training

Hey, I'm John Franke, a member of the platform team at Vestaboard. I'm excited to share my journey of preparing for the fall rock climbing season and how Vestaboard, along with GitHub Actions, played a crucial role in my successful off-wall training routine.

## The Crux of Consistency

Last fall, I had some big rock climbing trips planned, including following my first multi-pitch on southern Utah sandstone near Zion National Park and leading classic Southeastern US routes like "Tarantella (5.10a)", "Christine (5.10a)", and "Pet Sematary (5.11a)" at the Wild and Scenic Obed. My goal was to climb the routes as cleanly as possible with minimal falls or breaks. I knew I needed to up my game with a consistent routine, having struggled on a few longer outdoor climbs earlier in Winter and Spring. 

My previous attempts at training were all over the place - random and mostly social gym sessions weren't cutting it. I realized I needed a more focused and structured approach to give the upcoming season my best effort. However, planning a routine and sticking to it can be very challenging.

### Vestaboard: A Visual Reminder for Success

Enter Vestaboard. With Vestaboard, I could experience an inspiring daily reminder for my full-body calistenic workout routine, also known as a WOD or workout of the day. And the best part? I could automate the schedule of these reminders and the exercise choice with a small TypeScript file and GitHub Actions, ensuring I stayed consistent and had a variety of climbing movements to practice. This project wasn't my only form of training, but it was helpful in keeping me on track off the wall. 

#### Planning the WOD

A key factor was planning small sets and reps that were not too aggressive. A steady and measured approach has proved more effective than my prior sporadic and intense sessions. It is important to note that I am not a personal trainer, just a hobbyist climber with internet access, so please consult a trainer if you plan on making your own workout routine. I got most of my exercises from YouTube and climbing blogs. I experimented with many different movements of varying intensities and found a set of exercises I could stick with and build on.

## Tying together Vestaboard and GitHub

If you follow our [Subscription API documentation](https://docs.vestaboard.com/docs/subscription-api/introduction), you can make your subscription in our web application and get a subscription key, secret, and ID to display custom messages on your Vestaboard. GitHub Actions can store these secrets securely. In programming and climbing, it is import to practice safety to a high degree. Let's keep those secrets safe!

![](/img/githubsecretsui.png)


### Climb On: GitHub Actions in Action

GitHub Actions and Vestaboard turned my climbing aspirations into a well-defined routine, giving me an easy to read and timely display for each workout and making the entire process efficient and effective. To create a GitHub Action that runs on a schedule, you need a YAML file in the workflows folder with your cron expression and the bash scripts you want to run. In the root of your project, you can add a file and folder structure like `.github/workflows/WODaboard.yaml`.

```yaml
name: "WODaboard"
on:
  schedule:
    # UTC zone
    # daily @ 8 am CST
    - cron: "0 13 * * *"
  # or run on dispatch
  workflow_dispatch:

jobs:
  wod:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      - run: |
          bun install
          bun run index.ts
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          VB_SUB_ID: ${{ secrets.VB_SUB_ID }}
          VB_SUB_KEY: ${{ secrets.VB_SUB_KEY }}
          VB_SUB_SECRET: ${{ secrets.VB_SUB_SECRET }}
```

Since I had some slightly more complicated logic than just posting a static message to my Vestaboard, I used a Typescript function I could run with `bun`. Bun lets us run TypeScript files without having to compile them to JavaScript first.

Here is a simplified version of the code that sends plain text to my Vestaboard.

```typescript
// index.ts
// full code available on GitHub https://github.com/jottenlips/wodaboard
const sendMessage = async (text: string) => {
  if (process.env.VB_SUB_KEY && process.env.VB_SUB_SECRET) {
    await fetch(`${API_URL}/subscriptions/${process.env.VB_SUB_ID}/message`, {
      method: "POST",
      headers: {
        "X-Vestaboard-Api-Key": process.env.VB_SUB_KEY,
        "X-Vestaboard-Api-Secret": process.env.VB_SUB_SECRET,
        "Content-Type: application/json"
      },
      body: JSON.stringify({
        text,
      }),
    });
  }
};

sendMessage("Hello World!")
```

This function can let us post the content we want to Vestaboard via the Subscription we created earlier.
>- Be sure to use `process.env` so you don't accidently commit your secrets to source code.

### Reaching Beyond Scheduled GitHub Action

Notice the additional field `workflow_dispatch` under `on` in the Action example above. This configuration lets us run the Action from GitHub whenever we want via the `Actions` tab on your repository. `workflow_dispatch` can be very helpful when developing an Action to run on command, like displaying the workout immediately.

![](/img/githubworkflowdispatchui.png)

GitHub Actions isn't just about workout reminders for me. I also found another valuable use – deployment notifications. Setting up Vestaboard to alert me when a new build deploys enhances my awareness of the development process. Integrating with Vestaboard is valuable on any GitHub project where you have automated deployments and want to know when they have succeeded without checking the Action status. To accomplish this, we use the `push` field so that when a change happens to the `main` branch, the Action will run.

For this GitHub Action, I used `curl` instead of the TypeScript code since I have very static content to publish to Vestaboard.

```yaml
// .github/workflows/notify-deployment.yaml
name: "notify-deployment"
on:
  push:
    branches:
      - main
      
jobs:
  wod:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      - run: |
          curl -X POST -H "x-vestaboard-api-key: $VB_SUB_KEY" -H "x-vestaboard-api-secret: $VB_SUB_SECRET" -H "Content-Type: application/json" -d '{"text": "{64} New Wodaboard Deployment! {64}"}'  https://subscriptions.vestaboard.com/subscriptions/$VB_SUB_ID/message  
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          VB_SUB_ID: ${{ secrets.VB_SUB_ID }}
          VB_SUB_KEY: ${{ secrets.VB_SUB_KEY }}
          VB_SUB_SECRET: ${{ secrets.VB_SUB_SECRET }}
```

## Conclusion

Thanks to Vestaboard and GitHub Actions, I met my climbing goals. I was able to lead-climb all three of the Obed routes with minimal falls or breaks. I even flashed one of the climbs with no falls or resting on the rope. I also made it up the Utah multi-pitch smoothly. Repelling down the 5 vertical pitches was a lot scarier than going back up 😅. The combination of visual reminders, automation, and structured workouts propelled me to climb a full grade harder than the previous year. I even completed a few v6 boulders in the gym this year. 

I hope you consider integrating the Vestaboard API into your upcoming projects, whether for staying on track with your goals or creating something delightful and inspiring.

### Code Example

[Wodaboard Source Code](https://github.com/jottenlips/wodaboard)

![WOD](https://github.com/jottenlips/wodaboard/raw/main/IMG_5189.jpg)

## 🧗‍♂️

![Utah](https://mountainproject.com/assets/photos/climb/125253956_medium_1699029918.jpg?cache=1699029923)

![Obed](https://mountainproject.com/assets/photos/climb/125347910_medium_1700256013.jpg?cache=1700504184)
