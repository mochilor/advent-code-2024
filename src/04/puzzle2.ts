export default function puzzle(input: string): number {
  let result = 0;
  const singleLine = input.split('\n').join('#');
  const lineLength = singleLine.indexOf('#') - 1;

  result += [...singleLine.matchAll(new RegExp(`(?=(M[MSXA]S[MSXA#]{${lineLength}}A[MSXA#]{${lineLength}}M[MSXA]S))`, 'g'))].length;
  result += [...singleLine.matchAll(new RegExp(`(?=(S[MSXA]M[MSXA#]{${lineLength}}A[MSXA#]{${lineLength}}S[MSXA]M))`, 'g'))].length;
  result += [...singleLine.matchAll(new RegExp(`(?=(S[MSXA]S[MSXA#]{${lineLength}}A[MSXA#]{${lineLength}}M[MSXA]M))`, 'g'))].length;
  result += [...singleLine.matchAll(new RegExp(`(?=(M[MSXA]M[MSXA#]{${lineLength}}A[MSXA#]{${lineLength}}S[MSXA]S))`, 'g'))].length;

  return result;
}
