
// Classe para cálculo do momento de inércia
class CrossSection {
    constructor(b, h, B, H, r, R, t, w) {
        this.b = b; // largura da parte de baixo
        this.h = h; // altura da parte de baixo
        this.B = B; // largura da parte de cima
        this.H = H; // altura da parte de cima
        this.r = r; // raio do círculo
        this.R = R; // raio do tubo
        this.t = t; // espessura
        this.w = w; // largura da parte superior
    }

    static square(b, h) {
        const I_x = (b * h ** 3) / 12;
        const I_y = (h * b ** 3) / 12;
        return { I_x, I_y };
    }

    static hollowSquare(B, H, b, h) {
        const I1_x = (B * H ** 3) / 12;
        const I2_x = (b * h ** 3) / 12;
        const I1_y = (H * B ** 3) / 12;
        const I2_y = (h * b ** 3) / 12;
        return { I_x: I1_x - I2_x, I_y: I1_y - I2_y };
    }

    static circle(r) {
        const I = (Math.PI * r ** 4) / 4;
        return { I_x: I, I_y: I };
    }

    static pipe(r, R) {
        const I1 = (Math.PI * R ** 4) / 4;
        const I2 = (Math.PI * r ** 4) / 4;
        return { I_x: I1 - I2, I_y: I1 - I2 };
    }

    static I(B,H,b,h) {
        //momento em relação a x
        const d = (H+h)/2;
        const I_x1 = (B*H**3)/12;
        const I_x2 = (b*h**3)/12 + b*h*(d**2);
        const I_x = I_x1 + (I_x2*2)
        // momento em relção a y
        const I_y1 = (H*B**3)/12;
        const I_y2 = (h*b**3)/12;
        const I_y = I_y1 + (I_y2*2)

        return { I_x, I_y };
    }


    static C(B,H,b,h) {
        // Distância entre as flanges (meia altura da alma)
    const d = ((H - 2 * h) + h) / 2;
    // Momento de inércia para a alma (em torno do eixo x)
    const I_x1 = (B * H ** 3) / 12;
    // Momento de inércia para as flanges (em torno do eixo x) 
    const I_x2 = (b * h ** 3) / 12 + b * h * d ** 2;
    // Momento de inércia total em torno do eixo x
    const I_x = I_x1 + 2 * I_x2;
    // Área total da seção transversal
    const A = 2 * (b * h) + B * H;

    // Cálculo do centroide (coordenada X) da seção composta
    const X = ((B/2 * (B*H)) + ((b/2 + B)*(b*h))*2)/A;

    const d1 = X - B/2;
    const d2 = X - (b/2 + B);
     
    // Momento de inércia para a alma (em torno do eixo y)
    const I_y1 = (H * B ** 3) / 12 + d1**2 * H * B;

    // Momento de inércia para as flanges (em torno do eixo y)
    const I_y2 = (h * b ** 3) / 12 + h * b * d2 ** 2;

    // Momento de inércia total em torno do eixo y
    const I_y = I_y1 + 2 * I_y2;

    return { I_x, X, I_y };
    }
}

