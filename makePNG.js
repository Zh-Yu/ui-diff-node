function exportCanvasAsPNG(canvas, fileName) {
  var MIME_TYPE = "image/png";
  var imgURL = canvas.toDataURL(MIME_TYPE);
  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}
while($('label.zoom-text')[0].innerText !== '100%'){
  if($('label.zoom-text')[0].innerText.length === 4)
    $('button.zoom-in')[0].click();
  else
    $('button.zoom-out')[0].click();
}
$('div.screen-viewer-inner').click();

function importHTML2CANVAS () {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
  document.body.appendChild(s);
}

(async function() {
  await importHTML2CANVAS()
  setTimeout(() => {
    html2canvas($('#screen')[0])
    .then(canvas => {
      var dom = $('li.active>picture')[0];
      var name = '';
      if(dom) name = dom.dataset.name;
      else name = 'unknow';
      exportCanvasAsPNG(canvas, name+'.png');
    })
  }, 2000);
})()