// Função para aplicar máscara de data (dd/mm/aaaa)
const mascaraData = (el) => {
  let v = el.value.replace(/\D/g, '');
  if (v.length > 8) v = v.slice(0, 8);

  if (v.length > 4) el.value = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  else if (v.length > 2) el.value = `${v.slice(0, 2)}/${v.slice(2)}`;
  else el.value = v;
};

// Função para validar uma data real
const dataValida = (dia, mes, ano) => {
  if (ano < 0 || mes < 1 || mes > 12 || dia < 1) return false;
  const maxDias = new Date(ano, mes, 0).getDate();
  return dia <= maxDias;
};

// Função principal
const verificar = () => {
  const dataInput = document.querySelector('#txtano').value.trim();
  const res = document.querySelector('#res');

  if (!dataInput) {
    alert('[ERRO] Preencha a data de nascimento e tente novamente!');
    return;
  }

  const partes = dataInput.split('/');
  if (partes.length !== 3) {
    alert('[ERRO] Formato inválido. Use dd/mm/aaaa');
    return;
  }

  const [dia, mes, ano] = partes.map(Number);

  if (!dataValida(dia, mes, ano)) {
    alert('[ERRO] Data inválida. Verifique dia, mês e ano.');
    return;
  }

  const dataNascimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();

  if (dataNascimento > hoje) {
    alert('[ERRO] Data de nascimento no futuro. Verifique.');
    return;
  }

  let anos = hoje.getFullYear() - dataNascimento.getFullYear();
  let meses = hoje.getMonth() - dataNascimento.getMonth();
  let dias = hoje.getDate() - dataNascimento.getDate();

  if (dias < 0) {
    const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
    meses--;
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }

  const plural = (n, singular, plural) => (n === 1 ? `${n} ${singular}` : `${n} ${plural}`);

  const fsex = document.getElementsByName('radsex');
  let genero = '';
  const img = document.createElement('img');
  img.id = 'foto';

  if (fsex[0].checked) {
    genero = 'Homem';
    if (anos === 0) img.src = 'img/bebeM.png';
    else if (anos < 12) img.src = 'img/criancaM.png';
    else if (anos < 25) img.src = 'img/jovemM.png';
    else if (anos < 59) img.src = 'img/adultoM.png';
    else img.src = 'img/velhoM.png';
  } else {
    genero = 'Mulher';
    if (anos === 0) img.src = 'img/bebeF.png';
    else if (anos < 12) img.src = 'img/criancaF.png';
    else if (anos < 25) img.src = 'img/jovemF.png';
    else if (anos < 59) img.src = 'img/adultoF.png';
    else img.src = 'img/velhaF.png';
  }

  res.style.textAlign = 'center';

  let frase = '';
  if (anos === 0) {
    frase =
      meses === 0
        ? `Detectamos ${genero} com ${plural(dias, 'dia', 'dias')}.`
        : `Detectamos ${genero} com ${plural(meses, 'mês', 'meses')}.`;
  } else {
    frase =
      meses > 0
        ? `Detectamos ${genero} com ${plural(anos, 'ano', 'anos')} e ${plural(meses, 'mês', 'meses')}.`
        : `Detectamos ${genero} com ${plural(anos, 'ano', 'anos')}.`;
  }

  res.innerHTML = frase;
  res.appendChild(img);
};
