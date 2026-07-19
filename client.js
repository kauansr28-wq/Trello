// Instanciamos o objeto de comunicação com a API do Trello
var t = window.TrelloPowerUp.iframe();

// Definição dos ícones padrão para exibição (usando SVGs neutros do CDN público do Trello)
var ICON_WHITE = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4fc2-84aa-17a4e1268538%2Ficon-white.svg';
var ICON_GREY = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4fc2-84aa-17a4e1268538%2Ficon-grey.svg';

window.TrelloPowerUp.initialize({
  // 1. Registra o botão no menu superior do quadro (Board Button)
  'board-buttons': function(t, options) {
    return [
      {
        icon: {
          dark: ICON_WHITE,
          light: ICON_GREY
        },
        text: 'Visualizar Descrições',
        callback: function(t) {
          // Abre o popup apontando para o nosso index.html que conterá o switch
          return t.popup({
            title: 'Controle de Descrições',
            url: './index.html',
            height: 140
          });
        }
      }
    ];
  },

  // 2. Registra o badge dinâmico nos cartões que exibirá a prévia da descrição
  'card-badges': function(t, options) {
    // Recuperamos a preferência salva no nível do quadro ('board')
    return t.get('board', 'shared', 'showDescriptions', false)
      .then(function(showDescriptions) {
        // Se a opção estiver desativada, não renderizamos nenhum badge nos cartões
        if (!showDescriptions) {
          return [];
        }

        // Se estiver ativa, buscamos a descrição do cartão atual
        return t.card('desc')
          .then(function(card) {
            if (card && card.desc && card.desc.trim() !== '') {
              // Limpa quebras de linha e reduz o texto para caber perfeitamente no badge
              var limit = 35;
              var cleanDesc = card.desc.replace(/[\n\r]+/g, ' ').trim();
              var preview = cleanDesc.length > limit 
                ? cleanDesc.substring(0, limit) + '...' 
                : cleanDesc;

              return [{
                text: preview,
                color: 'blue', // Aplica a cor azul de destaque do Trello
                icon: ICON_GREY
              }];
            }
            // Retorna vazio caso o cartão não tenha nenhuma descrição preenchida
            return [];
          });
      });
  }
});
