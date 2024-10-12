import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function StatusTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('待完成');

  const tabs = [
    { key: '待完成', label: '待完成' },
    { key: '过期', label: '过期' },
    { key: '已完成', label: '已完成' },
  ];

  const handleTabPress = (tabKey) => {
    setActiveTab(tabKey);
    onTabChange(tabKey);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab
          ]}
          onPress={() => handleTabPress(tab.key)}
        >
          <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});