import { getPrimeMedians } from "./primes.service";
describe("Testing prime service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("The API result is formatted and returned", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([2, 3]),
        status: 200,
      })
    );
    const [res, error] = await getPrimeMedians(100);
    expect(res).toBe("2,3");
    expect(error).toBe("");
  });

  it("The max is sent as a query param", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([2, 3]),
        status: 200,
      })
    );
    const value = 42;
    await getPrimeMedians(value);
    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3001/primes/median?max=${value}`
    );
  });

  it("An unknown error is returned in case of mega fail", async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject({}));
    const [res, error] = await getPrimeMedians(100);
    expect(res).toBe("");
    expect(error).toBe("An unknown error occured");
  });

  it("An unknown error is returned in case of 500", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve("Unexpected error"),
        status: 500,
      })
    );
    const [res, error] = await getPrimeMedians(100);
    expect(res).toBe("");
    expect(error).toBe("An unknown error occured");
  });

  it("An error is forwarded when the API returns a 400", async () => {
    const apiError = ["max must be > 3", "max must be < 4520"];
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => ({
          message: apiError,
        }),
        status: 400,
      })
    );
    const [res, error] = await getPrimeMedians(100);
    expect(res).toBe("");
    expect(error).toBe(apiError.join(""));
  });
});
