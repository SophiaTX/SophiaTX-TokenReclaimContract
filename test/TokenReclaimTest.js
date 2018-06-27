var TokenReclaim = artifacts.require("TokenReclaim");
const BigNumber = web3.BigNumber;

async function assertRevert(promise){
    try {
        await promise;
        assert.fail('Expected revert not received');
    } catch (error) {
        const revertFound = error.message.search('revert') >= 0;
        assert(revertFound, `Expected "revert", got ${error} instead`);
    }
};


contract('TokenReclaimTest', function(accounts) {
    it("Shall register some users", async function() {
        let tr = await TokenReclaim.new();
        let ar = tr.AccountRegister({},{fromBlock: 0, toBlock: 'latest'});

        ar.watch(function(error, result){
            console.log(result);
        });

        await tr.register("DCT1i9qfyphRazsFqUHzT3DMWRQGLZ7vkrArLoGdRGYbDrgtGL2ie");
        await tr.register("DCT2dMvB9e1PRwE2rcfVXTBLR2rdphnR9U7DXxeqxVic5DzeWdzMd", {from: web3.eth.accounts[1]});
        await assertRevert(tr.register(""), {from: web3.eth.accounts[2]});
        await tr.register("DCT8i9qfyphRazsFqUHzT3DMWRQGLZ7vkrArLoGdRGYbDrgtGL2ie"), {from: web3.eth.accounts[2]};
        await assertRevert(tr.register("DCT8i9qfyphRazsFqUHzT3DMWRQGLZ7vkrArLoGdRGYbDrgtGL2ieDCT8i9qfyphRazsFqUHzT3DMWRQGLZ7vkrArLoGdRGYbDrgtGL2ie"), {from: web3.eth.accounts[2]});
        await tr.register("DCT3dMvB9e1PRwE2rcfVXTBLR2rdphnR9U7DXxeqxVic5DzeWdzMd", {from: web3.eth.accounts[3]});
        
    })
})
