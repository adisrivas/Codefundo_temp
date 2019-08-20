function opennav() {
    var nav=document.getElementById("hbutton");
    if(nav.style.display == "none")
        { nav.style.display = "block"; }
    else {
    nav.style.display = "none";
    }
}
var ismobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
 
if (!ismobile){
 window.addEventListener('scroll', function(){
  var scrolled=document.getElementById('scrolled');
  scrolled.style.top=-(window.pageYOffset * 0.5)+ 'px';
 }, false)
}
var overlay = document.getElementById("overlay");
var nav = document.getElementById("navv");
window.addEventListener('load', function(){
  overlay.style.display = 'none';
  overlay.style.opacity= 0;
  nav.style.opacity= 1;
  nav.style.background= '#434342f7';
})

var ismobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
 
if (!ismobile){
 window.addEventListener('scroll', function(){
  var scrolled=document.getElementById('scrolled');
  scrolled.style.top=-(window.pageYOffset * 0.5)+ 'px';
 }, false)
}

var contracts={};
App={
    web3Provider: null,
    contracts:{},

    init: function(){
        console.log("App initialized ....");
        return App.initWeb3();
    },

    initWeb3: function(){
        if(typeof web3 !== "undefined")
        {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        }
        else{
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }

        console.log('intialized web3 ....');
        return App.initContracts();
    },

    initContracts: function(){
        $.getJSON('Vote_Token.json',(VoteToken)=>{
            App.contracts.VoteToken=TruffleContract(VoteToken);
            App.contracts.VoteToken.setProvider(App.web3Provider);
            App.contracts.VoteToken.deployed().then((VoteToken)=>{
                console.log('Contract address = ',VoteToken.address);
            })
        })

        return App.render();
    },

    render: function(){

    },

      // Listen for events emitted from the contract
    listenForEvents: function() {
        App.contracts.VoteToken.deployed().then(function(instance) {
            instance.VoteEvent({}, {
            fromBlock: 0,
            toBlock: 'latest',
            }).watch(function(error, event) {
                if(error)
                {
                    console.log("There has been some error while voting ",error);
                }
                else{
                    console.log("Voterid of person = ",event.args._voterid," Party voted = ",event.args._voterid," Constituency = ",event.args._constituency);
                }
            App.render();
            })

            instance.VotingStartEvent({},{
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(error, event){
                if(error)
                    console.log("There has been an error while starting the voting process ",error)
                else{
                    console.log("Total number of voters registered are ",event._totalVotes.toNumber() );
                }
            })

            instance.VotingEndEvent({},{
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(error,event){
                if(error)
                    console.log("There has been an error while finishing the end process ",error);
                else{
                    console.log("Voting Finished!! The total number of votes casted is ",event.args._totalCastedVotes);
                }
            })

            instance.PartyRegistryEvent({},{
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(error,event){
                if(error)
                    console.log("There has been an error in registration of a party ",error);
                else{
                    console.log("Party Registered !! Party Name = ",event.args._party," Constituency = ",event.args._constituency);
                }
            })

            instance.RegisteringStartEvent({},{
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function(error,event){
                if(error)
                    console.log("There has been an error while recording a registering start event",error);
                else{
                    console.log("Voters Registration Started !! Name of Tokens = ",event.args._name," symbol = ",event.args._symbol);
                }
            })
        })
    },
}

window.onload = function(){
    App.init();
}

