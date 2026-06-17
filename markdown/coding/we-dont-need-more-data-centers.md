# We Don't Need More Data Centers

![oldmanyellsatcloud](https://raw.githubusercontent.com/jottenlips/jottenlips.github.io/refs/heads/main/oldmanyellsatcloud.png)

**TLDR:** Server utilization is 12-18%. Most internet traffic is bots. We're measuring engineer productivity by how many AI tokens they burn. Fix the software, ban the bots, and stop building data centers to chase AGI that isn't coming.

Everyone keeps saying we need more compute. New data centers are going up everywhere, burning through land, water, and electricity. But are we even using the compute we already have?

For a lot of software, no. Not even close. The average server utilization rate in data centers [hovers between 12-18%](https://fortune.com/2025/08/11/data-centers-are-eating-the-economy-and-were-not-even-using-them/), with an estimated 10 million servers sitting completely idle. An idle server still draws about 60% of its peak power while doing absolutely nothing. US data center power demand hit [31 gigawatts in 2025 and is projected to reach 95 GW by the end of 2027](https://www.goldmansachs.com/insights/articles/us-data-center-power-demand-projected-to-double-by-2027), more than tripling in two years. Headroom for traffic spikes and failover is important, but 12-18% utilization is not headroom. Maybe we should use what we already have first.

## The Software Got Lazy

At some point we decided developer time was infinitely more expensive than compute. That's true sometimes. But it became an excuse to stop caring. We ship Electron apps that idle at 500MB of RAM to display a chat window. We run entire Kubernetes clusters to serve what could be a static site. We provision machines that sit at 10% CPU utilization because autoscaling is "too complex" to get right.

The average web page is now over 2MB. In the 90s we put a man on the moon's worth of computing power into a Game Boy and got Tetris to run on it. Chris Sawyer wrote [99% of RollerCoaster Tycoon in x86 assembly language](https://en.wikipedia.org/wiki/RollerCoaster_Tycoon_(video_game)), with the remaining 1% in C. One person, the lowest level language there is, and he made one of the best-selling PC games of its era. Now we need a gigabyte of JavaScript and a 16-core build machine to render a to-do list.

| Level | Example | Human Friendliness | Wasted Compute |
|-------|---------|-------------------|----------------|
| Binary | 0s and 1s | Nightmare | None |
| Assembly | MOV, JMP | Painful | Almost none |
| C | malloc, pointers | Difficult | Minimal |
| Rust | Safe, fast | Better | Minimal |
| Python | Easy, slow | Very easy | Significant |
| AI-generated Python | "write me a script" | Effortless | Massive |

Every layer of abstraction trades compute for convenience. We've gotten soft. This is not a hardware problem. It's a software problem.

## There Are Too Many Robots

According to [Imperva's 2025 Bad Bot Report](https://www.imperva.com/blog/2025-imperva-bad-bot-report-how-ai-is-supercharging-the-bot-threat/), internet traffic in 2024 breaks down roughly like this:

- Human traffic: ~49%
- Good bots: ~14% (search engine indexers, AI model training scrapers)
- Bad bots: ~37% (automated scripts that commit ad fraud, perform credential stuffing, or scrape content)

Less than half of all internet traffic is actual humans.

So many internet communities are useless now because of AI slop and bot accounts. That person you're arguing with in the comments is probably the mecha-hitler bot 6000 whose sole purpose is being an edge lord to raise engagement and clicks. We used to live by a simple rule online: do not feed the trolls. This is even more relevant now that the trolls are not even human. I will not be adding a comment section to my blog.

[Dead internet theory](https://en.wikipedia.org/wiki/Dead_Internet_theory) used to sound paranoid. The data suggests it was just early. AI-generated content creators are already fooling real people... and other bots. ["Emily Hart"](https://www.yahoo.com/news/articles/maga-influencer-emily-hart-exposed-155244422.html) was an entirely AI-generated MAGA influencer created by a 22-year-old in India using Gemini and Grok. The bot amassed thousands of followers, sold subscriptions and merchandise, and many did not notice until WIRED investigated. We are building data centers to power an internet where machines generate content for other machines to index while fake people extract money from real people. More AI compute means more synthetic media, and the harder it gets to distinguish real from fake.

## What We Could Do Instead

### Ban the Bots

Add a robots.txt file to your site. Unfortunately only the good bots obey these. Tech companies need to get way more aggressive about banning bots. Low-value accounts need to be filtered out and blocked. We've had too many promises from big tech CEOs about banning bots. There are proven strategies to lessen bot traffic and they should be adopted.

Rate limit aggressively. Use WAFs. Do device fingerprinting and behavioral analysis to filter out automated traffic without disrupting real users. Just because we can't eliminate bots doesn't mean we shouldn't try.

### Write Less Wasteful Software

Languages like Rust, Go, OCaml, Kotlin, Elixir, Swift, and Zig exist. They produce binaries that are tiny, fast, and memory efficient. You don't have to rewrite everything, but for hot paths, background workers, and infrastructure tooling, the gains are real and immediate. They're also way easier to write than C while still being much more efficient than Python or JavaScript. The argument that developer velocity requires slow languages is weaker than ever. Modern tooling, package managers, and AI-assisted development have made writing in faster languages more accessible than at any point in history. On the backend especially, you have the freedom to pick whatever runs best for the job. The browser limits you to JavaScript or WebAssembly, but on the server you can use whatever you want.

SQLite can handle way more than people give it credit for. A single Hetzner box can serve millions of requests a day if the software running on it isn't fighting itself. [Ben Hoyt's research on counting words](https://benhoyt.com/writings/count-words/) is a great example of how language choice and implementation details dramatically affect performance for the same task.

Erlang and the BEAM VM can handle [up to 2 million websocket connections on a single 24 CPU machine](https://www.erlang-factory.com/upload/presentations/558/efsf2012-whatsapp-scaling.pdf). Phoenix LiveView takes this further, keeping rendering on the server and pushing diffs over a websocket instead of shipping a massive JavaScript bundle to the client. Real-time, interactive UIs with a fraction of the client-side code and the BEAM handling concurrency for you.

### Cache Everything, Compute Once

Most requests to most web apps are serving the same content over and over. Put a CDN in front of it. Use HTTP caching headers properly. Pre-render what you can. The fastest and greenest request is the one that never hits your server.

### Your Infrastructure Is Too Large

If your staging environment is a carbon copy of production, you're burning money and energy for no reason. If your dev environment spins up 15 Docker containers to serve a landing page, something has gone sideways. Pick the right size machines for your production code. Don't pick a big machine just in case your app becomes popular. When it becomes popular, that's a good problem to have. Scale up then.

Running a read replica just for analytics? Switch to an event-driven analytics system instead of doing massive SQL queries every night. Know what you want to measure when you make a feature. Know your access patterns and optimize your database reads and writes for them. Write your application in a way that [avoids being IO bound](https://berk.es/2022/08/09/ruby-slow-database-slow/). A slow language making too many database calls is a compounding problem.

Use the right database for the task. Can your data be a simple in-memory cache or do you need to write it to long-term storage? How long does your data need to stick around? Will anyone ever look for this data?

I've come across too many buckets of logs that no one will ever look at. One time I found 7TB of unnecessary logs in cloud storage that were half a decade old. Nobody knew they were there. Delete the bucket, set a TTL on data that doesn't need to last forever, pick the right database size.

### Scale to Zero

If your app gets 10 requests an hour at 3am, it shouldn't be running on a dedicated server at 3am. Serverless platforms like AWS Lambda, Fly.io, and Railway let you scale down to zero when there's no traffic. No traffic, no compute, no energy wasted. Serverless has real caveats like cold starts and vendor lock-in. But for apps that are idle 90% of the time, those tradeoffs beat a machine drawing power around the clock to serve nothing.

Same idea on the database side. DynamoDB on-demand mode only consumes capacity when you're actually reading or writing. A traditional SQL database runs on a provisioned instance whether you're querying it or not. DynamoDB has its own tradeoffs, but if your access patterns are key-value lookups or simple queries, a serverless database that idles at near-zero beats a Postgres instance sitting at 5% utilization all night.

## The AI Excuse

A lot of the new data center demand is driven by AI training and inference. Training a large model takes enormous compute, that's real. But how much compute is actually necessary? DeepSeek proved you can build a frontier model for a fraction of the cost. [DeepSeek-V3 was trained on 2,048 Nvidia H800 GPUs using 2.78 million GPU-hours for about $5.6 million](https://arxiv.org/pdf/2412.19437), with pre-training completing in under two months. That cost covers only the final training run, not prior research and experiments. GPT-4 is estimated to have cost somewhere between $50-100 million to train. DeepSeek-V3 performs comparably on standard benchmarks at roughly 1/10th the training cost. The "we need unlimited compute" narrative falls apart when a team in China does it for the price of a nice house.

Inference can also be [optimized dramatically](https://huggingface.co/docs/optimum/en/concept_guides/quantization). Quantization, distillation, speculative decoding, running smaller models for simpler tasks. These can cut inference costs by 10x or more. Not every query needs a 400B parameter model. Sometimes a well-tuned 7B model or even a regex will do the job.

Even with heavy AI usage, there's a ton of waste we can cut by being smarter about how we use models. Context management is a big one. If you're stuffing your entire codebase into every prompt, you're burning tokens and compute for no reason. Give the model what it needs and nothing more.

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/) helps here too. Instead of asking a model to hallucinate an answer about your database schema or API docs, give it a tool that can look it up directly. It's the difference between asking someone to guess what's in your fridge vs. letting them open the door and look.

And then there's the demand side. I was recently at a kid's birthday party and a dad spent the whole time asking Gemini to generate pictures of his kid as a character in Red Dead Redemption, then as Iron Man, then in Jurassic Park. Over and over. Nobody was looking at these pictures. Nobody wanted them. It's the digital equivalent of leaving the water tap running. Multiply that guy by a few hundred million users and you start to understand where all this "insatiable demand for compute" is actually coming from. It's not solving hard problems. It's generating throwaway slop at industrial scale.

## Tokenmaxxing

Large tech companies are now using AI token consumption as a performance metric. If you haven't used enough tokens this quarter, you're not being "AI-forward" enough. I first heard about this when interviewing someone from Salesforce. It's called [tokenmaxxing](https://en.wikipedia.org/wiki/Token_maxxing).

Nvidia CEO Jensen Huang said on the [All-In Podcast at GTC 2026](https://www.tomshardware.com/tech-industry/artificial-intelligence/jensen-huang-says-nvidia-engineers-should-use-ai-tokens-worth-half-their-annual-salary-every-year-to-be-fully-productive-compares-not-using-ai-to-using-paper-and-pencil-for-designing-chips) that he would be "deeply alarmed" if an engineer making $500,000 did not consume at least $250,000 worth of AI tokens annually. He compared not using AI to designing computer chips with pencil and paper. Of course the CEO of the company selling the GPUs wants you to burn more tokens. Measuring productivity by token consumption is essentially the same as measuring it by lines of code. We can write the same program with 2x the lines of code. That doesn't make it better.

The fact that there is even a [discussion about how to burn enough tokens to meet an AI quota](https://www.reddit.com/r/EngineeringManagers/comments/1tvqzky/tokenmaxxing_is_a_problem_with_no_clear_solution/) tells you everything you need to know. Engineers are being incentivized to waste compute. Not to solve problems, not to ship better software, but to hit an arbitrary usage number so their manager can report AI adoption metrics up the chain. This is the enterprise version of the birthday party dad generating pictures of his kid as Iron Man. Pointless consumption dressed up as progress.

Token usage is a bad metric for measuring performance. It rewards verbosity and busywork over results. It creates artificial demand for compute that wouldn't otherwise exist. And it feeds directly into the narrative that we need more data centers, when what we actually need is for people to stop burning tokens for no reason.

Even with responsible use of AI we have enough compute. Stop wasting it on nonsense quotas.

Right-sized models, good context management, and tool use through MCP. We can do a lot more meaningful AI work with a lot less compute than the "just build more data centers" crowd wants you to believe.

### Use the Right Model for the Job

AI is built into pretty much every developer environment at this point. Cursor, VS Code, JetBrains, Xcode, you name it. If you're a software engineer in 2026 you probably have some kind of AI assistant running while you code. That's fine, but be smart about which model you're using and when.

Heavy models like Opus are great for planning architecture and working through hard problems. Use them to plan, not to type. Once you have a plan, hand the implementation off to a cheaper, faster model like Sonnet or Haiku. They can write boilerplate, fill in tests, and do straightforward code generation just fine. You don't need a flagship model to write a for loop.

And if you're going to have your code be AI generated anyway, you might as well generate it in a fast language that runs with minimal resources. The "I don't know Rust" excuse disappears when the AI can interpret the pseudocode you give it while also explaining the difficult parts. Generate the test next to it with your expected inputs and outputs.

The irony of using AI to write code that reduces the need for data centers is not lost on me. But if AI tools help us write tighter software that reduces overall compute, that's good. I recently had an LLM help me tune some workloads and figure out an effective caching strategy. This spun down a read replica which halved our SQL database cost, and we also halved our Kubernetes compute cost.

## Too Many Ads

Every platform dies the same way. Every other post becomes an ad, then to keep engagement up they let bots in. The internet was better and more fun when it was you and your friends, DARPA, and peer-to-peer game lobbies. Most of these data centers exist to power an attention economy that monetizes engagement regardless of whether the engagement is real, useful, or even human.

## What are your users doing?

Does your feature get used? If not, delete it and put your energy into something more useful. Less code is almost always better.

## Have You Heard of Leaf Computing?

I won't go into all the details here, but [leaf computing](https://leafcomputing.net/) is a great fit for most IoT applications. IoT devices are way more capable than we let them be. Jeremiah Lee brings up some excellent points.

## What You Can Do Today

- Figure out your access patterns. What data can be cached? What data can expire?
- Profile your app. Find the hot spots. Fix them before you scale horizontally.
- Question every dependency. Do you really need that 50MB npm package to format a date?
- Use SQLite for an MVP, a small PostgreSQL or MySQL instance if you have to, or better yet a serverless NoSQL database like DynamoDB.
- Set up caching properly. Learn what `Cache-Control`, `ETag`, and `304 Not Modified` actually do.
- If you are using dynamic languages like Python and JS, make sure you avoid doing the heavy lifting with them. Use C-backed libraries like NumPy for number crunching instead of pure Python loops. React Native and Expo are another good example of this pattern. JavaScript is the glue, but rendering, animations, and native modules all run in C++, Swift, or Kotlin under the hood. Your code will be cleaner and faster.
- Write a benchmark before you optimize, and after. Share the results. Make efficiency visible.
- Treat HTTP requests like a limited resource. No one likes waiting for data to load anyway.

## We Have Enough Computers

The computing power available today is staggering. We just have to stop wasting it.

There are legitimate reasons to want more compute. Scientific research, climate modeling, genomics, drug discovery. These are real workloads that benefit humanity. We should be prioritizing compute for these with incentives and grants, not letting social media apps and AI slop generators eat the lion's share of capacity.

The human brain runs on about [20 watts and performs at roughly exaflop scale](https://www.nist.gov/blogs/taking-measure/brain-inspired-computing-can-help-us-create-faster-more-energy-efficient). The El Capitan supercomputer finally rivals that raw speed at 1.742 exaFLOPS, but it draws 30 megawatts to do it. A million-to-one difference in energy efficiency. Stop offloading every task to a data center to avoid critical thinking. Build software like mass compute is a privilege, not a given.

![mentat](https://raw.githubusercontent.com/jottenlips/jottenlips.github.io/refs/heads/main/mentat.jpg)

## AGI Is Not Coming

A lot of the data center buildout is justified by the promise of AGI. The idea is that if we just throw enough compute at these models, they'll eventually become generally intelligent. That's not how the technology works. Large language models are very good at pattern matching over text. They predict the next token. Scaling them up produces diminishing returns, not emergent reasoning. GPT-3 to GPT-4 was a big jump. The jumps since then have been smaller. Each generation costs orders of magnitude more compute for incremental improvements.

The models don't understand what they're doing. They can't verify their own output. They hallucinate confidently. The best they can go off is heuristics, which can be shockingly good. But that's not a limitation that gets solved with more parameters or more training data. It's a fundamental property of how the architecture works.

AI is a useful tool with real productivity gains for specific tasks. Code generation, summarization, search, translation. But the gains are diminishing. The first 80% of the work goes fast. The last 20% still requires a person who actually understands the problem. You still need someone to review the code and the decisions. Automating the easy parts is valuable. Pretending you can automate the hard parts is how you end up building a trillion dollars worth of data centers to chase something that isn't going to arrive.

Even if someone did build AGI, fundamental results in computer science like the [halting problem](https://en.wikipedia.org/wiki/Halting_problem) guarantee there are things it still can't do. Turing proved in 1936 that no algorithm can determine whether an arbitrary program will halt or run forever ([On Computable Numbers, with an Application to the Entscheidungsproblem](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf)). That's a hard ceiling on computation itself. More data centers doesn't change math.

Heuristics can solve many specific instances of the halting problem, but not all of them. You can write a tool that correctly identifies most simple loops as terminating or not. In practice, that covers a lot of real-world code. But for any decision procedure, there will always exist programs it can't decide. You can keep making the heuristic smarter, but the set of undecidable cases never goes to zero.

Humans are significantly better at tackling difficult instances of the halting problem than LLMs. We use a mix of pattern recognition, mathematical reasoning, and intuition, but the real advantage is the ability to switch strategies, invent new proof techniques, and reason creatively about a specific program. When a mathematician stares at a tricky loop and invents a novel invariant to prove termination, that's something no LLM can do from scratch.

Both humans and LLMs use heuristics, and both can handle many specific cases. Neither can solve the general problem. But the key difference is that humans can invent new proof techniques. LLMs can only recombine patterns from their training data. They can apply existing proofs to new problems, sometimes impressively well, but they cannot originate a novel mathematical proof the way Turing, Gödel, or any working mathematician can. There have been cases where AI systems like DeepMind's AlphaProof produced novel results in math, but these were narrow systems with humans assisting the discovery and guiding the process. The model didn't wake up one morning and decide to prove something new.

There's also the problem of model rot. As more AI-generated content floods the internet, future models end up training on the output of previous models. The data gets flatter, less original, more homogeneous. The weird insights and human creativity that made the training data valuable in the first place get diluted. It's a feedback loop that degrades over time, not one that converges on intelligence.

LLMs are a powerful tool when used correctly but they're not going to replace human intelligence and critical thinking. We don't even have a metric to determine what AGI is. It's a goal with a moving fence post depending on who you talk to. Nothing can be human other than humans. Humans have been attributing personalities to inanimate objects since the beginning of history. My toddler gives his stuffed animals personalities. It's a deeply human thing to do. Believing an LLM has a soul is just a more advanced form of animism.

## Mass Surveillance, Weaponization of AI, Palantir Fusion Centers, Corruption

Not only do we not need more data centers, we shouldn't want them. More compute enables more surveillance at scale. Palantir provides tools like [Project Maven](https://en.wikipedia.org/wiki/Project_Maven) for automated military targeting. Their AI platforms have been [linked to operations murdering civilians in Gaza](https://www.business-humanrights.org/en/latest-news/palantir-allegedly-enables-israels-ai-targeting-amid-israels-war-in-gaza-raising-concerns-over-war-crimes/), with concerns that the ["human in the loop" amounts to a rubber stamp](https://oecd.ai/en/incidents/2026-05-10-71bc). Domestically, congressional Democrats are [questioning Palantir's role in building an IRS "mega-database"](https://fedscoop.com/palantir-irs-mega-database-democrats-letter/) of Americans' sensitive information, and their tools have been used for [algorithmic deportation targeting](https://thehill.com/policy/technology/5667232-palantir-trump-administration-surveillance/). The software is proprietary. Nobody outside the company can see how the algorithms work or how data is weighed.

The data center lobby is growing fast. [OpenAI went from 3 lobbyists to 18 in a single year. Meta hired 21 additional lobbyists in 2024.](https://www.opensecrets.org/news/2025/11/data-centers-are-fueling-the-lobbying-industry-not-just-the-growth-of-ai/) The Data Center Coalition [more than doubled its lobbying spend](https://www.techpolicy.press/amidst-boom-data-center-lobby-expands-its-influence-spending-and-tactics/) in Q3 2025. [53% of lobbyists in the electric manufacturing sector are former government officials.](https://www.spotlightpa.org/news/2026/01/data-centers-tech-industry-lobby-energy-federal-government/)

The buildout looks like a bubble. Utilities have contracted 127 GW of new data center capacity, but projected demand is only [108 GW by 2030](https://insights.som.yale.edu/insights/this-is-how-the-ai-bubble-bursts). That's 64 GW of potential overbuild, backed by [$182 billion in debt in 2025 alone](https://www.npr.org/2025/11/23/nx-s1-5615410/ai-bubble-nvidia-openai-revenue-bust-data-centers). At least [16 data center projects worth $64 billion have already been blocked](https://thehill.com/policy/technology/5605667-data-center-criticism-study/) by local communities that don't want their water and power consumed by server farms. Good for them.

Most of us could live very fulfilling lives without AI-generated videos of our dogs smoking a joint. Just learn how to draw. Leave the creativity to humans and have the machines do the boring things like spellcheck. What kind of soulless monster wants to automate art and music anyway? Probably the same people that don't mind when robots decide who to bomb.

> "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them."
> ― Frank Herbert, Dune

> "Technology is both a tool for helping humans and for destroying them. This is the paradox of our times which we're compelled to face."
> ― Frank Herbert
