<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <!-- Importa a biblioteca do Trello -->
    <script src="https://p.trellocdn.com/power-up.min.js"></script>
    <!-- Importa a sua lógica -->
    <script src="./client.js"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 20px; display: none; background: #fafbfc; }
        .visible { display: flex; align-items: center; justify-content: space-between; }
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px; }
        input:checked + .slider { background-color: #0079bf; }
        .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 2px; bottom: 2px; background-color: white; border-radius: 50%; transition: .4s; }
        input:checked + .slider:before { transform: translateX(20px); }
    </style>
</head>
<body>
    <div id="settings-ui" class="visible">
        <span>Mostrar descrições:</span>
        <label class="switch">
            <input type="checkbox" id="toggleSwitch">
            <span class="slider"></span>
        </label>
    </div>

    <script>
        var t = window.TrelloPowerUp.iframe();
        
        // Só exibe a interface se o popup for aberto como página de settings
        if (window.location.search.includes('settings=true')) {
            document.body.style.display = 'block';
            
            // Carrega o estado salvo
            t.get('board', 'shared', 'showDescriptions', false).then(function(val) {
                document.getElementById('toggleSwitch').checked = val;
            });

            // Salva a alteração
            document.getElementById('toggleSwitch').addEventListener('change', function(e) {
                t.set('board', 'shared', 'showDescriptions', e.target.checked).then(function() {
                    t.closePopup();
                });
            });
        }
    </script>
</body>
</html>
