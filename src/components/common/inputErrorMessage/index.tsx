export const ErrorMessage = ({ msg }: { msg?: string }) => {
  return <p style={{ fontSize: "0.75rem", color: "red" }}>*{msg}</p>;
};
