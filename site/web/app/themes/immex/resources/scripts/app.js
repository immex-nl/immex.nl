import {domReady} from '@roots/sage/client';

/**
 * app.main
 */
const main = async (err) => {
  if (err) {
    // handle hmr errors
    console.error(err);
  }

  // application code
  let socket = new WebSocket("wss://webws.gateio.live/v3/?v=430609");
  socket.onopen = function() {
    // alert("Соединение установлено.");
    socket.send(JSON.stringify({
      id: 10000,
      method: "ticker.subscribe",
      params: ["AVAX_USDT", "BTC_USDT", "ETH_USDT", "GARI_USDT", "GT_USDT", "SOL_USDT"]
    }))
  };

  socket.onmessage = function(event) {
    // alert("Получены данные " + event.data);
  };
};

/**
 * Initialize
 *
 * @see https://webpack.js.org/api/hot-module-replacement
 */
domReady(main);
import.meta.webpackHot?.accept(main);
