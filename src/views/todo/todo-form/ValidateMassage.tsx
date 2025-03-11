interface ValidateMassageProps {
  message: string;
}

export default function ValidateMassage({ message }: ValidateMassageProps) {
  return <p className="font-base mt-0.5 text-xs text-red-500">{message}</p>;
}
