// Cria a infobox dinamicamente
function showInfoBox(message) {
    // Verifica se já existe a infobox
    let existingBox = document.getElementById('infoBox');
    if (existingBox) {
        existingBox.remove();
    }

    const box = document.createElement('div');
    box.id = 'infoBox';
    box.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #1a1a1a;
            color: #fff;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            font-family: 'Poppins', sans-serif;
            z-index: 10000;
            min-width: 250px;
        ">
            ${message}
        </div>
    `;
    document.body.appendChild(box);

    // Remove automaticamente após 3 segundos
    setTimeout(() => {
        box.remove();
    }, 3000);
}

// Função para copiar Pix
function copyPix(id) {
    const pixKey = document.getElementById(id).textContent;
    navigator.clipboard.writeText(pixKey).then(() => {
        showInfoBox('Chave Pix copiada com sucesso!');
    }).catch(() => {
        showInfoBox('Erro ao copiar a chave Pix.');
    });
}

// Atualiza QR Code e chave Pix
function updatePix(key) {
    const encodedKey = encodeURIComponent(key);

    const qrHeader = document.getElementById('qrHeader');
    const pixHeader = document.getElementById('pixKeyHeader');
    if (qrHeader) qrHeader.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedKey}&size=150x150`;
    if (pixHeader) pixHeader.textContent = key;

    const qrCode = document.getElementById('qrCode');
    const pixSection = document.getElementById('pixKey');
    if (qrCode) qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedKey}&size=200x200`;
    if (pixSection) pixSection.textContent = key;
}

// Função de compra que exibe infobox ao invés de alert
function buy(productName, price) {
    // Chave Pix para todos os produtos
    const pixKeys = {
        "VIP Bronze": "39f5bed1-db88-4e86-94bf-81dd0b098f1b",
        "VIP Platina": "39f5bed1-db88-4e86-94bf-81dd0b098f1b",
        "VIP Diamante": "39f5bed1-db88-4e86-94bf-81dd0b098f1b",
        "VIP Rubi": "39f5bed1-db88-4e86-94bf-81dd0b098f1b",
        "Abrir Facção": "39f5bed1-db88-4e86-94bf-81dd0b098f1b",
        "Abrir Corporação": "39f5bed1-db88-4e86-94bf-81dd0b098f1b"
    };

    const key = pixKeys[productName];
    if (!key) {
        showInfoBox('Produto sem chave Pix configurada!');
        return;
    }

    updatePix(key);

    // Exibe a infobox de confirmação
    showInfoBox(`Você selecionou: ${productName} — R$${price}`);

    // Scroll suave até a seção PIX
    const pixSection = document.getElementById('pix');
    if (pixSection) pixSection.scrollIntoView({ behavior: 'smooth' });
}
