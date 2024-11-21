const BASE_URL = "http://localhost:8000";

const getExperts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/experts`);
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export { getExperts };