// Função para atualizar os inputs dinamicamente conforme a seção escolhida
document.getElementById('seção').addEventListener('change', function() {
    const seção = this.value;
    const dynamicInputs = document.getElementById('dynamicInputs');
    dynamicInputs.innerHTML = ''; // Limpar os inputs anteriores

    // Atualizar os campos com base na seção selecionada
    if (seção === 'círculo') {
        dynamicInputs.innerHTML = ` 
            <div class="input-group">
                <label for="raio">Raio (r):</label>
                <input type="number" id="raio" required>
            </div>
        `;
    } else if (seção === 'Retângulo oco') {
        dynamicInputs.innerHTML = ` 
            <div class="input-group">
                <label for="largura_externa">Lado externo (B):</label>
                <input type="number" id="largura_externa" required>
            </div>
            <div class="input-group">
                <label for="altura_externa">Altura externa (H):</label>
                <input type="number" id="altura_externa" required>
            </div>
            <div class="input-group">
                <label for="largura_interna">Lado interno (b):</label>
                <input type="number" id="largura_interna" required>
            </div>
            <div class="input-group">
                <label for="altura_interna">Altura interna (h):</label>
                <input type="number" id="altura_interna" required>
            </div>
        `;
    } else if (seção === 'retangular') {
        dynamicInputs.innerHTML = ` 
            <div class="input-group">
                <label for="largura">Largura (b):</label>
                <input type="number" id="largura" required>
            </div>
            <div class="input-group">
                <label for="altura">Altura (h):</label>
                <input type="number" id="altura" required>
            </div>
        `;
    } else if (seção === 'círculo_vazado') {
        dynamicInputs.innerHTML = ` 
            <div class="input-group">
                <label for="raio_interior">Raio Interno (r<sub>i</sub>):</label>
                <input type="number" id="raio_interior" required>
            </div>
            <div class="input-group">
                <label for="raio_exterior">Raio Externo (r<sub>e</sub>):</label>
                <input type="number" id="raio_exterior" required>
            </div>
        `;
    } else if (seção === 'I') {
        dynamicInputs.innerHTML = `
            <div class="input-group">
                <label for="largura">Largura da alma (b<sub>w</sub>):</label>
                <input type="number" id="largura_alma" required>
            </div>
            <div class="input-group">
                <label for="espessura_alma">Altura da alma (t<sub>w</sub>):</label>
                <input type="number" id="altura_alma" required>
            </div>
            <div class="input-group">
                <label for="largura_mesa">Largura da mesa (b<sub>f</sub>):</label>
                <input type="number" id="largura_mesa" required>
            </div>
            <div class="input-group">
                <label for="espessura_mesa">altura da mesa (t<sub>f</sub>):</label>
                <input type="number" id="altura_mesa" required>
            </div>
        `;
    } else if (seção === 'C') {
        dynamicInputs.innerHTML = `
            <div class="input-group">
                <label for="largura">Largura da alma (b<sub>w</sub>):</label>
                <input type="number" id="largura_alma" required>
            </div>
            <div class="input-group">
                <label for="altura_total">Altura total (H):</label>
                <input type="number" id="altura_total" required>
            </div>
            <div class="input-group">
                <label for="largura_mesa">Largura da flange (b<sub>f</sub>):</label>
                <input type="number" id="largura_flange" required>
            </div>
            <div class="input-group">
                <label for="espessura_mesa">Altura da flange (t<sub>f</sub>):</label>
                <input type="number" id="altura_flange" required>
            </div>
        `;
    } 
});

// Função para calcular e exibir o resultado
document.getElementById('inertiaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const seção = document.getElementById('seção').value;
    let resultado;

    if (seção === 'círculo') {
        const r = parseFloat(document.getElementById('raio').value);
        resultado = CrossSection.circle(r);
    } else if (seção === 'Retângulo oco') {
        const B = parseFloat(document.getElementById('largura_externa').value);
        const H = parseFloat(document.getElementById('altura_externa').value);
        const b = parseFloat(document.getElementById('largura_interna').value);
        const h = parseFloat(document.getElementById('altura_interna').value);
        resultado = CrossSection.hollowSquare(B, H, b, h);
    } else if (seção === 'retangular') {
        const b = parseFloat(document.getElementById('largura').value);
        const h = parseFloat(document.getElementById('altura').value);
        resultado = CrossSection.square(b, h);
    } else if (seção === 'círculo_vazado') {
        const r_interno = parseFloat(document.getElementById('raio_interior').value);
        const r_externo = parseFloat(document.getElementById('raio_exterior').value);
        resultado = CrossSection.pipe(r_interno, r_externo);
    } else if (seção === 'I') {
        const B = parseFloat(document.getElementById('largura_alma').value); // largura da alma
        const H = parseFloat(document.getElementById('altura_alma').value); // espessura da alma
        const b = parseFloat(document.getElementById('largura_mesa').value); // largura da mesa
        const h = parseFloat(document.getElementById('altura_mesa').value); // espessura da mesa
        resultado = CrossSection.I(B,H,b,h);
    } else if (seção === 'C') {
        const B = parseFloat(document.getElementById('largura_alma').value); // largura da alma
        const H = parseFloat(document.getElementById('altura_total').value); // altura total
        const b = parseFloat(document.getElementById('largura_flange').value); // largura da mesa
        const h = parseFloat(document.getElementById('altura_flange').value); // espessura da mesa
        resultado = CrossSection.C(B,H,b,h);
    }

    document.getElementById('resultado').innerHTML = `
        <p>Momento de Inércia em X: ${resultado.I_x}</p>
        <p>Momento de Inércia em Y: ${resultado.I_y}</p>
    `;
});

// Função para alternar o menu no mobile
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}
