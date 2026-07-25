import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  boolean,
  () => Promise<void>,
];

const DEFAULT_PREFIX = "ANIME_APP@";
function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const initialValueRef = useRef<T | undefined>(undefined);

  const [state, setState] = useState<T>(initialState);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    (async () => {
      await reloadState();
    })();
  }, [key]);

  const reloadState = useCallback(async () => {
    setFetched(false);
    try {
      const storagedValue = await AsyncStorage.getItem(DEFAULT_PREFIX + key);

      if (storagedValue !== null) {
        const parsedValue = JSON.parse(storagedValue);
        setState(parsedValue);
        initialValueRef.current = parsedValue;
      } else {
        initialValueRef.current = initialState;
      }
    } catch (error) {
      console.error("Failed to load state from AsyncStorage", error);
      initialValueRef.current = initialState;
    } finally {
      setFetched(true);
    }
  }, [key]);

  useEffect(() => {
    if (!fetched || initialValueRef.current === undefined) {
      return;
    }

    if (state === initialValueRef.current) return;

    (async () => {
      try {
        await AsyncStorage.setItem(DEFAULT_PREFIX + key, JSON.stringify(state));
        await reloadState();
      } catch (error) {
        console.error("Failed to save state to AsyncStorage", error);
      }
    })();
  }, [key, state, fetched]);

  return [state, setState, fetched, reloadState];
}

export { usePersistedState };
