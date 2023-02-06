const baseUrl = "http://localhost:3001";

export const getPrimeMedians = async (
  max: string | number
): Promise<[content: string, error: string]> => {
  try {
    const response = await fetch(`${baseUrl}/primes/median?max=${max}`);
    const content = await response.json();
    if (response.status === 200) {
      return [content.join(","), ""];
    }
    if (content.message) {
      return ["", content.message.join("")];
    }
  } catch (e) {}
  //This should be logged somewhere
  return ["", "An unknown error occured"];
};
