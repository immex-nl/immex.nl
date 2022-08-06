if (document.body.classList.contains('home') ) {


  let socket = new WebSocket("wss://webws.gateio.live/v3/?v=430609");
  socket.onopen = function() {
    // alert("Соединение установлено.");
    socket.send(JSON.stringify({
      id: 10000,
      method: "ticker.subscribe",
      params: ["BTC_USDT", "ETH_USDT", "GT_USDT", "SOL_USDT", "XRP_USDT", "DOGE_USDT", "NEAR_USDT", "XMR_USDT"]
    }))
  };

  socket.onmessage = function(event) {
    // console.log("Получены данные " + event.data);
    let data = JSON.parse( event.data )
    if (data.method === 'ticker.update') {
      let curr = data.params[0].split('_')[0]
      let props = data.params[1]
      let elWrapper = document.querySelector(`.home__table tr.${curr}`)
      let positive = props.change > 0

      elWrapper.querySelector(`.td__price strong`).innerText = "$" + props.last
      elWrapper.querySelector(`.td__volume`).innerText = "$" + numberWithCommas( props.baseVolume )

      let change = elWrapper.querySelector(`.td__change strong`)
      change.innerText = (positive ? "+" : "") + props.change + " %"
      if (positive) {
        change.classList.remove('has-text-danger')
        change.classList.add('has-text-success')
      } else {
        change.classList.remove('has-text-success')
        change.classList.add('has-text-danger')
      }
    }
  };

  function numberWithCommas(x) {
    x = Math.floor(x * 100) / 100
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }


}
