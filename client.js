/* STREAMING_CHUNK:Configurando a lógica principal do Power-Up */
var t = window.TrelloPowerUp.iframe();

window.TrelloPowerUp.initialize({
  'board-buttons': function(t) {
    return [{
      text: 'Configurações',
      callback: function(t) {
        return t.popup({
          title: 'Configurações',
          url: './index.html', // Aponta para o arquivo de interface
          height: 100
        });
      }
    }];
  },
  'card-badges': function(t) {
    // Verifica a preferência salva no quadro
    return t.get('board', 'shared', 'showDescriptions', false)
      .then(function(showDescriptions) {
        if (!showDescriptions) return []; // Se false, retorna lista vazia

        return t.card('desc').then(function(card) {
          if (!card.desc) return [];
          
          // Lógica de corte de texto (mantendo o seu limite de 35)
          let textoLimpo = card.desc.replace(/[`*#_~>]/g, "").replace(/\n/g, " ").trim();
          let preview = textoLimpo.length > 35 ? textoLimpo.substring(0, 32) + '...' : textoLimpo;

          return [{ text: preview, color: 'blue' }];
        });
      });
  }
})
