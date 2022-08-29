import React from 'react';
import { View } from 'react-native';
import { MoodItemRow } from '../components/MoodItemRow';
import { useAppContext } from '../context/App.provider';

export const History = () => {
  const { moodList } = useAppContext();
  return (
    <View>
      {moodList &&
        moodList.map(mood => <MoodItemRow item={mood} key={mood.timestamp} />)}
    </View>
  );
};
