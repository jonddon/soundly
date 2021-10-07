const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const ethers = require("ethers");

// initialize superfluid(sf) for fakeDAI(fDai)
const sf = new SuperfluidSDK.Framework({
    ethers: new ethers.providers.Web3Provider(window.ethereum),
    tokens: ["fDAI"],
});

// initializes and return a superfluid user
async function initializeUser(userAddress) {
    await sf.initialize();
    return sf.user({ address: userAddress, token: sf.tokens.fDAIx.address });
}

// start a payment stream aka flow
// perSecRate is token per seconds rate
async function startFlow(fromAddress, toAddress, perSecRate=0.000005) {
    return await fromAddress.flow({
        toAddress,
        flowRate: tokensPerSec(perSecRate)
    });
}

// stop a payment stream
async function stopFlow(fromAddress, toAddress) {
    return await fromAddress.flow({
        toAddress,
        flowRate: 0
    });
}

// token per sec conversion helper
function tokensPerSec(tokenAmount, decimals=18) {
    return tokenAmount * (10**decimals)
}

export {initializeUser, startFlow, stopFlow};