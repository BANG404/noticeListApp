import { Tabs, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';
import colors from '../../components/colors';

const tabs = [
  { name: "(list)", title: "清单", icon: "list-outline" as const },
  { name: "(send)", title: "发布", icon: "add-circle-outline" as const },
  { name: "(manage)", title: "管理", icon: "settings-outline" as const },
];

interface TabButtonProps {
  accessibilityState: { selected?: boolean };
  onPress: () => void;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  activeIndex: Animated.SharedValue<number>;
  index: number;
}

function TabButton({ accessibilityState, onPress, title, icon, activeIndex, index }: TabButtonProps) {
  const focused = useDerivedValue(() => activeIndex.value === index);

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      Number(focused.value),
      [0, 1],
      ['transparent', '#F4F4F5']
    );
    return { backgroundColor };
  });

  const textColorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(focused.value),
      [0, 1],
      ['#6B7280', '#000000']
    );
    return { color };
  });

  const iconColorStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(focused.value),
      [0, 1],
      ['#6B7280', '#000000']
    );
    return { color };
  });

  return (
    <Animated.View style={[styles.tabButton, animatedStyles]}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <Animated.View style={iconColorStyle}>
          <Ionicons name={icon} size={24} />
        </Animated.View>
        <Animated.Text style={[styles.tabText, textColorStyle]}>
          {title}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

export default function TabLayout() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const TAB_WIDTH = SCREEN_WIDTH / tabs.length;
  const activeIndex = useSharedValue(0);
  const router = useRouter();

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(activeIndex.value * TAB_WIDTH, { duration: 300 }) }],
    };
  });

  const updateActiveIndex = useCallback((index: number, tabName: string) => {
    activeIndex.value = index;
    router.push(tabName);
  }, [activeIndex, router]);

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarStyle: styles.tabBar,
          headerShown: false,
        }}
      >
        {tabs.map((tab, index) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarButton: (props) => (
                <TabButton
                  {...props}
                  accessibilityState={{ selected: activeIndex.value === index }}
                  onPress={() => updateActiveIndex(index, tab.name)}
                  title={tab.title}
                  icon={tab.icon}
                  activeIndex={activeIndex}
                  index={index}
                />
              ),
            }}
          />
        ))}
      </Tabs>
      <Animated.View style={[styles.indicator, { width: TAB_WIDTH }, indicatorStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    height: 60,
    paddingBottom: 0,
  },
  tabButton: {
    flex: 1,
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 4,
  },
  tabText: {
    fontSize: 10,
    marginTop: 2,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#000000',
  },
});