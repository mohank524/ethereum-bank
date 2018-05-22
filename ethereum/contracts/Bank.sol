pragma solidity ^0.4.17;


contract BankFactory {
    address[] public deployedBank;

    function createBank(uint minimum) public {
        address newBank = new Bank(minimum, msg.sender);
        deployedBank.push(newBank);
    }

    function getDeployedBank() public view returns (address[]) {
        return deployedBank;
    }
}


contract Bank{

    uint public minimumContribution;
    address public manager;

    function Bank (uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        loan.status = STATUS_INITIATED;
        balances[msg.sender] = 100000000;
    }

    
    event LienTrasferred (address _owner);
    event LoanStatus (int _status);
   
    int constant STATUS_INITIATED = 0;
    int constant STATUS_SUBMITTED = 1;
    int constant STATUS_APPROVED  = 2;
    int constant STATUS_REJECTED  = 3;
    
    
    struct Property {
      string  addressOfProperty;
      uint purchasePrice;
      address owner;
    }

    struct LoanTerms{
      uint term;
      uint interest;
      uint loanAmount;
      uint annualTax;
      uint annualInsurance;
    }

    struct MonthlyPayment{
        uint pi;
        uint tax;
        uint insurance;
    }
    

    struct Loan {
      LoanTerms loanTerms;
      Property property;
      MonthlyPayment monthlyPayment;
      ActorAccounts actorAccounts;
      int status; 
    }
    
    struct ActorAccounts {
      address mortgageHolder;
      address insurer;
      address irs;
    }
    
    Loan public loan;
    LoanTerms public loanTerms;
    Property public property;
    MonthlyPayment public monthlyPayment;
    ActorAccounts public actorAccounts;
    
   mapping (address => uint) public balances;
   
    modifier bankOnly {
      require(msg.sender != loan.actorAccounts.mortgageHolder);
      _;
   }
    
   function deposit(address receiver, uint amount) public returns(uint) {
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        return balances[receiver];
    }


    function getBalance(address receiver) public constant returns(uint){
        return balances[receiver];
    }
    

    function submitLoan(
            string _addressOfProperty,
            uint _purchasePrice,
            uint _term,
            uint _interest,
            uint _loanAmount,
            uint _annualTax,
            uint _annualInsurance, 
            uint _monthlyPi,
            uint _monthlyTax,
            uint _monthlyInsurance,
            address _mortgageHolder,
            address _insurer,
            address _irs
    )public {
        loan.property.addressOfProperty = _addressOfProperty;
        loan.property.purchasePrice = _purchasePrice;
        loan.loanTerms.term=_term;
        loan.loanTerms.interest=_interest;
        loan.loanTerms.loanAmount=_loanAmount;
        loan.loanTerms.annualTax=_annualTax;
        loan.loanTerms.annualInsurance=_annualInsurance;
        loan.monthlyPayment.pi=_monthlyPi;
        loan.monthlyPayment.tax=_monthlyTax;
        loan.monthlyPayment.insurance=_monthlyInsurance;
        loan.actorAccounts.mortgageHolder = _mortgageHolder;
        loan.actorAccounts.insurer = _insurer;
        loan.actorAccounts.irs = _irs;
        loan.status = STATUS_SUBMITTED;
    }
    

    function getLoanData() public constant returns (
            string _addressOfProperty,
            uint _purchasePrice,
            uint _term,
            uint _interest,
            uint _loanAmount,
            uint _annualTax,
            uint _annualInsurance,
            int _status,
            uint _monthlyPi,
            uint _monthlyTax,
            uint _monthlyInsurance)
    {
        _addressOfProperty = loan.property.addressOfProperty;
        _purchasePrice=loan.property.purchasePrice;
        _term=loan.loanTerms.term;
        _interest=loan.loanTerms.interest;
        _loanAmount=loan.loanTerms.loanAmount;
        _annualTax=loan.loanTerms.annualTax;
        _annualInsurance=loan.loanTerms.annualInsurance;
        _monthlyPi=loan.monthlyPayment.pi;
        _monthlyTax=loan.monthlyPayment.tax;
        _monthlyInsurance=loan.monthlyPayment.insurance;
        _status = loan.status;
    }
    

    function approveRejectLoan(int _status) public bankOnly {

        loan.status = _status ;
        if(_status == STATUS_APPROVED)
        {
            loan.property.owner  = msg.sender;
        }
    }
}