export const isValidCpf = (cpf: string): boolean => {
  //Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  //Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Elimina CPFs com todos os dígitos repetidos
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  const remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;

  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  const secondDigit = sum % 11;

  // Verifica se os dígitos verificadores estão corretos
  return cpf[9] === firstDigit.toString() && cpf[10] === secondDigit.toString();
}