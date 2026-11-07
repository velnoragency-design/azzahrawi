// Registered in the head before the first render, as required by pagereveal.
window.addEventListener('pagereveal',event=>{
  if(event.viewTransition){
    document.documentElement.classList.add('native-page-transition');
  }
});
