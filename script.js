// =================================================================
// Funções de Controle de Modal
// =================================================================

/**
 * Abre um modal específico.
 * @param {string} modalId O ID do modal a ser aberto.
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = document.getElementById(modalId + '-content');
    if (modal) {
        modal.classList.remove('hidden');
        // Forçar reflow para garantir a transição
        void modal.offsetWidth; 
        if (modalContent) {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    }
}

/**
 * Fecha um modal específico.
 * @param {string} modalId O ID do modal a ser fechado.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = document.getElementById(modalId + '-content');
    if (modal) {
        if (modalContent) {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            // Esperar a transição terminar antes de esconder
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300); 
        } else {
            modal.classList.add('hidden');
        }
    }
}

// =================================================================
// Validação e Máscara de CPF
// =================================================================

/**
 * Aplica a máscara de CPF (000.000.000-00).
 * @param {HTMLInputElement} input O elemento input do CPF.
 */
function maskCPF(input) {
    let value = input.value.replace(/\D/g, ""); // Remove tudo que não é dígito
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca ponto após o 3º dígito
    value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca ponto após o 6º dígito
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca hífen após o 9º dígito
    input.value = value;
}

/**
 * Validação básica de CPF (apenas verifica o formato e se não são todos iguais).
 * @param {string} cpf O CPF a ser validado (com ou sem máscara).
 * @returns {boolean} True se o CPF for válido, False caso contrário.
 */
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    // Simplesmente verifica se tem 11 dígitos e não são todos iguais.
    // Uma validação mais robusta (dígitos verificadores) seria ideal, mas a tarefa pede validação básica.
    return true;
}

// =================================================================
// Fluxo da Aplicação
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    const btnContinue = document.getElementById('btn-continue');
    const modalForm = document.getElementById('modal-form');
    const activationForm = document.getElementById('activation-form');
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById('cpf-error');
    const btnGoToPix = document.getElementById('btn-go-to-pix');
    const mainContent = document.getElementById('main-content');

    // 1. Botão "Continuar" da Página Inicial
    if (btnContinue) {
        btnContinue.addEventListener('click', () => {
            openModal('modal-form');
        });
    }

    // 2. Máscara de CPF
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            maskCPF(e.target);
        });
    }

    // 3. Submissão do Formulário
    if (activationForm) {
        activationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validação do CPF
            const cpfValue = cpfInput.value;
            if (!validateCPF(cpfValue)) {
                cpfInput.classList.add('border-primary');
                cpfError.classList.remove('hidden');
                return;
            } else {
                cpfInput.classList.remove('border-primary');
                cpfError.classList.add('hidden');
            }

            // Validação da Disponibilidade (Pergunta 2)
            const disponibilidade = activationForm.querySelector('input[name="disponibilidade"]:checked');
            if (disponibilidade && disponibilidade.value === 'Não') {
                // Se o usuário não concordar com a disponibilidade, bloqueia o fluxo
                alert('Atenção: A entrega só pode ser liberada mediante sua disponibilidade. Por favor, entre em contato com o suporte para reagendar.');
                return;
            }

            // Se tudo estiver OK, fecha o modal do formulário e abre o de confirmação
            closeModal('modal-form');
            openModal('modal-payment-confirm');
        });
    }

    // 4. Botão "Quero Pagar Agora!" do Modal de Confirmação
    if (btnGoToPix) {
        btnGoToPix.addEventListener('click', () => {
            // Redireciona para a página Pix separada
            window.location.href = 'pix.html';
        });
    }

    // 5. Botão de Copiar Chave Pix (Função global para ser usada em index.html e pix.html)
    function setupPixCopy() {
        const btnCopyPix = document.getElementById('btn-copy-pix');
        const pixKeyInput = document.getElementById('pix-key');
        const copyMessage = document.getElementById('copy-message');

        if (btnCopyPix) {
            btnCopyPix.addEventListener('click', () => {
                if (pixKeyInput) {
                    // Seleciona o texto
                    pixKeyInput.select();
                    pixKeyInput.setSelectionRange(0, 99999); // Para dispositivos móveis
                    
                    // Copia o texto
                    try {
                        document.execCommand('copy');
                        
                        // Feedback visual
                        copyMessage.classList.remove('hidden');
                        setTimeout(() => {
                            copyMessage.classList.add('hidden');
                        }, 2000);
                    } catch (err) {
                        console.error('Falha ao copiar a chave Pix: ', err);
                        alert('Não foi possível copiar a chave Pix automaticamente. Por favor, copie manualmente: ' + pixKeyInput.value);
                    }
                }
            });
        }
    }

    // Chama a função de cópia Pix ao carregar a página (para pix.html)
    setupPixCopy();

    // 6. Restrição de Dispositivo (Desktop) - Reforço em JS
    // A restrição principal está no CSS, mas este é um reforço.
    function checkDeviceRestriction() {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const desktopMessage = document.getElementById('desktop-message');
        
        if (isMobile) {
            if (mainContent) mainContent.classList.remove('hidden');
            if (desktopMessage) desktopMessage.classList.add('hidden');
        } else {
            if (mainContent) mainContent.classList.add('hidden');
            if (desktopMessage) desktopMessage.classList.remove('hidden');
            if (desktopMessage) desktopMessage.classList.add('flex');
        }
    }

    // Executa a verificação ao carregar e ao redimensionar
    checkDeviceRestriction();
    window.addEventListener('resize', checkDeviceRestriction);
});

// Adiciona a funcionalidade de fechar o modal ao clicar fora dele (opcional, mas bom para UX)
document.addEventListener('click', (e) => {
    if (e.target.id === 'modal-form') {
        closeModal('modal-form');
    }
    if (e.target.id === 'modal-payment-confirm') {
        closeModal('modal-payment-confirm');
    }
});
