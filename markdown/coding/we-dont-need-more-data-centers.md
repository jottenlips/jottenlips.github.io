# We Don't Need More Data Centers

![oldmanyellsatcloud](https://raw.githubusercontent.com/jottenlips/jottenlips.github.io/refs/heads/main/oldmanyellsatcloud.png)

We keep hearing about the insatiable demand for compute. New data centers are going up everywhere, burning through land, water, and electricity at a pace that should make anyone uncomfortable. But before we pave over another field with server racks, maybe we should ask ourselves: are we actually using the compute we already have?

The answer, for a lot of software, is no. Not even close. The average server utilization rate in data centers [hovers between 12-18%](https://fortune.com/2025/08/11/data-centers-are-eating-the-economy-and-were-not-even-using-them/), with an estimated 10 million servers sitting completely idle. An idle server still draws about 60% of its peak power while doing absolutely nothing. US data centers operated at over [50 gigawatts of capacity at the end of 2025](https://www.goldmansachs.com/insights/articles/us-data-center-power-demand-projected-to-double-by-2027), and the plan is to double that by 2027. Headroom for traffic spikes and failover is important, but 12-18% utilization is not headroom. That's a parking garage that's 85% empty. Maybe we should use what we already have first.

## The Software Got Lazy

Somewhere along the way we decided that developer time was infinitely more expensive than compute. And that's true in some contexts. But it became an excuse to stop caring entirely. We ship Electron apps that idle at 500MB of RAM to display a chat window. We run entire Kubernetes clusters to serve what could be a static site. We provision machines that sit at 10% CPU utilization because autoscaling is "too complex" to get right.

The average web page is now over 2MB. In the 90s we put a man on the moon's worth of computing power into a Game Boy and got Tetris to run on it. Chris Sawyer wrote nearly all of RollerCoaster Tycoon by himself in assembly language. One person, the lowest level language there is, and he made one of the best-selling PC games of its era. Now we need a gigabyte of JavaScript and a 16-core build machine to render a to-do list.

We have gotten soft as engineers. This is not a hardware problem. This is a software problem.

## There Are Too Many Robots

According to [Imperva's 2024 Bad Bot Report](https://thebestvpn.com/statistics/what-percent-of-internet-traffic-is-bots/), internet traffic breaks down roughly like this:

- Human traffic: ~42%
- Good bots: ~13% (search engine indexers, AI model training scrapers)
- Bad bots: ~44% (automated scripts that commit ad fraud, perform credential stuffing, or scrape content)

Less than half of all internet traffic is actual humans. Bad bots alone outnumber human traffic, flooding databases and networks with harmful content.

So many internet communities are now rendered useless due to the amount of AI slop and bot accounts. That person you are arguing with in the comments is probably the mecha-hitler bot 6000 with the sole purpose of being an edge lord to raise engagement and clicks. We used to live by a simple rule online: do not feed the trolls. This is even more relevant now that the trolls are not even human. I will not be adding a comment section to my blog.

## What We Could Do Instead

### Ban the Bots

First, add a robots.txt file to your site. Unfortunately only the good bots obey these. Tech companies need to become much more aggressive when it comes to banning bots. Low-value accounts need to be filtered out and blocked. We have had too many promises from big tech CEOs about banning bots. There are many proven strategies to lessen bot traffic and they should be adopted.

Reduce bot traffic by deploying a layered, edge-based security strategy. Start by implementing robust web application firewalls (WAFs) and rate limiting to block excessive, flood-like requests from single IPs. Combine this with device fingerprinting and behavioral analysis to instantly identify and filter out automated traffic without disrupting real users. Just because we can't eliminate bots doesn't mean we shouldn't try.

### Write Less Wasteful Software

Languages like Rust, Go, OCaml, Kotlin, Elixir, Swift, and Zig exist. They produce binaries that are tiny, fast, and memory efficient. You don't have to rewrite everything, but for hot paths, background workers, and infrastructure tooling, the gains are real and immediate. They are also much easier to write than C, but still retain many of the efficiency benefits of a lower level language compared to languages like Python or JavaScript. The argument that developer velocity requires slow languages is weaker than ever. Modern tooling, cross-platform libraries, package managers, and AI-assisted development have made writing in faster languages more accessible than at any point in history.

SQLite can handle way more than people give it credit for. A single Hetzner box can serve millions of requests a day if the software running on it isn't fighting itself. [Ben Hoyt's research on counting words](https://benhoyt.com/writings/count-words/) is a great example of how language choice and implementation details dramatically affect performance for the same task.

Erlang and the BEAM VM can handle [up to 2 million websocket connections on a single 24 CPU machine](https://www.erlang-factory.com/upload/presentations/558/efsf2012-whatsapp-scaling.pdf).

### Cache Everything, Compute Once

Most requests to most web apps are serving the same content over and over. Put a CDN in front of it. Use HTTP caching headers properly. Pre-render what you can. The greenest request is the one that never hits your server.

### Your Infrastructure Is Too Large

If your staging environment is a carbon copy of production, you're burning money and energy for no reason. If your dev environment spins up 15 Docker containers to serve a landing page, something has gone sideways. Audit what's running and ask whether it needs to be. Pick the correct size machines for your production code. Do not pick a big machine just in case your app becomes popular. When it becomes popular, that is a good problem to have. Scale up then.

Do you have a read replica you are running analytics on? Switch it to an event-driven analytics system instead of doing massive SQL queries every night. Know what you want to measure when you make a feature. Know your access patterns and optimize your database reads and writes for them.

Use the correct database for the task. Can your data be a simple in-memory cache or do you need to write it to long-term storage? How long does your data need to stick around? Will anyone be looking for this data?

I have come across too many buckets of logs that no one will look at or have forgotten about. One time I even found 7TB of unnecessary logs in cloud storage that were half a decade old. Delete the bucket, set a TTL on data that doesn't need to last forever, pick the correct database size.

## The AI Excuse

A lot of the new data center demand is driven by AI training and inference. Training a large model takes enormous compute, that's real. But inference can be [optimized dramatically](https://huggingface.co/docs/optimum/en/concept_guides/quantization). Quantization, distillation, speculative decoding, and running smaller models for simpler tasks can cut inference costs by 10x or more. Not every query needs a 400B parameter model. Sometimes a well-tuned 7B model or even a regex will do the job.

Even with heavy AI usage, there's a ton of waste we can cut just by being smarter about how we use models. Context management is a big one. If you're stuffing your entire codebase into every prompt, you're burning tokens and compute for no reason. Give the model what it needs and nothing more. Summarize, chunk, and cache context so you're not reprocessing the same information over and over.

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/) is another lever. Instead of asking a model to hallucinate an answer about your database schema or API docs, give it a tool that can look it up directly. The model makes a targeted call, gets the real answer, and moves on. Less back and forth, fewer retries, fewer wasted tokens on wrong answers. It's the difference between asking someone to guess what's in your fridge vs. letting them open the door and look. The second one uses way less energy for everyone involved.

And then there's the demand side. A huge chunk of AI compute right now is going toward stuff nobody asked for. I was recently at a kid's birthday party and a dad spent the whole time asking Gemini to generate pictures of his kid as a character in Red Dead Redemption, then as Iron Man, then in Jurassic Park. Over and over. Nobody was looking at these pictures. Nobody wanted them. It's the digital equivalent of leaving the water tap running. Multiply that guy by a few hundred million users and you start to understand where all this "insatiable demand for compute" is actually coming from. It's not solving hard problems. It's generating throwaway slop at industrial scale.

## Tokenmaxxing

Large tech companies are now using AI token consumption as a performance metric. If you haven't used enough tokens this quarter, you're not being "AI-forward" enough. I first heard about this when interviewing someone with prior experience at Salesforce. It is called [tokenmaxxing](https://en.wikipedia.org/wiki/Token_maxxing).

Nvidia CEO Jensen Huang said on the [All-In Podcast at GTC 2026](https://www.tomshardware.com/tech-industry/artificial-intelligence/jensen-huang-says-nvidia-engineers-should-use-ai-tokens-worth-half-their-annual-salary-every-year-to-be-fully-productive-compares-not-using-ai-to-using-paper-and-pencil-for-designing-chips) that he would be "deeply alarmed" if an engineer making $500,000 did not consume at least $250,000 worth of AI tokens annually. He compared not using AI to designing computer chips with pencil and paper. Of course the CEO of the company selling the GPUs wants you to burn more tokens. Measuring productivity by token consumption is essentially the same as measuring it by lines of code. We can write the same program with 2x the lines of code. That doesn't make it better.

The fact that there is even a [discussion about how to burn enough tokens to meet an AI quota](https://www.reddit.com/r/EngineeringManagers/comments/1tvqzky/tokenmaxxing_is_a_problem_with_no_clear_solution/) tells you everything you need to know. Engineers are being incentivized to waste compute. Not to solve problems more effectively, not to ship better software, but to hit an arbitrary usage number so their manager can report AI adoption metrics up the chain. This is the enterprise version of the guy at the birthday party generating pictures of his kid as Iron Man. Pointless consumption dressed up as progress.

Token usage is an inherently bad metric for measuring performance. It rewards verbosity and busywork over results. It creates artificial demand for compute that wouldn't otherwise exist. And it feeds directly into the narrative that we need more data centers, when what we actually need is for people to stop burning tokens for no reason.

Even with responsible use of AI we have enough compute. Let's stop wasting compute via nonsense quotas.

The combination of right-sized models, good context management, and tool use through MCP means we can do a lot more meaningful AI work with a lot less compute than the "just build more data centers" crowd would have you believe.

We're also starting to see models that can generate efficient code. The irony of using AI to write code that reduces the need for data centers is not lost on me. But if AI tools help us write tighter software, that's a net win. I recently had Claude help me tune some workloads and figure out an effective caching strategy to cut our Kubernetes server count in half as well as spin down a database replica.

## Too Many Ads

Most platforms die when every other post becomes an ad, then to keep engagement up, they let bots in. The internet was better and more fun when it was you and your friends.

## What are your users doing?

Does your feature get used? If not, delete it and put your energy into something more useful. Less code is almost always better.

## Have You Heard of Leaf Computing?

I won't go into all the details here, but [leaf computing](https://leafcomputing.net/) is a great fit for most IoT applications. IoT devices are a lot more capable than we let them be. Jeremiah Lee brings up some excellent points.

## What You Can Do Today

- Figure out your access patterns. What data can be cached? What data can expire?
- Profile your app. Find the hot spots. Fix them before you scale horizontally.
- Question every dependency. Do you really need that 50MB npm package to format a date?
- Use SQLite or Postgres on a single machine before reaching for a distributed database.
- Set up caching properly. Learn what `Cache-Control`, `ETag`, and `304 Not Modified` actually do.
- If you are using dynamic languages like Python and JS, make sure you avoid doing the heavy lifting with them. Use C-backed libraries like NumPy for number crunching instead of pure Python loops. Your code will be cleaner and faster.
- Write a benchmark before you optimize, and after. Share the results. Make efficiency visible.
- Treat HTTP requests like a limited resource. No one likes waiting for data to load anyway.

## We Have Enough Computers

The computing power available today is staggering. We just have to stop wasting it. Every time someone optimizes a hot loop, caches a response, or chooses a lighter tool for the job, that's one fewer rack that needs to exist somewhere.

There are legitimate reasons to want more compute. Scientific research, climate modeling, genomics, drug discovery. These are real workloads that benefit humanity. We should be prioritizing compute for these applications with incentives and grants, not letting social media apps and AI slop generators consume the lion's share of capacity. The problem isn't that compute demand exists. The problem is that we're not allocating it toward anything that matters.

The human brain runs on about [20 watts and performs at roughly exaflop scale](https://www.nist.gov/blogs/taking-measure/brain-inspired-computing-can-help-us-create-faster-more-energy-efficient). The El Capitan supercomputer finally rivals that raw speed at 1.8 exaFLOPS, but it draws 30 megawatts to do it. That's a million-to-one difference in energy efficiency. Stop offloading every task to a data center to avoid critical thinking. Build software like mass compute is a privilege, not a given.

![mentat](https://raw.githubusercontent.com/jottenlips/jottenlips.github.io/refs/heads/main/mentat.jpg)

## AGI Is Not Coming

A lot of the data center buildout is justified by the promise of AGI. The idea is that if we just throw enough compute at these models, they'll eventually become generally intelligent. This is not how the technology works. Large language models are very good at pattern matching over text. They predict the next token. Scaling them up produces diminishing returns, not emergent reasoning. Going from GPT-3 to GPT-4 was a big jump. The jumps since then have been smaller. Each generation costs orders of magnitude more compute for incremental improvements.

The models don't understand what they're doing. They can't verify their own output. They hallucinate confidently. They cannot always tell you with real confidence if something is 100% correct. The best they can go off is heuristics, which can be shockingly good. That's not a limitation that gets solved with more parameters or more training data. It's a fundamental property of how the architecture works.

AI is a useful tool with real productivity gains for specific tasks. Code generation, summarization, search, translation. But the gains are diminishing. The first 80% of the work goes fast. The last 20% still requires a person who actually understands the problem. You still need someone intelligent to review the code and the decisions. Automating the easy parts is valuable. Pretending you can automate the hard parts is how you end up building a trillion dollars worth of data centers to chase something that isn't going to arrive.

Even if someone did build AGI, fundamental results in computer science like the [halting problem](https://en.wikipedia.org/wiki/Halting_problem) guarantee there are things it still can't do. Turing proved in 1936 that no algorithm can determine whether an arbitrary program will halt or run forever ([On Computable Numbers, with an Application to the Entscheidungsproblem](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf)). That's a hard ceiling on computation itself, not a limitation of current hardware or model size. More data centers doesn't change math.

Heuristics can solve many specific instances of the halting problem, but not all of them. You can write a tool that correctly identifies most simple loops as terminating or not. In practice, that covers a lot of real-world code. But for any decision procedure, there will always exist programs it can't decide. You can keep making the heuristic smarter, but the set of undecidable cases never goes to zero.

Humans don't solve the general halting problem either. We solve specific instances using a mix of pattern recognition, mathematical reasoning, and intuition. The advantage humans have is the ability to switch strategies, invent new proof techniques, and reason creatively about a specific program. But we're still bounded by the same mathematical limits.

LLMs and humans are in a similar boat in some ways. Both use heuristics, both can handle many specific cases, neither can solve the general problem. The key difference is that humans can invent new proof techniques. LLMs can only recombine patterns from their training data. They can apply existing proofs to new problems, sometimes impressively well, but they cannot originate a novel mathematical proof the way Turing, Gödel, or any working mathematician can. There have been cases where AI systems like DeepMind's AlphaProof produced novel results in math, but these were narrow systems with humans assisting the discovery and guiding the process. The model didn't wake up one morning and decide to prove something new.

There's also the problem of model rot. As more AI-generated content floods the internet, future models end up training on the output of previous models. The data gets flatter, less original, more homogeneous. Models trained on model output lose the edge cases, the weird insights, the human creativity that made the training data valuable in the first place. The more we rely on AI-generated content, the worse the next generation of models gets. It's a feedback loop that degrades over time, not one that converges on intelligence.

LLMs are a powerful tool when used correctly but will not be a replacement for human intelligence and critical thinking. We don't even have a metric to determine what AGI is. It's a goal with a moving fence post depending on who you talk to. Nothing can be human other than humans. Humans attributing personalities to inanimate objects goes back as far as history. Believing an LLM has a soul or real intelligence is simply a more advanced form of animism.

## Mass Surveillance, Weaponization of AI, Palantir Fusion Centers, Corruption

Not only do we not need more data centers, we shouldn't want them. Palantir provides tools like [Project Maven](https://en.wikipedia.org/wiki/Project_Maven) for automated military targeting. Their AI platforms have been [linked to operations murdering civilians in Gaza](https://www.business-humanrights.org/en/latest-news/palantir-allegedly-enables-israels-ai-targeting-amid-israels-war-in-gaza-raising-concerns-over-war-crimes/), with concerns that the ["human in the loop" amounts to a rubber stamp](https://oecd.ai/en/incidents/2026-05-10-71bc). Domestically, congressional Democrats are [questioning Palantir's role in building an IRS "mega-database"](https://fedscoop.com/palantir-irs-mega-database-democrats-letter/) of Americans' sensitive information, and their tools have been used for [algorithmic deportation targeting](https://thehill.com/policy/technology/5667232-palantir-trump-administration-surveillance/). The software is proprietary. The algorithms and the specific ways data is weighed are not visible to the public or elected officials.

The data center lobby is growing fast. [OpenAI went from 3 lobbyists to 18 in a single year. Meta hired 21 additional lobbyists in 2024.](https://www.opensecrets.org/news/2025/11/data-centers-are-fueling-the-lobbying-industry-not-just-the-growth-of-ai/) The Data Center Coalition [more than doubled its lobbying spend](https://www.techpolicy.press/amidst-boom-data-center-lobby-expands-its-influence-spending-and-tactics/) in Q3 2025. [53% of lobbyists in the electric manufacturing sector are former government officials.](https://www.spotlightpa.org/news/2026/01/data-centers-tech-industry-lobby-energy-federal-government/)

The buildout looks like a bubble. Utilities have contracted 127 GW of new data center capacity, but projected demand is only [108 GW by 2030](https://insights.som.yale.edu/insights/this-is-how-the-ai-bubble-bursts). That's 64 GW of potential overbuild, backed by [$182 billion in debt in 2025 alone](https://www.npr.org/2025/11/23/nx-s1-5615410/ai-bubble-nvidia-openai-revenue-bust-data-centers). At least [16 data center projects worth $64 billion have already been blocked](https://thehill.com/policy/technology/5605667-data-center-criticism-study/) by local communities that don't want their water and power consumed by server farms.

I think most of us could live very fulfilling lives without AI-generated videos of our dogs smoking a joint. Just learn how to draw. Let's leave the creativity to humans and have the machines do the boring things like spellcheck. What kind of soulless monster wants to automate art and music anyway? Probably the same people that don't mind when robots decide who to bomb.

> "Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them."
> ― Frank Herbert, Dune

> "Technology is both a tool for helping humans and for destroying them. This is the paradox of our times which we're compelled to face."
> ― Frank Herbert
