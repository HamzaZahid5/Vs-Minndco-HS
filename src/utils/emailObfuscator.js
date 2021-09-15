const censorWord = function (str) {
  return str[0] + '*'.repeat(str.length > 2 ? str.length - 2 : 0) + str.slice(-1);
};

const censorEmail = function (email = '') {
  const [address, domain] = email.split('@');
  return `${censorWord(address)}@${censorWord(domain)}`;
};

export default email => censorEmail(email);
