import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Response<T> = [T, Dispatch<SetStateAction<T>>, boolean];

const DEFAULT_PREFIX = "ANIME_APP@";
function usePersistedState<T>(key: string, initialState: any): Response<T> {
  const [state, setState] = useState<T>(initialState);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const storagedValue = await AsyncStorage.getItem(DEFAULT_PREFIX + key);

      if (storagedValue) {
        setState(JSON.parse(storagedValue));
      }

      setFetched(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(DEFAULT_PREFIX + key, JSON.stringify(state));
    })();
  }, [key, state, setState]);

  return [state, setState, fetched];
}

export { usePersistedState };
