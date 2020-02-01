const removeAcentos = text =>
  `${text}`
    .toLowerCase()
    .replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
    .replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
    .replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
    .replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
    .replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
    .replace(new RegExp('[Ç]', 'gi'), 'c');

const convertValues = toValue => {
  const moneyRegexStart = /R\$\s*(\d+)\s*(\w{mi|milhao|milhoes|mil|bi|bilhao|bilhoes})?\s*/;

  const nodesToExclude = ['script', 'style', 'iframe', 'canvas', 'input', 'textarea', 'head', 'meta', 'code'];
  const allNodes = Array.from(document.querySelectorAll(`*`));
  allNodes
    .filter(node => !nodesToExclude.includes(node.nodeName.toLowerCase()) && node.nodeType === Node.TEXT_NODE)
    .map(node => {
      const nodeValue = node.innerText;
      const regexMatch = nodeValue.match(moneyRegexStart);

      if (regexMatch) {
        console.log('O regex funcionou! ', regexMatch);
        console.log('Node: ', node);
        console.log(`Trocando '${regexMatch[0]}' por '[bruxaria]'`);
        node.innerHTML = node.innerHTML.replace(regexMatch[0], `[bruxaria]`);
        console.log('NodeNovo: ', node.innerText);
      }
      return node;
    });
};

const comJQuery = () => {
  jQuery('*')
    .not('script')
    .not('style')
    .not('iframe')
    .not('canvas')
    .not('input')
    .not('textarea')
    .contents()
    .each(node => console.log('NODE ', node));
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(`[Time is Money Extension] Init Message ${JSON.stringify(request)}`);
  sendResponse({ message: `Deu tudo certo!` });
  convertValues(request.income);
});
