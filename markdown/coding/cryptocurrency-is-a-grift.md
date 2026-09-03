# Cryptocurrency Is a Grift

![bitcoin](https://innovative-project-q9p9v.ampt.app/oldmanyellsatcloud.png)

**TLDR:** Cryptocurrency started with a genuine vision for peer-to-peer electronic cash outside the banking system. It has since become the most inefficient database ever built, consuming 150 TWh per year to process fewer transactions than a single Raspberry Pi. It is not anonymous, not decentralized in practice, and not secure for the average user. The people who got rich did so by getting in early and selling to later buyers, which is a Ponzi scheme by any other name.

## What It Was Supposed to Be

Bitcoin launched in 2009 after the financial crisis. The idea was straightforward: a peer-to-peer electronic cash system that didn't require trusted third parties. No banks, no payment processors, no central authority. The whitepaper is nine pages and reads like a technical solution to a real problem.

For a while, it looked like it might work. You could send value to anyone in the world without a bank account and without asking permission. It was slow and clunky, but it was new. The idea was genuine.

## What It Became

Today, crypto is a casino for people who took the red pill on Twitter. It is the most energy-inefficient database in human history designed to process a handful of transactions per second. It introduced the concept of "digital scarcity" which is at odds with what made the internet so great in the first place, the promise of an infinite landscape for ideas and creativity. I am a child of the 90s :)

// insert image of 90s surfing web

### The Most Expensive Database Ever Built

