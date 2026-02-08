// Riot Games Hub - JavaScript funcional

document.addEventListener('DOMContentLoaded', function() {

  // Botão LOGIN - Abre modal de login
  const btnLogin = document.getElementById('btn-login');
  const loginModal = document.getElementById('login-modal');
  const btnFecharLogin = document.getElementById('btn-fechar-login');
  const loginForm = document.getElementById('login-form');

  if (btnLogin && loginModal) {
    btnLogin.addEventListener('click', function() {
      loginModal.classList.remove('login-modal-oculto');
      loginModal.classList.add('login-modal-visivel');
    });
  }

  function fecharLoginModal() {
    if (loginModal) {
      loginModal.classList.add('login-modal-oculto');
      loginModal.classList.remove('login-modal-visivel');
    }
  }

  if (btnFecharLogin) {
    btnFecharLogin.addEventListener('click', fecharLoginModal);
  }

  if (loginModal) {
    loginModal.addEventListener('click', function(e) {
      if (e.target === loginModal) {
        fecharLoginModal();
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      alert(`Bem-vindo, ${username}!\n\nEsta é uma demonstração. Em produção, isso faria login real.`);
      fecharLoginModal();
      loginForm.reset();
    });
  }

  // Logo - Volta ao topo da página
  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Nav links internos - Scroll suave (sem redirect)
  document.querySelectorAll('.nav-link-interno').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const targetId = href ? href.substring(1) : '';
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Seta do Hub - Faz scroll suave até a seção de placeholders
  const hubArrow = document.getElementById('hub-arrow');
  const placeholdersSection = document.getElementById('placeholders');
  if (hubArrow && placeholdersSection) {
    function scrollToPlaceholders() {
      placeholdersSection.scrollIntoView({ behavior: 'smooth' });
    }
    hubArrow.addEventListener('click', scrollToPlaceholders);
    hubArrow.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToPlaceholders();
      }
    });
    hubArrow.style.cursor = 'pointer';
  }

  // Seção Ajuda - Cards abrem caixa de texto no placeholder
  const ajudaPlaceholder = document.getElementById('ajuda-placeholder');
  const ajudaFormContainer = document.getElementById('ajuda-form-container');
  const ajudaCategoriaLabel = document.getElementById('ajuda-categoria-label');
  const ajudaTextarea = document.getElementById('ajuda-textarea');
  const btnEnviarAjuda = document.getElementById('btn-enviar-ajuda');

  let categoriaSelecionada = '';

  function setupCardClick(card) {
    if (!card) return;
    const categoria = card.getAttribute('data-categoria');

    function abrirFormulario() {
      categoriaSelecionada = categoria;
      ajudaCategoriaLabel.textContent = 'Categoria: ' + categoria;
      ajudaTextarea.value = '';
      ajudaFormContainer.classList.remove('ajuda-form-oculto');
      ajudaFormContainer.classList.add('ajuda-form-visivel');
      ajudaTextarea.focus();
    }

    card.addEventListener('click', abrirFormulario);
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirFormulario();
      }
    });
  }

  setupCardClick(document.getElementById('card-duvidas'));
  setupCardClick(document.getElementById('card-melhorias'));
  setupCardClick(document.getElementById('card-bugs'));
  setupCardClick(document.getElementById('card-outros'));

  // Botão Enviar - categoriza e mostra confirmação
  if (btnEnviarAjuda && ajudaFormContainer && ajudaTextarea) {
    btnEnviarAjuda.addEventListener('click', function() {
      const mensagem = ajudaTextarea.value.trim();
      if (!mensagem) {
        alert('Por favor, digite sua mensagem antes de enviar.');
        return;
      }

      // Simula envio - em produção isso iria para um servidor
      const dados = {
        categoria: categoriaSelecionada,
        mensagem: mensagem,
        data: new Date().toLocaleString('pt-BR')
      };

      console.log('Mensagem enviada:', dados);
      alert(`Mensagem enviada com sucesso!\n\nCategoria: ${dados.categoria}\n\nObrigado pelo seu contato!`);
      
      ajudaTextarea.value = '';
      ajudaFormContainer.classList.remove('ajuda-form-visivel');
      ajudaFormContainer.classList.add('ajuda-form-oculto');
    });
  }

  // Rodapé - Link "Suporte" mostra a seção "Precisa de ajuda"
  const linkSuporte = document.getElementById('link-suporte');
  const secaoAjuda = document.getElementById('ajuda');
  const btnFecharAjuda = document.getElementById('btn-fechar-ajuda');

  if (linkSuporte && secaoAjuda) {
    linkSuporte.addEventListener('click', function(e) {
      e.preventDefault();
      secaoAjuda.classList.remove('ajuda-oculta');
      secaoAjuda.classList.add('ajuda-visivel');
      ajudaFormContainer.classList.remove('ajuda-form-visivel');
      ajudaFormContainer.classList.add('ajuda-form-oculto');
    });
  }

  function fecharAjuda() {
    secaoAjuda.classList.add('ajuda-oculta');
    secaoAjuda.classList.remove('ajuda-visivel');
    ajudaFormContainer.classList.remove('ajuda-form-visivel');
    ajudaFormContainer.classList.add('ajuda-form-oculto');
  }

  if (btnFecharAjuda && secaoAjuda) {
    btnFecharAjuda.addEventListener('click', fecharAjuda);
  }

  if (secaoAjuda) {
    secaoAjuda.addEventListener('click', function(e) {
      if (e.target === secaoAjuda) {
        fecharAjuda();
      }
    });
  }

});
