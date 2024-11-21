const formatDate = (date: Date) => {
  if (isNaN(date.getTime())) {
    return;
  }
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

export { formatDate };
