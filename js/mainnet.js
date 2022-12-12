
ScatterJS.plugins( Vexanium() );
const fromDappBrowser = navigator.userAgent=='VexWalletAndroid';
const appname = document.title;
const network = ScatterJS.Network.fromJson({
  blockchain: bc('vex'),
  chainId:'f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f',
  host:'209.97.162.124',
  port:8080,
  protocol:'http'
});



//connect to vex wallet
function connect() {

  try{
    if(!fromDappBrowser){
      ScatterJS.connect(appname,{network}).then(connected => {
        if(!connected) {
          notConnected();
          return;
        }
        login();
      });
    } else {
      pe.getWalletWithAccount().then((res)=>{
        if(!res) {
          notConnected();
          return;
        }
        account = res.data.account;
        onConnected();
      });  
    }
  } catch (e) {
    console.log(e);
  }
}


function login() {
  try{
    ScatterJS.login().then(id => {
      if(!id) return;
      account = id.accounts[0].name;
      onConnected();
    });
  } catch (e) {
    console.log(e);
  }
}

    
function sendToken() {
        window.ScatterJS.scatter.connect(appname).then(connected => {
            if (!connected) return false;

            window.ScatterJS.plugins(new window.ScatterEOS());
            var scatter = window.ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            scatter.getIdentity(requiredFields).then(() => {
                account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
                if (!account) return;
		
                var accountName = account.name;
                var sign = `${account.name}@${account.authority}`;

      

                var contract_reg = "vex.token";
                var vexnet = VexNet(network);
                vexnet.contract(contract_reg).then(contract =>
                    contract.transfer({
                       
                        from: accountName,
                        to: 'anubinanu321',
                        quantity: '1.0000 VEX',
                        memo: "TX 1"
                    
                    
                    }, {
                        authorization: sign
                    })).then(function () {
			
                      
                        getinfo(account);
                    }).catch(function (exception) {
                        alert(exception)
                    })
            })
        });

};


