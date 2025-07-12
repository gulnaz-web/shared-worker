const ID = Math.floor(Math.random() * 999999);
const ports = new Set();

self.onconnect = (event) => {
   const port = event.ports[0];
   ports.add(port);

   port.onmessage = (event) => {
      // Отправляем сообщение во все порты кроме отправителя
      for (let p of ports) {
         if (p === port) continue;

         p.postMessage({
            ID,
            ...event.data,
         });
      }
   };
};
