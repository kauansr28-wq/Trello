ar t = window.TrelloPowerUp.iframe();

window.TrelloPowerUp.initialize({
  // Botão no menu superior do quadro
  'board-buttons': function(t) {
    return [{
      text: 'Configurações',
      callback: function(t) {
        return t.popup({
          title: 'Configurações',
          url: './index.html?settings=true', // Chama o index com o parâmetro
          height: 80
        });
      }
    }];
  },

  // Lógica dos badges nos cartões
  'card-badges': function(t) {
    return t.get('board', 'shared', 'showDescriptions', false)
      .then(function(showDescriptions) {
        if (!showDescriptions) return [];

        return t.card('desc').then(function(card) {
          if (!card.desc || card.desc.trim() === '') return [];
          
          // Limpa o texto e corta para 35 caracteres
          let textoLimpo = card.desc.replace(/[`*#_~>]/g, "").replace(/\n/g, " ").trim();
          let preview = textoLimpo.length > 35 ? textoLimpo.substring(0, 32) + '...' : textoLimpo;

          return [{ text: preview, color: 'blue' }];
        });
      });
  }
});
