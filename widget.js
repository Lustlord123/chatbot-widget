(function(){
  const iframe = document.createElement('iframe');
  iframe.src = 'https://USERNAME.github.io/chatbot-widget/widget.html';
  iframe.style = `
    position:fixed; bottom:20px; right:20px;
    width:330px; height:480px;
    border:none; z-index:999999;
    border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,.2);
  `;
  document.body.appendChild(iframe);
})();
