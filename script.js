(function(){
  'use strict';

  function generarNombreMagico(nombre){
    nombre = String(nombre || '').trim();
    if(nombre.length === 0) return '';

    let nombreMagico = '';

    if(nombre.length < 4){
      nombreMagico = nombre + 'ius';
    } else if(nombre.length >= 4 && nombre.length <= 6){
      // invertir usando bucle
      let invertido = '';
      for(let i = nombre.length - 1; i >= 0; i--) invertido += nombre[i];
      nombreMagico = invertido + 'Or';
    } else {
      // reemplazar vocales por æ
      let transformado = '';
      const vocales = 'aeiouAEIOU';
      for(let ch of nombre){
        if(vocales.includes(ch)) transformado += 'æ';
        else transformado += ch;
      }
      nombreMagico = 'Zy' + transformado + 'on';
    }

    return nombreMagico;
  }

  // UI wiring
  const form = document.getElementById('magicForm');
  const input = document.getElementById('nombre');
  const resultadoCard = document.getElementById('resultadoCard');
  const resultadoText = document.getElementById('resultado');
  const copiarBtn = document.getElementById('copiar');
  const resetBtn = document.getElementById('reset');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const valor = input.value;
    if(!valor || valor.trim() === ''){
      // feedback visual
      try {
        input.animate([
          {boxShadow: '0 0 0 0 rgba(239,68,68,0)'},
          {boxShadow: '0 0 0 4px rgba(239,68,68,0.12)'}
        ], {duration:350, easing:'ease-out'});
      } catch (err) { /* anim may not be supported, ignore */ }
      alert('⚠️ No escribiste ningún nombre.');
      return;
    }

    const magico = generarNombreMagico(valor);
    resultadoText.textContent = magico;
    resultadoCard.hidden = false;

    // foco en resultado y seleccionar para facilitar copia
    copiarBtn.focus();
  });

  copiarBtn.addEventListener('click', async function(){
    const text = resultadoText.textContent;
    try{
      await navigator.clipboard.writeText(text);
      copiarBtn.textContent = 'Copiado ✓';
      setTimeout(()=> copiarBtn.textContent = 'Copiar', 1500);
    }catch(err){
      // fallback
      const tmp = document.createElement('textarea');
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      copiarBtn.textContent = 'Copiado ✓';
      setTimeout(()=> copiarBtn.textContent = 'Copiar', 1500);
    }
  });

  resetBtn.addEventListener('click', function(){
    input.value = '';
    resultadoText.textContent = '';
    resultadoCard.hidden = true;
    input.focus();
  });

  // atajo: Esc limpia
  input.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      resetBtn.click();
    }
  });

})();
