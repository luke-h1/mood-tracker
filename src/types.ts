export interface MoodOption {
  emoji: string;
  description: string;
}

export interface MoodOptionWithTimestamp {
  mood: MoodOption;
  timestamp: number;
}
