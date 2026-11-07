(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#navigation');
  const closeMenu=()=>{document.body.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Ouvrir le menu');};
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';document.body.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');if(open)nav?.querySelector('a')?.focus();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){closeMenu();toggle?.focus();}if(e.key==='Tab'&&document.body.classList.contains('menu-open')){const focusable=[...nav.querySelectorAll('a'),toggle];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  const form=document.querySelector('#discovery-form');
  if(!form)return;
  const fields=form.querySelector('fieldset');
  const review=form.querySelector('#form-review');
  const reviewData=form.querySelector('#review-data');
  const params=new URLSearchParams(location.search);
  ['niveau','matiere','formule'].forEach(name=>{const select=form.elements.namedItem(name);const value=params.get(name);if(value&&[...select.options].some(o=>o.value===value))select.value=value;});
  const labelFor=name=>{const el=form.elements.namedItem(name);return el instanceof HTMLSelectElement?el.selectedOptions[0].textContent:el.value;};
  const selection=()=>{const chosen=['niveau','matiere','formule'].filter(n=>form.elements.namedItem(n).value).map(labelFor);const box=document.querySelector('#selection-summary');box.hidden=!chosen.length;document.querySelector('#selection-text').textContent=chosen.join(' · ');};
  selection();
  ['niveau','matiere','formule'].forEach(n=>form.elements.namedItem(n).addEventListener('change',selection));
  const addReview=(label,value)=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);reviewData.append(row);};
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    reviewData.replaceChildren();
    addReview('Niveau',labelFor('niveau'));
    addReview('Matière',labelFor('matiere'));
    addReview('Formule',labelFor('formule'));
    if(form.elements.message.value.trim())addReview('Objectif fictif',form.elements.message.value.trim());
    fields.hidden=true;review.hidden=false;review.focus();review.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  });
  document.querySelector('#edit-form').addEventListener('click',()=>{review.hidden=true;fields.hidden=false;form.elements.niveau.focus();});
  document.querySelector('#confirm-form').addEventListener('click',()=>{
    form.reset();
    location.assign('/azzahrawi/merci/');
  });
  form.querySelector('[data-enhanced-submit]').disabled=false;
})();