Bitcoin processes roughly 7 transactions per second. Visa does 1,700 on average and can handle up to 24,000. The Bitcoin network consumes an estimated [150 TWh of electricity annually](https://ccaf.io/cbeci/index), more than the entire country of Argentina. That is 21,428 MWh per transaction, every single time someone moves coins from one wallet to another. A single Bitcoin transaction consumes enough energy to power the average American household for over a month.

People will tell you this is the "security budget." What they mean is that we are burning a small country's worth of electricity so that a bunch of computers can play a guessing game to determine who gets to append the next page to a glorified Google Sheet ledger. The system is designed to waste energy on purpose. That is not a good feature and I would consider this a very awful bug to base your entire finiancial system around.

Ethereum finally moved to proof-of-stake and cut its energy consumption by 99.95%, but it also cemented the idea that the only thing crypto needed to be useful was to be less of an environmental atrocity. It still does not solve the other issues crypto promised. Also, Ethereum is just one currency. Bitcoin is still very popular.

### It Is Not Anonymous

Every single Bitcoin transaction is recorded on a permanent, public, immutable ledger. Anyone with a blockchain explorer can trace the flow of funds from address to address. The entire transaction history of every coin ever mined is visible to anyone.

There are privacy-focused coins like Monero that use ring signatures and stealth addresses to obscure transaction details. Monero works. It is also a tiny fraction of the crypto market. The vast majority of crypto activity happens on transparent chains where your entire financial history is public by default. Blockchain analysis firms like Chainalysis have built an entire industry around deanonymizing blockchain transactions. [Coinbase, Binance, and every major exchange perform KYC on their users](https://www.icij.org/investigations/coin-laundry/tracing-firms-say-binances-clean-up-claims-left-out-key-crime-stats/), and if you want to turn your crypto back into dollars, you have to go through them. The chain is only pseudonymous until you hit a regulated on-ramp. As soon as you spend or convert the money, you risk loosing the anonymity.

The IRS also knows exactly how much you owe in capital gains, because every taxable event is visible on a public ledger. The idea that crypto is anonymous died the moment exchanges agreed to report to the IRS. You have to report gains to the IRS.

### It Is Not Decentralized

The word "decentralized" is a marketing term for most coins. It is a fugazi. Crypto projects are centralized at every layer from who owns the tokens, who runs the network, who writes the code, and who decides the rules.

**Token ownership is centralized.** The top 1% of Bitcoin addresses hold over 50% of the circulating supply. Over 2% of addresses control [95% of all Bitcoin](https://bitinfocharts.com/top-100-richest-bitcoin-addresses.html). This is worse than the distribution of wealth in any country. The same pattern repeats on every chain. A handful of early miners, founders, and VCs own the vast majority of tokens. "Decentralized" distribution is a myth when insiders get pre-mined allocations and retail buys on the open market. This makes "rug pulls" all too common.

**Most crypto projects are VC-controlled from the start.** Andreessen Horowitz, Paradigm, and Sequoia don't invest in crypto because they believe in peer-to-peer cash. They invest because they get large allocations at a discount before the public can buy. Every token launch (ICO) with a "private sale" or "strategic round" is the same structure: insiders buy cheap, retail buys at the IPO, insiders sell into the hype. The projects pitch themselves as decentralized while their cap tables look like any Silicon Valley startup. Solana, Avalanche, NEAR, and a dozen others all followed this playbook.

**Mining and validation are concentrated.** In theory, anyone can run a Bitcoin node. In practice, the network is dominated by a handful of mining pools. [The top three mining pools control over 50% of Bitcoin's hashrate](https://www.buybitcoinworldwide.com/mining/pools/). A 51% attack is not a theoretical concern when the geographic distribution of hashrate is heavily concentrated in specific regions. When China banned crypto mining in 2021, the network's hashrate dropped by roughly 50% overnight. A "decentralized" system that depends on one country's coal plants for half its compute is not decentralized.

Ethereum moved to proof-of-stake, but the result is the same. Over 60% of Ethereum nodes run on Amazon Web Services or other centralized cloud providers. If AWS decides to turn off the spigot, a significant portion of Ethereum's consensus goes dark. Lido, the largest staking pool, controls roughly a third of all staked ETH. The fact that you can rent a validator slot from a centralized exchange like Coinbase or Kraken is the opposite of what the technology was supposed to enable. These staking services are custodial. You do not control the keys. The exchange does.

**Governance is centralized.** Bitcoin has a handful of core maintainers and a mailing list. When there is a contentious fork debate, a small group of people makes the call. Ethereum has Vitalik Buterin and a foundation that drives the roadmap. When Ethereum needed to recover $50 million from the DAO hack in 2016, a small group of developers forked the chain and rewrote the history. The community went along with it, but it was not a decentralized decision. It was a phone call among people who knew each other.

**Layer 2 is more centralized than layer 1.** The scaling solutions that crypto advocates point to as the future are all centralized by design. Most Bitcoin layer 2 solutions like the Lightning Network rely on hubs that look a lot like banks. You open a channel with a hub, route payments through it, and trust it to settle correctly. Ethereum rollups like Arbitrum and Optimism have centralized sequencers that order transactions and can front-run users. Base, one of the largest L2s, is operated entirely by Coinbase. The "decentralized future" of crypto is a collection of corporate-run sidechains.

**Oracles are a centralization vector.** Most DeFi applications depend on Chainlink oracles to get real-world price data. If Chainlink's nodes go down or report incorrect prices, the entire DeFi ecosystem breaks. There are no viable alternatives at scale. The most critical piece of infrastructure in decentralized finance is a centralized data feed.

**DAOs are oligarchies.** Decentralized Autonomous Organizations were supposed to be the future of democratic governance. In practice, voting power is proportional to token holdings, which means the same whales that own the supply control the votes. Most DAO proposals pass with single-digit percentage participation. The rest of the holders either do not vote or delegated their votes to large delegates who vote on everything. The founding team almost always retains a multi-sig that can override any vote they do not like. It is corporate governance with a web3 skin.

The entire system is centralized and non-transparent.

### It Is Not Secure

Crypto is a target-rich environment for theft. If you lose your private keys, your money is gone forever. There is no bank to call, no chargeback, no fraud protection. Over $2 billion in crypto was stolen in 2025 through bridge hacks, wallet exploits, and phishing attacks. [The Lazarus Group, a North Korean state-sponsored hacking team, has stolen over $3 billion in crypto since 2017](https://www.bleepingcomputer.com/news/security/north-koreas-state-hackers-stole-3-billion-in-crypto-since-2017/), funding weapons programs with stolen tokens.

The FTX collapse alone wiped out $8 billion in customer funds. Not a hack. Just fraud. A guy in a Carabbean penthouse was running a hedge fund with customer deposits and nobody noticed because the entire system is opaque by design. The CEO is now in prison and most of the money is gone. There is no SIPC insurance for your shitcoins.

DeFi is worse. Smart contract exploits drain millions every week. The code is audited by firms that are paid by the projects they audit. The incentive structure is backwards and the results speak for themselves. If you do not understand the code, you are gambling. If you do understand the code, you know enough not to put your savings in it.

### The Grift

Every crypto bull market follows the same pattern. A new narrative appears, retail FOMO drives prices up, early investors cash out, and retail holds the bag. The 2017 ICO boom was about "decentralized applications." 2021 was NFTs and "Web3." 2024 was memecoins and AI-related tokens. The narratives change. The result does not.

The exchanges are market makers, not marketplaces. Binance was running a separate company that traded against its own customers. Coinbase lists tokens whose teams paid for the listing. The entire ecosystem has perverse incentives at every level.

Does anyone even remember what an NFT was? NFTs were supposed to revolutionize digital ownership. What they actually did was sell jpegs of cartoon monkeys to people who thought they would get rich. When the market turned, most NFTs became worthless. The people who made money were the creators who minted them and the marketplaces that collected fees.

Tether prints billions of USDT out of thin air and nobody can fully verify the reserves. Circle does the same with USDC. The stablecoin market is a shadow banking system with less transparency than the one it claims to replace. If either of these companies fails, the entire crypto market collapses because everything is priced in stablecoins.

## Conclusion

The irony is that crypto has replicated the exact system it was supposed to replace. You have exchanges that act as banks, whales that act as central banks, and a class of early adopters who got rich at everyone else's expense. The security is worse, the anonymity is worse, the speed is worse, and the energy cost is catastrophic.

The original vision was noble. The current reality is a combination of gambling addiction, regulatory arbitrage, and outright fraud dressed up in computer science jargon.
