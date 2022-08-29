import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import React from 'react';
import { MoodOptionWithTimestamp, MoodOption } from '../types';
import noop from 'lodash/noop';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  moodList: MoodOptionWithTimestamp[];
}

const key = '@moodlist-app-data';

const setAppData = async (appState: AppState): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(appState));
  } catch (e) {
    console.error(e);
  }
};

const getAppData = async (): Promise<AppState | null> => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};

interface AppContextState {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOption) => void;
}

const AppContext = createContext<AppContextState>({
  moodList: [],
  handleSelectMood: () => noop,
});

interface ProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: ProviderProps) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((selectedMood: MoodOption) => {
    setMoodList(curr => {
      const newMoodList = [
        ...curr,
        { mood: selectedMood, timestamp: Date.now() },
      ];
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useAppContext must be used within AppContextProvider further up in the component tree',
    );
  }
  return context;
};
