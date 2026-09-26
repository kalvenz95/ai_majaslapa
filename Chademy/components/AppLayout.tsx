import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Sidebar from './Sidebar';
import DashboardPanel from './panels/DashboardPanel';
import ProgramsPanel from './panels/ProgramsPanel';
import ResourcesPanel from './panels/ResourcesPanel';
import CommunityPanel from './panels/CommunityPanel';
import SupportPanel from './panels/SupportPanel';
import ProfilePanel from './panels/ProfilePanel';
import PartnerPanel from './panels/PartnerPanel';
import AdminPanel from './panels/AdminPanel';
import NotificationsPanel from './panels/NotificationsPanel';

const panels = {
  home: DashboardPanel,
  programs: ProgramsPanel,
  resources: ResourcesPanel,
  community: CommunityPanel,
  support: SupportPanel,
  profile: ProfilePanel,
  partner: PartnerPanel,
  admin: AdminPanel,
  notifications: NotificationsPanel,
};

export default function AppLayout({ onBack, initialPanel = 'home' }: { onBack?: () => void; initialPanel?: string }) {
  const [activePanel, setActivePanel] = useState(initialPanel);
  const PanelComponent = panels[activePanel] || DashboardPanel;
  return (
    <View style={styles.layout}>
      <Sidebar active={activePanel} onSelect={setActivePanel} />
      <View style={styles.main}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>← Atpakaļ</Text>
          </TouchableOpacity>
        )}
        <PanelComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    minHeight: '100vh',
    backgroundColor: '#0b1016',
  },
  main: {
    flex: 1,
    backgroundColor: '#0b1016',
    padding: 32,
    overflow: 'scroll',
  },
  backBtn: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 7,
  },
  backText: {
    color: '#9fb1c7',
    fontSize: 13,
  },
});
