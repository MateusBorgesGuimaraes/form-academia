export function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
  }).format(date);

  const year = date.getFullYear();

  return `${day} ${month.replace(".", "")} ${year}`;
}
