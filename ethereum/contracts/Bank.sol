pragma solidity ^0.4.4;

contract Bank{

    address public master;
    enum requestState {
        WAITING,
        ACCEPTED,
        REPAID
    }

    struct Proposal {
        address lender;
        uint loanId;
        requestState state;
        uint rate;
        uint amount;
    }
    
    enum loanState {
        ACCEPTING,
        LOCKED,
        SUCCESSFUL,
        FAILED
    }
    
    struct Loan {
        address borrower;
        loanState state;
        uint dueDate;
        uint amount;
        uint requestCount;
        uint collected;
        uint startDate;
        mapping (uint=>uint) proposal;
    }
    Loan[] public loanList;
    Proposal[] public proposalList;

    mapping (address=>uint[]) public loanMap;
    mapping (address=>uint[]) public lendMap;
    
    function Bank() {
        master = msg.sender;
    }
    
    function activeLoad(address borrower) public returns (bool){
        uint validLoad = loanMap[borrower].length;
        if (validLoad == 0 ) return;
        if (loanList[validLoad-1].state == loanState.ACCEPTING)
            return true;
        if (loanList[validLoad-1].state == loanState.LOCKED)
            return true;
        return false;    
    }
    
    function newloan(uint amount, uint dueDate) public {
        if (activeLoad(msg.sender)) return;
        uint time = block.timestamp;
        loanList.push(Loan(msg.sender, loanState.ACCEPTING, dueDate, amount, 0,0, time));
        loanMap[msg.sender].push(loanList.length - 1);
    }
    
    function newProposal(uint Id, uint rate) payable {
        if (loanList[Id].borrower == 0 || loanList[Id].state != loanState.ACCEPTING)
            return;
        proposalList.push(Proposal(msg.sender, Id, requestState.WAITING, rate, msg.value ));
        lendMap[msg.sender].push(proposalList.length - 1);
        loanList[Id].requestCount++;
        loanList[Id].proposal[loanList[Id].requestCount - 1] = proposalList.length - 1;
    }
    
    function getActiveLoanId(address borrower) public constant returns (uint){
        uint numLoan = loanMap[borrower].length;
        if (numLoan == 0 )
            return;
        uint lastLoadId = loanMap[borrower][numLoan - 1];
        if (loanList[lastLoadId].state != loanState.ACCEPTING)
            return (2**64-1);
        return lastLoadId;    
    }
    
    function revokeProposal(uint id){
        uint pId = lendMap[msg.sender][id];
        if (proposalList[pId].state != requestState.WAITING){
            return;
        } 
        uint Lid = proposalList[pId].loanId;
        if(loanList[Lid].state == loanState.ACCEPTING){
            proposalList[pId].state = requestState.REPAID;
            msg.sender.transfer(proposalList[pId].amount);
        }
        else{
            return;
        }
    }
    
    function lockLoan(uint id) public {
        if ( loanList[id].state == loanState.ACCEPTING ) {
            loanList[id].state = loanState.LOCKED;
            for (uint i = 0; i < loanList[id].requestCount; i++) {
                uint num = loanList[id].proposal[i];
                if (proposalList[num].state == requestState.ACCEPTED) {
                    msg.sender.transfer(proposalList[num].amount);
                }else {
                    proposalList[num].state == requestState.REPAID;
                    proposalList[num].lender.transfer(proposalList[num].amount);
                }
            }
        }
        else{
            return;
        }
    }
    
    function repayValue(uint id) public constant returns (uint){
        if (loanList[id].state == loanState.LOCKED){
            uint date = loanList[id].startDate;
            uint totalamount = 0;
            for (uint i = 0; i < loanList[id].requestCount; i++){
                uint num = loanList[i].proposal[i];
                if (proposalList[num].state == requestState.ACCEPTED){
                    uint ori = proposalList[num].amount;
                    uint rate = proposalList[num].rate;
                    uint nows = block.timestamp;
                    uint interest = (ori*rate*(nows-date)) / (365*24*60*60*100);
                    totalamount += interest;
                    totalamount += ori;
                }
                return totalamount;
            }
        }
        else{
            return (2**64-1);
        }
    }
    
    function repayLoan(uint id) payable {
        uint nows = block.timestamp;
        uint toPaid = repayValue(id);
        uint time = loanList[id].startDate;
        uint paid = msg.value;
        
        if (paid >= toPaid){
            uint remained = paid - toPaid;
            loanList[id].state = loanState.SUCCESSFUL;
            for ( uint i = 0; i < loanList[id].requestCount; i++){
                uint num = loanList[id].proposal[i];
                if (proposalList[num].state == requestState.ACCEPTED){
                    uint ori = proposalList[num].amount;
                    uint rate = proposalList[num].rate;
                    uint interest = (ori * rate * (nows* time)) / (365*24*60*60*100);
                    uint totalamount = interest + ori;
                    proposalList[num].lender.transfer(totalamount);
                    proposalList[num].state = requestState.REPAID;
                }
            }
            msg.sender.transfer(remained);
        }
        msg.sender.transfer(paid);
    }
    
    function acceptPorposal(uint Id){
        uint lId = getActiveLoanId(msg.sender);
        if(lId == (2**64 -1)){
            return;
        }
        
        Proposal pobj = proposalList[Id];
        if (pobj.state != requestState.WAITING){
            return;
        }
        
        Loan lobj = loanList[lId];
        if (lobj.state != loanState.ACCEPTING){
            return;
        }
        
        if (lobj.collected + pobj.amount <= lobj.amount){
            loanList[lId].collected += pobj.amount;
            proposalList[Id].state = requestState.ACCEPTED;
        }
    }
    
    function totalProposal(address _address) constant returns (uint) {
        return lendMap[_address].length;
    }
    
    function getProposalAddressInfo(address _address, uint position) constant returns( address, uint, requestState, uint, uint, uint, uint) {
        Proposal pobj = proposalList[lendMap[_address][position]];
        return (pobj.lender, pobj.loanId, pobj.state, pobj.rate, pobj.amount, loanList[pobj.loanId].amount, loanList[pobj.loanId].dueDate);
    }
    
    function totalLoan(address _address) constant returns (uint) {
        return loanMap[_address].length;
    }
    
    function lastLoanStatus(address _address) constant returns (loanState) {
        uint loanLength = loanMap[_address].length;
        if (loanLength == 0){
            return loanState.SUCCESSFUL;
        }
        return loanList[loanMap[_address][loanLength - 1]].state;
    }
    
    function lastLoanDetails(address _address) constant returns(loanState, uint, uint, uint, uint ) {
        uint loanLength = lendMap[_address].length;
        Loan lobj = loanList[lendMap[_address][loanLength - 1]];
        return (lobj.state, lobj.dueDate, lobj.amount, lobj.requestCount, lobj.collected);
    }
    
    function getProposalLoanIddetails(uint Id, uint num ) constant returns (requestState, uint, uint, uint, address) {
        Proposal pObj = proposalList[loanList[Id].proposal[num]];
        return (pObj.state, pObj.loanId, pObj.rate, loanList[Id].proposal[num], pObj.lender);
    }
    
    function totalLoans() constant returns (uint) {
        return loanList.length;
    }
}    
