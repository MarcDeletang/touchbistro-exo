import { Fragment, useCallback, useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { getPrimeMedians } from "./services/primes.service";
import { PrimeLimitInput } from "./components/prime-limit-input";

function App() {
  const [max, setMax] = useState("42");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getMedian = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setResult("");
    setError("");
    const [newResult, newError] = await getPrimeMedians(max);
    setResult(newResult);
    setIsLoading(false);
    setError(newError);
  }, [max, isLoading, setResult, setError, setIsLoading]);

  return (
    <Fragment>
      <CssBaseline />
      <Stack spacing={3} margin={5}>
        <Stack direction="column" spacing={3} alignItems="center">
          <Typography variant="h2" textAlign="center">
            Welcome to the prime median calculator™ !
          </Typography>
          <PrimeLimitInput
            min={3}
            max={1000 * 1000}
            current={max}
            setCurrent={setMax}
          />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 3 }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={getMedian}
              disabled={isLoading}
            >
              Get the median(s) prime(s)
            </Button>
            <Button
              onClick={() => setResult("")}
              variant="outlined"
              size="large"
              disabled={!result}
            >
              Clear the median(s)
            </Button>
          </Stack>
        </Stack>
        <Divider variant="middle" />
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {result && <Alert>Median found: {result}</Alert>}
      </Stack>
    </Fragment>
  );
}

export default App;
